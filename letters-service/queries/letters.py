from pydantic import BaseModel
from typing import Union
from queries.pool import pool

class Error(BaseModel):
    message: str

class LetterIn(BaseModel):
    topic: str
    stance: bool
    content: str

class LetterUpdate(BaseModel):
    content: str

class LetterOut(BaseModel):
    id: int
    topic: str
    stance: bool
    content: str

class LetterRepository:
    def create(self, topic: str, stance: bool, content: str) -> Union[LetterOut, Error]:
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
                            topic,
                            stance,
                            content
                        ]
                    )
                    id = result.fetchone()[0]
                    print("Check id \n \n", id)
                    return LetterOut(
                      id=id,
                      topic=topic,
                      stance=stance,
                      content=content
                      )
        except Exception:
            return {"message": "Create letter did not work"}


    def update(self, letter_id: int, content: str) -> Union[LetterUpdate, Error]:
        try:
        # connect to the database
            with pool.connection() as conn:
        # get a cursor (something to run SQL with)
                with conn.cursor() as db:
                    db.execute(
                    """
                    UPDATE letter
                    SET content = %s
                    WHERE id = %s
                    """,
                    [
                        content,
                        letter_id
                    ]
                )

                # old_data = letter.dict()
                return LetterUpdate(id=letter_id, content=content)

        except Exception as e:
            print(e)
            return{"message": "could not update letter"}
