from pyexpat import model
from fastapi import APIRouter, HTTPException
import schemas
import models
from database import db_dependency

router = APIRouter(prefix="/slots", tags=["slots"])

@router.get("/", response_model=list[schemas.BusSlotPopulated])
def get_slots(db: db_dependency):
    slots = db.query(models.BusSlot).all()
    return slots

@router.post("/", response_model=schemas.BusSlotPopulated)
def create_slots(slot: schemas.BusSlotCreate, db: db_dependency):
    new_slot = models.BusSlot(slot_number=slot.slot_number)
    db.add(new_slot)
    db.commit()
    db.refresh(new_slot)
    return new_slot

@router.post("/assign", response_model=schemas.BusSlotPopulated)
def assign_bus(assign: schemas.BusSlotAssign, db: db_dependency):
    slot = db.query(models.BusSlot).filter(models.BusSlot.id == assign.slot_id).first()
    if not slot:
        raise HTTPException(status_code=404, detail="Slot not found")
    bus = db.query(models.Bus).filter(models.Bus.id == assign.bus_id).first()
    if not bus:
        raise HTTPException(status_code=404, detail="Bus not found")
    slot.bus_id = bus.id
    slot.is_occupied = True
    bus.is_available = False
    db.commit()
    db.refresh(slot)
    db.refresh(bus)
    return slot

@router.get("/status", response_model = schemas.BusSlotStatus)
def get_slot_status(db: db_dependency):
    slots = db.query(models.BusSlot).all()

    filling_status = {}
    for slot in slots:
        filling_status[slot.id] = []
        if slot.is_occupied:
            bus = db.query(models.Bus).filter(models.Bus.id == slot.bus_id).first()
            n_passengers = db.query(models.Passenger).filter(models.Passenger.bus_id == slot.bus_id).count()

            filling_status[slot.id] = [n_passengers, bus.capacity]

    return schemas.BusSlotStatus(filling_status=filling_status)