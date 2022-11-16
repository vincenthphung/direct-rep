from pydantic import BaseModel

class Account(BaseModel):
    name: str
    city: str
    state: str
    zip_code: int
    email: str
