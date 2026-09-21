from fastapi import APIRouter
import schemas
import models
from database import db_dependency

router = APIRouter(prefix="/passengers", tags=["passengers"])

@router.get("/", response_model=list[schemas.PassengerPopulated])
def get_passengers(db: db_dependency):
    passengers = db.query(models.Passenger).all()
    return passengers

@router.post("/", response_model=schemas.PassengerPopulated)
def create_passengers(passenger: schemas.PassengerCreate, db: db_dependency):
    new_passenger = models.Passenger(name=passenger.name, route_id=passenger.route_id)
    db.add(new_passenger)
    db.commit()
    db.refresh(new_passenger)
    return new_passenger
