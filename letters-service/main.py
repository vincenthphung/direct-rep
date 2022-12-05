from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers import letters, reps
from routers.reps import authenticator
# from authenticator import authenticator
import os

REACT_URL = os.envrion["REACT_URL"]

app = FastAPI()
app.include_router(letters.router)
app.include_router(reps.router)
# app.include_router(authenticator.router)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        os.environ.get("CORS_HOST", REACT_URL)
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
