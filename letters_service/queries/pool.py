import os
# from psycopg_pool import ConnectionPool
import psycopg

keepalive_kwargs = {
    "keepalives": 1,
    "keepalives_idle": 300,
    "keepalives_interval": 10,
    "keepalives_count": 5
}

LETTERS_DATABASE_URL = os.environ.get("LETTERS_DATABASE_URL")

# pool = ConnectionPool(conninfo=os.environ["DATABASE_URL"])
# pool = ConnectionPool(conninfo=LETTERS_DATABASE_URL)
conn = psycopg.connect(conninfo=LETTERS_DATABASE_URL, **keepalive_kwargs)
