from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import os
from routers import accounts
from authenticator import authenticator

REACT_URL = os.environ(["REACT_URL"])

app = FastAPI()
# app.include_router(users.router)
app.include_router(accounts.router)
app.include_router(authenticator.router)


app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        os.environ.get("CORS_HOST", REACT_URL)
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
