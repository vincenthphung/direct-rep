from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers import letters, reps
# from routers.reps import authenticator
# from authenticator import authenticator
import os

app = FastAPI()
app.include_router(letters.router)
app.include_router(reps.router)
# app.include_router(token_auth.router)
# app.include_router(authenticator.router)

# origins = [
#     "http://localhost:3000",
#     os.environ.get("CORS_HOST", None),
# ]

origins = [
    "http://localhost:3000",
    os.environ.get("CORS_HOST")
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=[os.environ.get("CORS_HOST", "http://localhost:3000")],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
