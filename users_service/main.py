from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import os
from routers import accounts
from authenticator import authenticators

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        os.environ.get("CORS_HOST"),
        "http://localhost:3000",
        "https://directrep.gitlab.io",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(accounts.router)
app.include_router(authenticators.router)
