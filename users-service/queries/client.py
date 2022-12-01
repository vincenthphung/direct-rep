# import os
#
# from psycopg import postgres
# from passlib.handlers import postgres
#
#
# POSTGRES__URL = os.environ["POSTGRES__URL"]
# client = postgres.Client(POSTGRES__URL)
#
#
# class Queries:
#     @property
#     def collection(self):
#         db = client[self.DB_NAME]
#         return db[self.COLLECTION]
