import os
import psycopg

kwargs = {"autocommit": True}

LETTERS_DATABASE_URL = os.environ.get("LETTERS_DATABASE_URL")

conn = psycopg.connect(conninfo=LETTERS_DATABASE_URL, **kwargs)
