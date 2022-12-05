# FROM python:3.10-bullseye
# RUN python -m pip install --upgrade pip
# WORKDIR /deps
# COPY requirements.txt requirements.txt
# ADD https://github.com/ufoscout/docker-compose-wait/releases/download/2.9.0/wait /wait
# RUN chmod +x /wait
# RUN python -m pip install -r requirements.txt
# WORKDIR /app
# CMD /wait && python -m migrations up && uvicorn main:app --reload --host 0.0.0.0
FROM python:3.10-bullseye
RUN python -m pip install --upgrade pip
WORKDIR /app

# Copy the top-level files in your service's directory
# Modify these instructions to do that
COPY requirements.txt requirements.txt
COPY main.py main.py

# Copy all of the subdirectories in your service's directory
# Modify these instructions to do that
COPY migrations migrations
COPY queries queries
COPY routers routers

ADD https://github.com/ufoscout/docker-compose-wait/releases/download/2.9.0/wait /wait

RUN pip install -r requirements.txt
CMD /wait && python -m migrations up && uvicorn main:app --reload --host 0.0.0.0
# CMD uvicorn main:app --reload --host 0.0.0.0 --port 0.0.0.0:8090