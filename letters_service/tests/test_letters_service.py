from fastapi.testclient import TestClient
from routers.letters import authenticator
from queries.letters import LetterRepository
from main import app

client = TestClient(app)

print("Letters test file")


def test_get_issue():
    issue = {
        "id": 1,
        "user_issue": "Healthcare Reform",
        "openai_issue": "a single-payer healthcare system: ",
    }
    app.dependency_overrides[
      authenticator.try_get_current_account_data
      ] = lambda: issue
    response = client.get("/api/issues")
    app.dependency_overrides = {}
    assert response.status_code == 200
    data = response.json()
    print("ISSUE test data", data)
    assert data[0] == issue


class EmptyLetters:
    def get_all(self):
        return []


def test_get_all_letters():
    # Arrange
    app.dependency_overrides[LetterRepository] = EmptyLetters
    app.dependency_overrides[
        authenticator.try_get_current_account_data
    ] = lambda: EmptyLetters
    # Act
    response = client.get("/api/letters")
    # Assert
    assert response.status_code == 200
    print("Get all letters test", response)
    assert response.json() == []
    # Clean up
    app.dependency_overrides = {}
