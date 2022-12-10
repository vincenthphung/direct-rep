from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers import letters, reps
import os

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        os.environ.get('CORS_HOST'),
        "http://localhost:3000",
        "https://directrep.gitlab.io"
        ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(letters.router)
app.include_router(reps.router)
