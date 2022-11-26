from pydantic import BaseModel
from typing import Optional, Union, List
from queries.pool import pool

class Error(BaseModel):
    message: str

class RepIn(BaseModel):
    name: str
    address: str
    party: str
    office: str
    level: str


class RepOut(BaseModel):
    office: str
    level: str
    name: str
    party: str

class RepRepository(BaseModel):
  pass
