## localhost:8080: users_service:

### Create Account

- Endpoint path: /api/accounts
- Endpoint method: POST method

- Request shape (JSON):

  ````json
  {
  "full_name": "string",
  "email": "string",
  "zipcode": "string",
  "password": "string"
  }
    ```

  ````

- Response: Account information
  of response»
- Response shape (JSON):
  ```json
  {
    "access_token": "string",
    "token_type": "Bearer",
    "account": {
      "id": 0,
      "full_name": "string",
      "email": "string",
      "zipcode": "string"
    }
  }
  ```

### Edit Account

- Endpoint path: /api/accounts/{id}
- Endpoint method: PUT method
- Query parameters:

  - id: to select the account

- Request shape (JSON):

  ```json
  {
    "full_name": "string",
    "email": "string",
    "zipcode": "string",
    "password": "string"
  }
  ```

- Response: Account information
- Response shape (JSON):
  ```json
  {
    "access_token": "string",
    "token_type": "Bearer",
    "account": {
      "id": 0,
      "full_name": "string",
      "email": "string",
      "zipcode": "string"
    }
  }
  ```

### Get Token

- Endpoint path: /token
- Endpoint method: GET method

- Response: Account token
- Response shape (JSON):
  ```json
  {
    "access_token": "string",
    "token_type": "Bearer",
    "account": {
      "id": 0,
      "full_name": "string",
      "email": "string",
      "zipcode": "string"
    }
  }
  ```

### Login

- Endpoint path: /token
- Endpoint method: POST method
- Query parameters:

  - username: to login
  - password: to login

- Request shape (JSON):

  ```json
  {
    "username": "string",
    "password": "string"
  }
  ```

- Response: Login token
- Response shape (JSON):
  ```json
  {
    "access_token": "string",
    "token_type": "Bearer"
  }
  ```

### Logout

- Endpoint path: /token
- Endpoint method: DELETE method

- Response: Logout
- Response shape (JSON):
  ```json
  true
  ```
