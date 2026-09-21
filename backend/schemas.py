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

    model_config = {
        "from_attributes": True,
    }

class RouteCreate(BaseModel):
    line: str

class BusSlot(BaseModel):
    id: int
    slot_number: int
    is_occupied: bool = False
    bus_id: int | None = None

    model_config = {
        "from_attributes": True,
    }

class BusSlotCreate(BaseModel):
    slot_number: int

class PassengerPopulated(BaseModel):
    id: int
    name: str
    route_id: int
    bus_id: int | None = None
    route: Route
    bus: Bus | None = None

    model_config = {
        "from_attributes": True,
    }

class BusSlotPopulated(BaseModel):
    id: int
    slot_number: int
    is_occupied: bool = False
    bus_id: int | None = None
    bus: Bus | None = None

    model_config = {
        "from_attributes": True,
    }

class BusPopulated(BaseModel):
    id: int
    route_id: int
    capacity: int = 10
    route: Route

    model_config = {
        "from_attributes": True,
    }

class BusSlotAssign(BaseModel):
    bus_id: int
    slot_id: int