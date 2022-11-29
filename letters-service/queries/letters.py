from pydantic import BaseModel
from typing import Optional, Union, List
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

class Issue(BaseModel):
    id: int
    user_issue: str
    openai_issue: str

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

    def get_all(self) -> Union[Error, List[LetterOut]]:
        try:
            # connect to the database
            with pool.connection() as conn:
                # get a cursor (something to run SQL with)
                with conn.cursor() as db:
                    # run our SELECT statement
                    result = db.execute(
                        """
                        SELECT id, topic, stance, content
                        FROM letter
                        ORDER BY id;
                        """
                    )
                    result = []
                    for record in db:
                        letter = LetterOut(
                            id = record[0],
                            topic = record[1],
                            stance = record[2],
                            content = record[3]
                        )
                        result.append(letter)
                    return result
        except Exception as e:
            print("ERROR")
            print(e)
            return{"message": "could not get all letters"}


    def get_one(self, letter_id: int) -> Optional[LetterOut]:
        try:
            # connect to the database
            with pool.connection() as conn:
            # get a cursor (something to run SQL with)
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        SELECT id, topic, stance, content
                        FROM letter
                        WHERE id = %s
                        """,
                    [letter_id]
                    )
                    record = result.fetchone()
                    if record is None:
                        return None
                    return self.record_to_letter_out(record)

        except Exception as e:
            print(e)
            return{"message": "could not get that letter"}

    def delete(self, letter_id: int) -> bool:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        DELETE FROM letter
                        WHERE id = %s
                        """,
                        [letter_id]
                    )
                    return True
        except Exception as e:
            print(e)
            return False


    def record_to_letter_out(self, record):
        return LetterOut(
            id = record[0],
            topic = record[1],
            stance = record[2],
            content = record[3]
            )

class IssueRepository:
    def get_all(self) -> Union[Error, List[Issue]]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        SELECT id, user_issue, openai_issue
                        FROM issue
                        ORDER BY id;
                        """
                    )
                    result = []
                    for record in db:
                        issue = Issue(
                            id = record[0],
                            user_issue= record[1],
                            openai_issue= record[2]
                        )
                        result.append(issue)
                    return result
        except Exception as e:
            print("ERROR")
            print(e)
            return{"message": "could not get all issues"}
