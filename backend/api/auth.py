from fastapi import APIRouter, HTTPException, Response
from utils.auth import auth_dependency
from database import db_dependency
from models import User as UserModel
from schemas import User as UserSchema, UserAuth
from sqlalchemy.orm import Session

router = APIRouter(prefix="/auth", tags=["auth"])

@router.post("/register", response_model=UserSchema)
def register(db: db_dependency, auth: auth_dependency, user: UserAuth, response: Response):
    if is_existing_user(db, user.username):
        raise HTTPException(status_code=400, detail="Username already exists")

    new_user = UserModel(username=user.username, hashed_password=auth.hash_password(user.password))

    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    tokens = auth.create_tokens(new_user.id, "user")

    auth.attach_cookies(response, tokens)

    return new_user


@router.post("/login", response_model=UserSchema)
def login(db: db_dependency, auth: auth_dependency, user: UserAuth, response: Response):
    db_user = db.query(UserModel).filter(UserModel.username == user.username).first()
    if not db_user:
        raise HTTPException(status_code=401, detail="Invalid username")
    if not auth.verify_password(user.password, db_user.hashed_password):
        raise HTTPException(status_code=401, detail="Invalid password")

    tokens = auth.create_tokens(db_user.id, "user")
    auth.attach_cookies(response, tokens)

    return db_user

def is_existing_user(db: Session, username: str):
    db_user = db.query(UserModel).filter(UserModel.username == username).first()
    return db_user is not None