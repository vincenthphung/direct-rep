import os
from psycopg_pool import ConnectionPool

USERS_DATABASE_URL = os.getenv('USERS_DATABASE_URL')

pool = ConnectionPool(conninfo=USERS_DATABASE_URL)
