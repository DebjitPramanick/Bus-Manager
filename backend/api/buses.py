from fastapi import APIRouter, Depends
from utils.pagination import PaginationParams, paginate, PaginatedResponse
import schemas
import models
from database import db_dependency

router = APIRouter(prefix="/buses", tags=["buses"])

@router.get("/", response_model=list[schemas.BusPopulated])
def get_buses(db: db_dependency):
    buses = db.query(models.Bus).all()
    return buses

@router.get("/paginated", response_model=PaginatedResponse[schemas.BusPopulated])
def get_buses(db: db_dependency, pagination: PaginationParams = Depends()):
    query = db.query(models.Bus)
    return paginate(query, pagination)

@router.post("/", response_model=schemas.Bus)
def create_buses(bus: schemas.BusCreate, db: db_dependency):
    new_bus = models.Bus(route_id=bus.route_id, capacity=bus.capacity)
    db.add(new_bus)
    db.commit()
    db.refresh(new_bus)
    return new_bus
