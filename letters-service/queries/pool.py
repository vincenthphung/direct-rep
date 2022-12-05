import os
from psycopg_pool import ConnectionPool

LETTERS_DATABASE_URL = os.getenv('LETTERS_DATABASE_URL')

pool = ConnectionPool(conninfo=LETTERS_DATABASE_URL)
