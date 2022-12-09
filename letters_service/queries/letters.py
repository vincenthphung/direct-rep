from pydantic import BaseModel
from datetime import datetime
from typing import Optional, Union, List
from queries.pool import pool
from queries.pool import conn
# import psycopg
# from psycopg2 import connect
import os


class Error(BaseModel):
    message: str


class LetterIn(BaseModel):
    created: str
    topic: str
    stance: bool
    content: str
    user_id: int


class LetterUpdate(BaseModel):
    content: str


class LetterNew(BaseModel):
    id: int
    topic: str
    stance: bool
    content: str
    user_id: int


class LetterOut(BaseModel):
    id: int
    created: datetime
    topic: str
    stance: bool
    content: str
    user_id: int


class Issue(BaseModel):
    id: int
    user_issue: str
    openai_issue: str


class LetterRepository:
    def create(self, topic: str, stance: bool, content: str, user_id: int) -> Union[LetterOut, Error]:
        try:
            # with pool.connection() as conn:
            with conn.cursor() as db:
                result = db.execute(
                    """
                    INSERT INTO letter
                        (topic, stance, content, user_id)
                    VALUES
                        (%s, %s, %s, %s)
                    RETURNING id;
                    """,
                    [
                        topic,
                        stance,
                        content,
                        user_id
                    ]
                )
                id = result.fetchone()[0]
                # print("Check id \n \n", id)
                return LetterNew(
                    id=id,
                    topic=topic,
                    stance=stance,
                    content=content,
                    user_id=user_id
                )
        except Exception:
            return {"message": "Create letter did not work"}

    def update(self, letter_id: int, content: str) -> Union[LetterUpdate, Error]:
        try:
            # connect to the database
            # with pool.connection() as conn:
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
            return {"message": "could not update letter"}

    def get_all(self) -> Union[Error, List[LetterOut]]:
        try:
            # connect to the database
            # with pool.connection() as conn:
            # get a cursor (something to run SQL with)
            with conn.cursor() as db:
                # run our SELECT statement
                result = db.execute(
                    """
                    SELECT id, created, topic, stance, content, user_id
                    FROM letter
                    ORDER BY id;
                    """
                )
                result = []
                for record in db:
                    # print("\n \n record get all", record)
                    letter = LetterOut(
                        id=record[0],
                        created=record[1],
                        topic=record[2],
                        stance=record[3],
                        content=record[4],
                        user_id=record[5]
                    )
                    result.append(letter)
                return result
        except Exception as e:
            print("ERROR")
            print(e)
            return {"message": "could not get all letters"}

    def get_one(self, letter_id: int) -> Optional[LetterOut]:
        try:
            # connect to the database
            # with pool.connection() as conn:
            # get a cursor (something to run SQL with)
            with conn.cursor() as db:
                result = db.execute(
                    """
                    SELECT id, created, topic, stance, content, user_id
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
            return {"message": "could not get that letter"}

    def delete(self, letter_id: int) -> bool:
        try:
            # with pool.connection() as conn:
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
            id=record[0],
            created=record[1],
            topic=record[2],
            stance=record[3],
            content=record[4],
            user_id=record[5]
        )


class IssueRepository:
    def get_all(self) -> Union[Error, List[Issue]]:
        try:
            # with pool.connection() as conn:
            # with connect(conninfo=os.environ.get("LETTERS_DATABASE_URL"), **keepalive_kwargs) as conn:
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
                        id=record[0],
                        user_issue=record[1],
                        openai_issue=record[2]
                    )
                    result.append(issue)
                return result
        except Exception as e:
            print("ERROR")
            print(e)
            return {"message": "could not get all issues"}


# class LetterRepository:
#     def create(self, topic: str, stance: bool, content: str, user_id: int) -> Union[LetterOut, Error]:
#         try:
#             with pool.connection() as conn:
#                 with conn.cursor() as db:
#                     result = db.execute(
#                         """
#                         INSERT INTO letter
#                             (topic, stance, content, user_id)
#                         VALUES
#                             (%s, %s, %s, %s)
#                         RETURNING id;
#                         """,
#                         [
#                             topic,
#                             stance,
#                             content,
#                             user_id
#                         ]
#                     )
#                     id = result.fetchone()[0]
#                     # print("Check id \n \n", id)
#                     return LetterNew(
#                         id=id,
#                         topic=topic,
#                         stance=stance,
#                         content=content,
#                         user_id=user_id
#                     )
#         except Exception:
#             return {"message": "Create letter did not work"}

#     def update(self, letter_id: int, content: str) -> Union[LetterUpdate, Error]:
#         try:
#             # connect to the database
#             with pool.connection() as conn:
#             # get a cursor (something to run SQL with)
#                 with conn.cursor() as db:
#                     db.execute(
#                         """
#                     UPDATE letter
#                     SET content = %s
#                     WHERE id = %s
#                     """,
#                         [
#                             content,
#                             letter_id
#                         ]
#                     )
#                 # old_data = letter.dict()
#                 return LetterUpdate(id=letter_id, content=content)
#         except Exception as e:
#             print(e)
#             return {"message": "could not update letter"}

#     def get_all(self) -> Union[Error, List[LetterOut]]:
#         try:
#             # connect to the database
#             with pool.connection() as conn:
#             # get a cursor (something to run SQL with)
#                 with conn.cursor() as db:
#                     # run our SELECT statement
#                     result = db.execute(
#                         """
#                         SELECT id, created, topic, stance, content, user_id
#                         FROM letter
#                         ORDER BY id;
#                         """
#                     )
#                     result = []
#                     for record in db:
#                         # print("\n \n record get all", record)
#                         letter = LetterOut(
#                             id=record[0],
#                             created=record[1],
#                             topic=record[2],
#                             stance=record[3],
#                             content=record[4],
#                             user_id=record[5]
#                         )
#                         result.append(letter)
#                     return result
#         except Exception as e:
#             print("ERROR")
#             print(e)
#             return {"message": "could not get all letters"}

#     def get_one(self, letter_id: int) -> Optional[LetterOut]:
#         try:
#             # connect to the database
#             with pool.connection() as conn:
#             # get a cursor (something to run SQL with)
#                 with conn.cursor() as db:
#                     result = db.execute(
#                         """
#                         SELECT id, created, topic, stance, content, user_id
#                         FROM letter
#                         WHERE id = %s
#                         """,
#                         [letter_id]
#                     )
#                     record = result.fetchone()
#                     if record is None:
#                         return None
#                     return self.record_to_letter_out(record)
#         except Exception as e:
#             print(e)
#             return {"message": "could not get that letter"}

#     def delete(self, letter_id: int) -> bool:
#         try:
#             with pool.connection() as conn:
#                 with conn.cursor() as db:
#                     db.execute(
#                         """
#                         DELETE FROM letter
#                         WHERE id = %s
#                         """,
#                         [letter_id]
#                     )
#                     return True
#         except Exception as e:
#             print(e)
#             return False

#     def record_to_letter_out(self, record):
#         return LetterOut(
#             id=record[0],
#             created=record[1],
#             topic=record[2],
#             stance=record[3],
#             content=record[4],
#             user_id=record[5]
#         )


# class IssueRepository:
#     def get_all(self) -> Union[Error, List[Issue]]:
#         try:
#             with pool.connection() as conn:
#             # with connect(conninfo=os.environ.get("LETTERS_DATABASE_URL"), **keepalive_kwargs) as conn:
#                 with conn.cursor() as db:
#                     result = db.execute(
#                         """
#                         SELECT id, user_issue, openai_issue
#                         FROM issue
#                         ORDER BY id;
#                         """
#                     )
#                     result = []
#                     for record in db:
#                         issue = Issue(
#                             id=record[0],
#                             user_issue=record[1],
#                             openai_issue=record[2]
#                         )
#                         result.append(issue)
#                     return result
#         except Exception as e:
#             print("ERROR")
#             print(e)
#             return {"message": "could not get all issues"}
