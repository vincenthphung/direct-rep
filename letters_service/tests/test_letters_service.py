from fastapi.testclient import TestClient
from routers.letters import authenticator
from main import app

client = TestClient(app)

print("Letters test file")

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
    print("LETTER test data", data)
    assert data[0] == letter
