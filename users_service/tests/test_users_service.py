from fastapi.testclient import TestClient
from authenticator import authenticators
from main import app

client = TestClient(app)


def test_get_token_returns_none_for_user_not_logged_in():
    app.dependency_overrides[
        authenticators.try_get_current_account_data
    ] = lambda: None
    response = client.get("/token")
    app.dependency_overrides = {}
    assert response.status_code == 200
    assert response.json() is None


def test_get_token_returns_token_for_user_logged_in():
    account = {
        "id": 123,
        "full_name": "Example",
        "email": "example@example.com",
        "zipcode": "12345",
    }
    app.dependency_overrides[
        authenticators.try_get_current_account_data
    ] = lambda: account
    response = client.get(
        "/token", cookies={authenticators.cookie_name: "HELLO!"}
    )
    app.dependency_overrides = {}
    assert response.status_code == 200
    data = response.json()
    assert data["access_token"] == "HELLO!"
    assert data["account"] == account
    assert data["token_type"] == "Bearer"
