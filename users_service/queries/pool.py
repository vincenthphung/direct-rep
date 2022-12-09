import os
from psycopg_pool import ConnectionPool
import psycopg

# keepalive_kwargs = {
#     "keepalives": 1,
#     "keepalives_idle": 60,
#     "keepalives_interval": 10,
#     "keepalives_count": 5
# }

# USERS_DATABASE_URL = os.environ.get("USERS_DATABASE_URL")
# print("\n\n\n\n######\nUSERS_DATABASE_URL ===> ", USERS_DATABASE_URL)

# # pool = ConnectionPool(conninfo=os.environ["DATABASE_URL"])
# pool = ConnectionPool(conninfo=USERS_DATABASE_URL)
# # conn = psycopg.connect(USERS_DATABASE_URL)
# # conn = psycopg.connect(conninfo=USERS_DATABASE_URL, **keepalive_kwargs)


kwargs = {"autocommit": True}

USERS_DATABASE_URL = os.environ.get("USERS_DATABASE_URL")
print("\n\n\n\n######\nUSERS_DATABASE_URL ===> ", USERS_DATABASE_URL)

# pool = ConnectionPool(conninfo=os.environ["DATABASE_URL"])
pool = ConnectionPool(conninfo=USERS_DATABASE_URL)
conn = psycopg.connect(conninfo=USERS_DATABASE_URL, **kwargs)
