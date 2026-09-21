from fastapi import APIRouter
import schemas
import models
from database import db_dependency
from fastapi import HTTPException

router = APIRouter(prefix="/slots", tags=["slots"])

@router.get("/", response_model=list[schemas.BusSlotPopulated])
def get_buses(db: db_dependency):
    buses = db.query(models.BusSlot).all()
    return buses

@router.post("/", response_model=schemas.BusSlotPopulated)
def create_buses(bus: schemas.BusSlotCreate, db: db_dependency):
    try:
        new_bus_slot = models.BusSlot(slot_number=bus.slot_number)
        db.add(new_bus_slot)
        db.commit()
        db.refresh(new_bus_slot)
        return new_bus_slot
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
