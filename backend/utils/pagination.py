from typing import Generic
from fastapi import Query
from pydantic import BaseModel
from typing import TypeVar
from sqlalchemy.orm import Query as SQLAlchemyQuery

T = TypeVar('T')

class PaginationParams:
    def __init__(self, page: int = Query(1, ge=1), page_size: int = Query(10, ge=1, le=100)):
        self.page = page
        self.page_size = page_size

    @property
    def offset(self) -> int:
        return (self.page - 1) * self.page_size

class PaginatedResponse(BaseModel, Generic[T]):
    items: list[T]
    total: int
    page: int
    page_size: int
    total_pages: int


def paginate(
    query: SQLAlchemyQuery,
    pagination: PaginationParams,
):
    total = query.count()

    items = (
        query
        .offset(pagination.offset)
        .limit(pagination.page_size)
        .all()
    )

    total_pages = (total + pagination.page_size - 1) // pagination.page_size

    return PaginatedResponse(
        items=items,
        page=pagination.page,
        page_size=pagination.page_size,
        total=total,
        total_pages=total_pages,
    )