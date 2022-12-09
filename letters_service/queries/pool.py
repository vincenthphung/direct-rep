import os
# from psycopg_pool import ConnectionPool
import psycopg

kwargs = {"autocommit": True}

LETTERS_DATABASE_URL = os.environ.get("LETTERS_DATABASE_URL")

# pool = ConnectionPool(conninfo=os.environ["DATABASE_URL"])
# pool = ConnectionPool(conninfo=LETTERS_DATABASE_URL)
# pool = ConnectionPool(conninfo=LETTERS_DATABASE_URL)
# conn = psycopg.connect(conninfo=LETTERS_DATABASE_URL, **keepalive_kwargs)
# conn = psycopg.connect(LETTERS_DATABASE_URL)
conn = psycopg.connect(conninfo=LETTERS_DATABASE_URL, **kwargs)
