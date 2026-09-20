from fastapi import APIRouter
import schemas
import models
from database import db_dependency
from fastapi import HTTPException

router = APIRouter(prefix="/routes", tags=["routes"])

@router.get("/", response_model=list[schemas.Route])
def get_routes(db: db_dependency):
    routes = db.query(models.Route).all()
    return routes

@router.post("/", response_model=schemas.Route)
def create_routes(route: schemas.RouteCreate, db: db_dependency):
    new_route = models.Route(line=route.line)
    db.add(new_route)
    db.commit()
    db.refresh(new_route)
    return new_route

@router.get("/{route_id}", response_model=schemas.Route)
def get_route(route_id: int, db: db_dependency):
    route = db.query(models.Route).filter(models.Route.id == route_id).first()
    if not route:
        raise HTTPException(status_code=404, detail="Route not found")
    return route
