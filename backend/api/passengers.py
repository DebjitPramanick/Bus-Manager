from fastapi import APIRouter, HTTPException
from sqlalchemy.orm import Session
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
    assign_bus_to_passenger(db, new_passenger)
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

def delete_passengers(db: Session, passengers: list[models.Passenger]):
    if len(passengers) == 0:
        return
    db.delete(passengers)
    db.commit()
    db.refresh(passengers)

def unassign_passengers(db: Session, passengers: list[models.Passenger]):
    if len(passengers) == 0:
        return
    for passenger in passengers:
        passenger.bus_id = None
    db.commit()
    db.refresh(passengers)
    return passengers

def assign_bus_to_passenger(db: Session, passenger: models.Passenger):
    route = db.query(models.Route).filter(models.Route.id == passenger.route_id).first()
    if not route:
        raise HTTPException(status_code=404, detail="Route not found")
    slots_with_bus: list[schemas.BusSlotPopulated] = db.query(models.BusSlot).all()
    for slot in slots_with_bus:
        if slot.is_occupied and slot.bus.route_id == route.id:
            passenger.bus_id = slot.bus_id
            break

    db.commit()
    db.refresh(passenger)
    return passenger