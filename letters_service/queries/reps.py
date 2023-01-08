from pydantic import BaseModel
from typing import Optional, Union, List
from queries.pool import conn


class Error(BaseModel):
    message: str


class CivicsOut(BaseModel):
    office: str
    level: str
    name: str
    party: str
    address: dict
    email: str


class RepIn(BaseModel):
    office: str
    level: str
    name: str
    party: str
    address: str
    email: str
    letter_id: int


class RepOut(BaseModel):
    rep_id: int
    office: str
    level: str
    name: str
    party: str
    address: str
    email: str
    letter_id: int


class RepRepository(BaseModel):
    def create(self, rep: RepIn) -> Union[RepOut, Error]:
        try:
            with conn.cursor() as db:
                result = db.execute(
                    """
                    INSERT INTO rep
                        (office, level, name,
                        party, address, email, letter_id)
                    VALUES
                        (%s, %s, %s, %s, %s, %s, %s)
                    RETURNING rep_id;
                    """,
                    [
                        rep.office,
                        rep.level,
                        rep.name,
                        rep.party,
                        rep.address,
                        rep.email,
                        rep.letter_id,
                    ],
                )
                rep_id = result.fetchone()[0]
                return RepOut(
                    rep_id=rep_id,
                    office=rep.office,
                    level=rep.level,
                    name=rep.name,
                    party=rep.party,
                    address=rep.address,
                    email=rep.email,
                    letter_id=rep.letter_id,
                )
        except Exception:
            return {"message": "Create rep did not work"}

    def get_all(self) -> Union[Error, List[RepOut]]:
        try:
            with conn.cursor() as db:
                result = db.execute(
                    """
                    SELECT rep_id, office, level, name,
                    party, address, email, letter_id
                    FROM rep
                    ORDER BY rep_id;
                    """
                )
                result = []
                for record in db:
                    rep = RepOut(
                        rep_id=record[0],
                        office=record[1],
                        level=record[2],
                        name=record[3],
                        party=record[4],
                        address=record[5],
                        email=record[6],
                        letter_id=record[7],
                    )
                    result.append(rep)
                return result
        except Exception as e:
            print(e)
            return {"message": "could not get all reps"}

    def get_one(self, rep_id: int) -> Optional[RepOut]:
        try:
            with conn.cursor() as db:
                result = db.execute(
                    """
                    SELECT
                    rep_id, office, level, name,
                    party, address, email, letter_id
                    FROM rep
                    WHERE rep_id = %s
                    """,
                    [rep_id],
                )
                record = result.fetchone()
                if record is None:
                    return None
                return self.record_to_rep_out(record)

        except Exception as e:
            print(e)
            return {"message": "could not get that rep"}

    def record_to_rep_out(self, record):
        return RepOut(
            rep_id=record[0],
            office=record[1],
            level=record[2],
            name=record[3],
            party=record[4],
            address=record[5],
            email=record[6],
            letter_id=record[7],
        )

    def get_per_letter(self, letter_id: int) -> Union[List[RepOut], Error]:
        try:
            with conn.cursor() as db:
                result = db.execute(
                    """
                    SELECT
                    rep_id, office, level, name,
                    party, address, email, letter_id
                    FROM rep
                    WHERE letter_id = %s
                    """,
                    [letter_id],
                )
                result = []
                for record in db:
                    rep = RepOut(
                        rep_id=record[0],
                        office=record[1],
                        level=record[2],
                        name=record[3],
                        party=record[4],
                        address=record[5],
                        email=record[6],
                        letter_id=record[7],
                    )
                    result.append(rep)
                return result
        except Exception as e:
            print(e)
            return {"message": "could not get reps for that letter"}

    def delete(self, letter_id: int, rep_id: int) -> bool:
        try:
            with conn.cursor() as db:
                db.execute(
                    """
                    DELETE FROM rep
                    WHERE letter_id = %s AND rep_id = %s
                    """,
                    [letter_id, rep_id],
                )
                return True
        except Exception as e:
            print(e)
            return False
