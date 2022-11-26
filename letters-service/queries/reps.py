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
    address: dict


class RepSelectedIn(BaseModel):
    pass

class RepSelectedOut(BaseModel):
    pass

class RepRepository(BaseModel):
  pass


# use RepSelected to populate the rep-selected table
