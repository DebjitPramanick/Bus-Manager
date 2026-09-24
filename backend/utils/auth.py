from typing import Annotated
from fastapi import Depends, Request, Response
from passlib.context import CryptContext
from fastapi.security import OAuth2PasswordBearer
from jwt import decode, encode
from sqlalchemy.orm import Session
from schemas import Token
from datetime import datetime, timezone, timedelta
from pwdlib import PasswordHash

password_hash = PasswordHash.recommended()

SECRET_KEY = "09d25e094faa6ca2556c818166b7a9563b93f7099f6f0f4caa6cf63b88e8d3e7"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 15
REFRESH_TOKEN_EXPIRE_DAYS = 3

bcrypt_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
oauth2_bearer = OAuth2PasswordBearer(tokenUrl="auth/token")

class AuthService:

    def hash_password(self, password: str):
        return password_hash.hash(password)

    def verify_password(self, password: str, hashed_password: str):
        return password_hash.verify(password, hashed_password)

    def create_tokens(self, user_id: int, role: str) -> Token:
        access_token_expiry = datetime.now(timezone.utc) + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
        refresh_token_expiry = datetime.now(timezone.utc) + timedelta(days=REFRESH_TOKEN_EXPIRE_DAYS)

        to_encode_base = {"sub": user_id, "role": role}
        to_encode_access = to_encode_base.copy()
        to_encode_refresh = to_encode_base.copy()

        to_encode_access["exp"] = access_token_expiry
        to_encode_refresh["exp"] = refresh_token_expiry

        access_token: str = encode(to_encode_access, SECRET_KEY, algorithm=ALGORITHM)
        refresh_token: str = encode(to_encode_refresh, SECRET_KEY, algorithm=ALGORITHM)
        return Token(access_token=access_token, refresh_token=refresh_token, token_type="bearer")

    def attach_cookies(self, response: Response, tokens: Token):
        response.set_cookie(
            key="access_token",
            value=tokens.access_token,
            httponly=True,
            secure=True,
            samesite="strict",
            max_age=ACCESS_TOKEN_EXPIRE_MINUTES * 60,
            path="/"
        )

        response.set_cookie(
            key="refresh_token",
            value=tokens.refresh_token,
            httponly=True,
            secure=True,
            samesite="strict",
            max_age=REFRESH_TOKEN_EXPIRE_DAYS * 24 * 60 * 60,
            path="/auth/refresh"
        )

    def authenticate_user(self, db: Session, request: Request):
        access_token = request.cookies.get("access_token")
        refresh_token = request.cookies.get("refresh_token")

        if not access_token or not refresh_token:
            return False

        try:
            payload = decode(access_token, SECRET_KEY, algorithms=[ALGORITHM])
            user_id = payload.get("sub")
            role = payload.get("role")
            access_token_expiry = payload.get("exp")
        except Exception as e:
            print(e)
            return False

        is_access_token_expired: bool = access_token_expiry < datetime.now(timezone.utc)

        print(user_id, role, is_access_token_expired)

auth_dependency = Annotated[AuthService, Depends(lambda: AuthService())]