from fastapi import (
    Depends,
    HTTPException,
    status,
    Response,
    APIRouter,
    Request,
)
from jwtdown_fastapi.authentication import Token
from authenticator import authenticator

from pydantic import BaseModel

from queries.accounts import (
    AccountIn,
    AccountOut,
    AccountRepo,
)

class AccountForm(BaseModel):
    email: str
    password: str

class AccountToken(Token):
    account: AccountOut

class HttpError(BaseModel):
    detail: str

router = APIRouter()


@router.post("/api/accounts", response_model=AccountToken | HttpError)
async def create_account(
    info: AccountIn,
    request: Request,
    response: Response,
    repo: AccountRepo = Depends(),
):
    hashed_password = authenticator.hash_password(info.password)
    account = repo.create(info, hashed_password)
    form = AccountForm(email=info.email, password=info.password)
    token = await authenticator.login(response, request, form, repo)
    return AccountToken(account=account, **token.dict())

# authenticator.hash_password => comes from the Authenticator base class (inherited in queries)
# authenticator.login => comes from the Authenticator base class (inherited in queries)
# repo.create => must match a create function from our queries to create new instance in database table
