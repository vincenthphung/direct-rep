import os
from psycopg_pool import ConnectionPool


pool = ConnectionPool(conninfo=os.environ["LETTERS_DATABASE_URL"])
