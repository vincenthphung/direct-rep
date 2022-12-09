from fastapi.testclient import TestClient
from routers.letters import authenticator
# from queries.letters import LetterRepository
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


# def test_get_letter():
#     letter = {
#       "id": 99,
#       "created": "2008-09-15T15:53:00+05:00",
#       "topic": "coolio",
#       "stance": True,
#       "content": "Life is good",
#       "user_id": 99,
#     }
#     app.dependency_overrides[
#         authenticator.try_get_current_account_data
#     ] = lambda: letter
#     response = client.get("/api/letters")
#     app.dependency_overrides = {}
#     assert response.status_code == 200
#     data = response.json()
#     print("LETTER test data", data)
#     assert data[0] == letter



# class CreateLetter:
#     def create(self, letter):
#         result = {"id": 1, "created": "2008-09-15T15:53:00+05:00", "user_id": 1}
#         result.update(letter)
#         return result

# topic = "coolio"
# stance = True

# def test_create_letter(topic, stance):
#     # Arrange
#     app.dependency_overrides[LetterRepository] = CreateLetter
#     app.dependency_overrides[authenticator.try_get_current_account_data] = lambda: CreateLetter

#     data = {
#       "id": int,
#       "created": str,
#       "topic": str,
#       "stance": bool,
#       "content": str,
#       "user_id": int,
#     }

#     expected = {
#       "id": int,
#       "created": str,
#       "topic": str,
#       "stance": bool,
#       "content": str,
#       "user_id": int,
#     }

#     # Act
#     response = client.post("/api/letters", json=data)

#     # Assert
#     assert response.status_code == 200
#     assert response.json() == expected

#     # Clean up
#     app.dependency_overrides = {}
