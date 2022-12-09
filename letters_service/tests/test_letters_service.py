import os
# from psycopg_pool import ConnectionPool
import psycopg
from fastapi.testclient import TestClient
from routers.letters import authenticator
from main import app

client = TestClient(app)

print("Letters test file")

# def test_get_token_returns_none_for_user_not_logged_in():
#     app.dependency_overrides[authenticator.try_get_current_account_data] = lambda: None
#     response = client.get("/token")
#     app.dependency_overrides = {}
#     assert response.status_code == 200
#     assert response.json() == None


def test_create_letter():
    letter = {
      "id": 1,
      "created": "2008-09-15T15:53:00+05:00",
      "topic": "coolio",
      "stance": True,
      "content": "Life is good",
      "user_id": 1,
    }
    app.dependency_overrides[
        authenticator.try_get_current_account_data
    ] = lambda: letter
    response = client.get("/api/letters")
    app.dependency_overrides = {}
    assert response.status_code == 200
    data = response.json()
    assert data["letter"] == letter
