import os
# from psycopg_pool import ConnectionPool
import pscyopg

USERS_DATABASE_URL = os.environ.get("USERS_DATABASE_URL")

# pool = ConnectionPool(conninfo=os.environ["DATABASE_URL"])
# pool = ConnectionPool(conninfo=USERS_DATABASE_URL)
conn = psycopg.connect(USERS_DATABASE_URL)
