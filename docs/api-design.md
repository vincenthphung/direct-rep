## Log in

* Endpoint path: localhost:8000/token/
* Endpoint method: POST

* Request shape (form):
  * email: string
  * password: string


* Response: Account information and a token
* Response shape (JSON):
    ```json
    {
      "account": {
        «key»: type»,
      },
      "token": string,
      "email": string
    }
    ```

# Signup Page

* Endpoint path: localhost:8000/signup/
* Endpoint method: POST

* Request shape (form):
  * email: string
  * password: string
  * state: dropdown
  * county: dropdown
  * city: dropdown


* Response: Account information and a token
* Response shape (JSON):
    ```json
    {
      "account": {
        «key»: type»,
      },
      "token": string
    }
    ```

## Log out (NavBar Button)

* Endpoint path: localhost:8000/token/
* Endpoint method: DELETE

* Headers:
  * Authorization: Bearer token

* Response: Always true
* Response shape (JSON):
    ```json
    true
    ```

# Update Profile Page

* Endpoint path: localhost:8000/account/$id/
* Endpoint method: PUT

* Request shape (form):
  * email: string
  * password: string
  * state: dropdown
  * county: dropdown
  * city: dropdown


* Response: Account Information
* Response shape (JSON):
    ```json
    {
      "account": {
        «key»: type»,
      },
      "token": string,
      "email": string,
      "state": string,
      "county": string,
      "city": string,
    }
    ```

# Dashboard Page (GET.all)

### «Human-readable of the endpoint»

* Endpoint path: localhost:8000/dashboard/
* Endpoint method: GET
* Query parameters:
  * account: filter letters to show

* Headers:
  * Authorization: Bearer token

* Response: list of users past letters
* Response shape (JSON):
    ```json
    {
        letters: [
            "id": integer,
        ]
    }
    ```

# Create Letter Page (POST letter)

* Endpoint path: OpenAI API
* Endpoint method: POST
* Query parameters:
  * issue: dropdown
  * stance: for/against

* Headers:
  * Authorization: Bearer token

* Response: 3 dropdowns with users reps
* Response shape (JSON):
    ```json
    {
        reps: [
            "name": string,
            "party": string,
            "email":string,
            "physical_address": string
        ]
    }
    ```

# Letter Edit Page (PUT)

# Review Page (GET.pk)