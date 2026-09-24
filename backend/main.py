from fastapi import Depends, FastAPI, APIRouter
from fastapi.responses import JSONResponse
from pydantic import BaseModel
from api.passengers import router as passengers_router
from api.buses import router as buses_router
from api.routes import router as routes_router
from api.slots import router as slots_router
from api.auth import router as auth_router
import models
from database import engine
from fastapi.middleware.cors import CORSMiddleware

models.Base.metadata.create_all(bind=engine)


app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
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
api_router.include_router(slots_router)
api_router.include_router(auth_router)

app.include_router(api_router)