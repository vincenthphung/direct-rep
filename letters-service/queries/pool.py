import os
from psycopg_pool import ConnectionPool

LETTERS_DATABASE_URL = os.environ.get("LETTERS_DATABASE_URL")

# pool = ConnectionPool(conninfo=os.environ["DATABASE_URL"])
pool = ConnectionPool(conninfo=LETTERS_DATABASE_URL)
