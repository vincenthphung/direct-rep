FROM python:3.10-bullseye
RUN python -m pip install --upgrade pip
WORKDIR /app

# Copy the top-level files in your service's directory
COPY requirements.txt requirements.txt
COPY main.py main.py
COPY authenticator.py

# Copy all of the subdirectories in your service's directory
COPY queries queries
COPY routers routers

# Copy all migrations in service directory
COPY migrations migrations

# Install requirements, run migrations, start server
RUN pip install -r requirements.txt
CMD python -m migrations up && uvicorn main:app --host 0.0.0.0