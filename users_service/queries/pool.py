import os
import psycopg


kwargs = {"autocommit": True}

USERS_DATABASE_URL = os.environ.get("USERS_DATABASE_URL")

conn = psycopg.connect(conninfo=USERS_DATABASE_URL, **kwargs)
