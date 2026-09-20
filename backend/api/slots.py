from fastapi import APIRouter
import schemas
import models
from database import db_dependency

router = APIRouter(prefix="/slots", tags=["slots"])

@router.get("/", response_model=list[schemas.BusSlot])
def get_slots(db: db_dependency):
    slots = db.query(models.BusSlot).all()
    return slots

@router.post("/", response_model=schemas.BusSlot)
def create_slots(slot: schemas.BusSlotCreate, db: db_dependency):
    new_slot = models.BusSlot(slot_number=slot.slot_number)
    db.add(new_slot)
    db.commit()
    db.refresh(new_slot)
    return new_slot
