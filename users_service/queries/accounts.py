from pydantic import BaseModel
from typing import Optional, Union
from queries.pool import conn


class Error(BaseModel):
    message: str


class Account(BaseModel):
    id: int
    full_name: str
    email: str
    zipcode: str
    hashed_password: str


class AccountIn(BaseModel):
    full_name: str
    email: str
    zipcode: str
    password: str


class AccountOut(BaseModel):
    id: int
    full_name: str
    email: str
    zipcode: str


class AccountRepo:
    def get(self, email: str) -> Optional[Account]:
        with conn.cursor() as db:
            result = db.execute(
                """
                SELECT id
                        , full_name
                        , email
                        , zipcode
                        , hashed_password
                FROM users
                WHERE email = %s
                """,
                [email],
            )
            record = result.fetchone()
            if record is None:
                return None

            return Account(
                id=record[0],
                full_name=record[1],
                email=record[2],
                zipcode=record[3],
                hashed_password=record[4],
            )

    def create(self, account: AccountIn, hashed_password: str) -> Account:
        with conn.cursor() as db:
            result = db.execute(
                """
                INSERT INTO users
                    (full_name, email, zipcode, hashed_password)
                VALUES
                    (%s, %s, %s, %s)
                RETURNING id;
                """,
                [
                    account.full_name,
                    account.email,
                    account.zipcode,
                    hashed_password,
                ],
            )
            id = result.fetchone()[0]
            return Account(
                id=id,
                full_name=account.full_name,
                email=account.email,
                zipcode=account.zipcode,
                hashed_password=hashed_password,
            )

    def update(
        self, id: int, account: AccountIn, hashed_password: str
    ) -> Union[Account, Error]:
        try:
            with conn.cursor() as db:
                db.execute(
                    """
                UPDATE users
                SET full_name = %s,
                    email = %s,
                    zipcode = %s,
                    hashed_password = %s
                WHERE id = %s
                """,
                    [
                        account.full_name,
                        account.email,
                        account.zipcode,
                        hashed_password,
                        id,
                    ],
                )
            return Account(
                id=id,
                full_name=account.full_name,
                email=account.email,
                zipcode=account.zipcode,
                hashed_password=hashed_password,
            )

        except Exception as e:
            print(e)
            return {"message": "could not update account"}
