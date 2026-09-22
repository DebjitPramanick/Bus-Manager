from fastapi import APIRouter, HTTPException
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

@router.put("/{passenger_id}", response_model=schemas.PassengerPopulated)
def update_passenger(passenger_id: int, passenger: schemas.PassengerCreate, db: db_dependency):
    passenger_to_update = db.query(models.Passenger).filter(models.Passenger.id == passenger_id).first()
    if not passenger_to_update:
        raise HTTPException(status_code=404, detail="Passenger not found")
    passenger_to_update.name = passenger.name
    passenger_to_update.route_id = passenger.route_id
    db.commit()
    db.refresh(passenger_to_update)
    return passenger_to_update

@router.patch("/assign", response_model=schemas.PassengerPopulated)
def assign_passenger(assign: schemas.PassengerAssign, db: db_dependency):
    passenger = db.query(models.Passenger).filter(models.Passenger.id == assign.passenger_id).first()
    if not passenger:
        raise HTTPException(status_code=404, detail="Passenger not found")
    bus = db.query(models.Bus).filter(models.Bus.id == assign.bus_id).first()
    if not bus:
        raise HTTPException(status_code=404, detail="Bus not found")
    passenger.bus_id = assign.bus_id
    db.commit()
    db.refresh(passenger)
    return passenger