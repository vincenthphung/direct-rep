from pydantic import BaseModel
from typing import Optional, List, Union
from datetime import date
from queries.pool import pool


class Error(BaseModel):
  message: str


class Account(BaseModel):
  pass

class AccountIn(BaseModel):
  pass

class AccountOut(BaseModel):
  pass

class AccountRepo(BaseModel):
  def get(self, email: str) -> Optional[Account]:
    # connect with database, etc, etc
    pass

  def create(self, account: AccountIn, hashed_password: str) -> Union[Account, Error]:
    # connect with database, etc, etc
    pass
