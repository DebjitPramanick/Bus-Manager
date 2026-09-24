from sqlalchemy import Column, Integer, String, ForeignKey, Boolean
from sqlalchemy.orm import relationship
from database import Base

class User(Base):
    __tablename__ = "users"

    id=Column(Integer, primary_key=True, index=True)
    username=Column(String, index=True, nullable=False, unique=True)
    hashed_password=Column(String, nullable=False)
class Bus(Base):
    __tablename__ = "buses"
    id = Column(Integer, primary_key=True, index=True)
    route_id = Column(Integer, ForeignKey("routes.id"),nullable=False)
    capacity = Column[int](Integer, index=True, nullable=False, default=10)
    is_available = Column(Boolean, index=True, nullable=False, default=True)
    route = relationship("Route")

class BusSlot(Base):
    __tablename__ = "bus_slots"
    id = Column(Integer, primary_key=True, index=True)
    slot_number = Column(Integer, index=True, nullable=False, unique=True)
    is_occupied = Column(Boolean, index=True, nullable=False, default=False)
    bus_id = Column(Integer, ForeignKey("buses.id"))
    bus = relationship("Bus")
    
class Passenger(Base):
    __tablename__ = "passengers"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True, nullable=False)
    route_id = Column(Integer, ForeignKey("routes.id"),nullable=False)
    bus_id = Column(Integer, ForeignKey("buses.id"))
    route = relationship("Route")
    bus = relationship("Bus")

class Route(Base):
    __tablename__ = "routes"
    id = Column(Integer, primary_key=True, index=True)
    line = Column(String, index=True, nullable=False, unique=True)