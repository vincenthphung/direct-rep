from fastapi import (
    Depends,
    Response,
    APIRouter,
    Request,
)
from jwtdown_fastapi.authentication import Token
from authenticator import authenticators
from pydantic import BaseModel
from queries.accounts import AccountIn, AccountOut, AccountRepo, Account


class AccountForm(BaseModel):
    username: str
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
    hashed_password = authenticators.hash_password(info.password)
    account = repo.create(info, hashed_password)
    form = AccountForm(username=info.email, password=info.password)
    token = await authenticators.login(response, request, form, repo)
    return AccountToken(account=account, **token.dict())


@router.put("/api/accounts/{id}", response_model=AccountToken | HttpError)
async def edit_account(
    id: int,
    info: AccountIn,
    request: Request,
    response: Response,
    repo: AccountRepo = Depends(),
):
    hashed_password = authenticators.hash_password(info.password)
    account = repo.update(id, info, hashed_password)
    form = AccountForm(username=info.email, password=info.password)
    token = await authenticators.login(response, request, form, repo)
    return AccountToken(account=account, **token.dict())


@router.get("/token", response_model=AccountToken | None)
async def get_token(
    request: Request,
    account: Account = Depends(authenticators.try_get_current_account_data),
) -> AccountToken | None:
    if account and authenticators.cookie_name in request.cookies:
        return {
            "access_token": request.cookies[authenticators.cookie_name],
            "type": "Bearer",
            "account": account,
        }
