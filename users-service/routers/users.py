from fastapi import APIRouter
from queries.users import (Account)

router = APIRouter()

@router.get("/dashboard", response_model=Account)
async def get_dashboard():
    return {"message": "Hello World"}

@router.get("/login", response_model=Account)
async def get_login():
    return {"message": "Hello World"}

@router.post("/signup", response_model=Account)
async def create_user(account: Account):
    db.append(account)
    return db[-1]
