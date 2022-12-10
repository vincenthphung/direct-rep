from fastapi.testclient import TestClient
from routers.letters import authenticator
from queries.letters import LetterRepository
from queries.reps import RepRepository
from routers.reps import RepIn
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


# class CreateRep:
#     def create(self, rep):
#         data = RepIn(
#         office="President",
#         level="country",
#         name= "Joe Biden",
#         party= "Democrat",
#         address= "123 White House Street",
#         email= "joe@biden.com",
#         letter_id= 100,
#         ).dict()
#         # result.update(rep)
#         return data

# def test_create_rep():
#   # test_reps = {
#   #   "rep_id": 100,
#   #   "office": "President",
#   #   "level": "country",
#   #   "name": "Joe Biden",
#   #   "party": "Democrat",
#   #   "address": "123 White House Street",
#   #   "email": "joe@biden.com",
#   #   "letter_id": 100,
#   #   }
#     # Arrange
#   account = {
#       "id": 123,
#       "full_name": "Example",
#       "email": "example@example.com",
#       "zipcode": "12345",
#   }

#   def fake_auth():
#     return account

#   app.dependency_overrides[RepRepository] = CreateRep
#   app.dependency_overrides[authenticator.get_current_account_data] = fake_auth

#   data = RepIn(
#     office="President",
#     level="country",
#     name= "Joe Biden",
#     party= "Democrat",
#     address= "123 White House Street",
#     email= "joe@biden.com",
#     letter_id= 100,
#     ).dict()

#   expected = {
#     "rep_id": 100,
#     "office": "President",
#     "level": "country",
#     "name": "Joe Biden",
#     "party": "Democrat",
#     "address": "123 White House Street",
#     "email": "joe@biden.com",
#     "letter_id": 100,
#     }

#     # Act
#   response = client.post("/api/reps", json=data)
#   print("REPS? response", response)
#   # Assert
#   # assert response.status_code == 200
#   print("REPS test data", response)
#   assert response.json() == expected

#   # Clean up
#   app.dependency_overrides = {}
