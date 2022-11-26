from pydantic import BaseModel
from typing import Optional, Union, List
from queries.pool import pool

class Error(BaseModel):
    message: str

class CivicsOut(BaseModel):
    office: str
    level: str
    name: str
    party: str
    address: dict

class RepIn(BaseModel):
    office: str
    level: str
    name: str
    party: str
    address: str
    letter_id: int

class RepOut(BaseModel):
    rep_id: int
    office: str
    level: str
    name: str
    party: str
    address: str
    letter_id: int

class RepRepository(BaseModel):
    def create(self, rep: RepIn) -> Union[RepOut, Error]:
        # try:
        with pool.connection() as conn:
            with conn.cursor() as db:
                result = db.execute(
                    """
                    INSERT INTO rep
                        (office, level, name, party, address, letter_id)
                    VALUES
                        (%s, %s, %s, %s, %s, %s)
                    RETURNING rep_id;
                    """,
                    [
                        rep.office,
                        rep.level,
                        rep.name,
                        rep.party,
                        rep.address,
                        rep.letter_id
                    ]
                )
                rep_id = result.fetchone()[0]
                print("\n \n Check id \n \n", rep_id)
                print("\n \n Check rep \n \n", RepOut)

                return RepOut(
                    rep_id=rep_id,
                    office=rep.office,
                    level=rep.level,
                    name=rep.name,
                    party=rep.party,
                    address=rep.address,
                    letter_id=rep.letter_id
                    )
        # except Exception as e:
        #     print("ERROR")
        #     return {"message": "Create rep did not work"}
