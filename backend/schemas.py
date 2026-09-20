from pydantic import BaseModel

class Passenger(BaseModel):
    id: int
    name: str
    route_id: int
    bus_id: int | None = None

class PassengerCreate(BaseModel):
    name: str
    route_id: int

class Bus(BaseModel):
    id: int
    route_id: int
    capacity: int = 10

class BusCreate(BaseModel):
    route_id: int
    capacity: int = 10

class Route(BaseModel):
    id: int
    line: str

class RouteCreate(BaseModel):
    line: str

class BusSlot(BaseModel):
    id: int
    slot_number: int
    is_occupied: bool = False
    bus_id: int | None = None

class BusSlotCreate(BaseModel):
    slot_number: int