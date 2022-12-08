import os
from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from jose import jwt, JWTError
from pydantic import BaseModel

class AccountOut(BaseModel):
    id: int
    full_name: str
    email: str
    zipcode: int

# oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")
# oauth2_scheme = OAuth2PasswordBearer(tokenUrl="localhost:8080/token")
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/token")

print("\n\n\nOAuth oauth2_scheme:\n\n\n", oauth2_scheme, "\n\n\n")
SECRET_KEY = os.environ.get("SIGNING_KEY")
print("\n\n\nOAuth SECRET KEY:\n\n\n", SECRET_KEY, "\n\n\n")

async def get_current_user(token: str = Depends(oauth2_scheme)):
  credentials_exception = HTTPException(
    status_code=status.HTTP_401_UNAUTHORIZED,
    detail="Could not validate credentials",
    headers={"WWW-Authenticate": "Bearer"},
  )
  try:
    payload = jwt.decode(token, SECRET_KEY)
    username: str = payload.get("sub")
    print("\n\n\nTOKEN AUTH USERNAME\n\n\n", username)
    if username is None:
      raise credentials_exception

  except JWTError:
    raise credentials_exception
  user = AccountOut(**payload.get("account"))  # changed from "account"
  print("\n\n\nTOKEN AUTH USER\n\n\n", user)
  if user is None:
    raise credentials_exception
  return user
