from pydantic import BaseModel
from typing import Union
from queries.pool import pool

class Error(BaseModel):
    message: str

class LetterIn(BaseModel):
    topic: str
    stance: bool
    content: str

class LetterOut(BaseModel):
    id: int
    topic: str
    stance: bool
    content: str

class LetterRepository:
    def create(self, letter: LetterIn) -> Union[LetterOut, Error]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        INSERT INTO letter
                            (topic, stance, content)
                        VALUES
                            (%s, %s, %s)
                        RETURNING id;
                        """,
                        [
                            letter.topic,
                            letter.stance,
                            letter.content
                        ]
                    )
                    id = result.fetchone()[0]
                    old_data = letter.dict()
                    print("Check id \n \n", id, old_data)
                    return LetterOut(id=id, **old_data)
        except Exception:
            return {"message": "Create did not work"}
