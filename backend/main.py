from typing import Annotated
from fastapi import Depends, FastAPI, APIRouter
from fastapi.responses import JSONResponse
from pydantic import BaseModel
from api.passengers import router as passengers_router
from api.buses import router as buses_router
from api.routes import router as routes_router
import models
from database import engine, get_db
from sqlalchemy.orm import Session

models.Base.metadata.create_all(bind=engine)

app = FastAPI()
api_router = APIRouter(prefix="/api")

class Item(BaseModel):
    id: int
    name: str
    description: str

class NewItem(BaseModel):
    name: str
    description: str

items = []

@app.get("/")
def read_root():
    return {"message": "BusDepot API is live."}

api_router.include_router(passengers_router)
api_router.include_router(buses_router)
api_router.include_router(routes_router)

app.include_router(api_router)