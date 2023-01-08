## localhost:8090: letters_service:

### Get All Letters

- Endpoint path: /api/letters
- Endpoint method: GET method

- Headers:

  - Authorization: Bearer token

- Response: List of all letters

- Response shape (JSON):
  ```json
  [
    {
      "id": 0,
      "created": "2022-12-12T03:56:37.142Z",
      "topic": "string",
      "stance": true,
      "content": "string",
      "user_id": 0
    }
  ]
  ```

### Create Letter

- Endpoint path: /api/letters
- Endpoint method: POST method
- Query parameters:

  - topic: define letter's topic
  - stance: define letter's stance

- Headers:

  - Authorization: Bearer token

- Request shape (JSON):

  ```json
  { "topic": "string", "stance": "boolean" }
  ```

- Response: Letter created with third party Open AI API
- Response shape (JSON):
  ```json
  {
    "id": 0,
    "topic": "string",
    "stance": true,
    "content": "string",
    "user_id": 0
  }
  ```

### Get One Letter

- Endpoint path: /letters/{letter_id}
- Endpoint method: GET method
- Query parameters:

  - letter_id: pick one letter

- Headers:

  - Authorization: Bearer token

- Response: One letter
- Response shape (JSON):
  ```json
  {
    "id": 0,
    "created": "2022-12-12T04:00:12.644Z",
    "topic": "string",
    "stance": true,
    "content": "string",
    "user_id": 0
  }
  ```

### Edit Letter Body

- Endpoint path: /letters/{letter_id}
- Endpoint method: PUT method
- Query parameters:

  - letter_id: pick one letter
  - content: content to edit

- Headers:

  - Authorization: Bearer token

- Request shape (JSON):

  ```json
  {
    "letter_id": "integer",
    "content": "string"
  }
  ```

- Response: Edited letter content
- Response shape (JSON):
  ```json
  {
    "content": "string"
  }
  ```

### Delete Letter

- Endpoint path: /letters/{letter_id}
- Endpoint method: DELETE method
- Query parameters:

  - letter_id: pick one letter

- Headers:

  - Authorization: Bearer token

- Response: Confirmation of deletion
- Response shape (JSON):
  ```json
  true
  ```

### Get All Issues

- Endpoint path: /api/issues
- Endpoint method:GET method
- Headers:

  - Authorization: Bearer token

- Response: List of issues
- Response shape (JSON):
  ```json
  "string"
  ```

### Get Reps From Api

- Endpoint path: /civics
- Endpoint method: GET method
- Query parameters:

  - zipcode: to send to Google Civics Third Party API

- Headers:

  - Authorization: Bearer token

- Response: List of reps for that zipcode from google civics
- Response shape (JSON):
  ```json
  [
    {
      "office": "string",
      "level": "string",
      "name": "string",
      "party": "string",
      "address": {},
      "email": "string"
    }
  ]
  ```

### Get All Reps Selection

- Endpoint path: /api/reps
- Endpoint method: GET method
- Headers:

  - Authorization: Bearer token

- Response: List of reps selected by user
- Response shape (JSON):
  ```json
  [
    {
      "rep_id": 0,
      "office": "string",
      "level": "string",
      "name": "string",
      "party": "string",
      "address": "string",
      "email": "string",
      "letter_id": 0
    }
  ]
  ```

### Select Rep

- Endpoint path: /api/reps
- Endpoint method: «HTTP method»

- Headers:

  - Authorization: Bearer token

- Request shape (JSON):

  ```json
  {
    "office": "string",
    "level": "string",
    "name": "string",
    "party": "string",
    "address": "string",
    "email": "string",
    "letter_id": 0
  }
  ```

- Response: Rep selected by user
- Response shape (JSON):
  ```json
  {
    "rep_id": 0,
    "office": "string",
    "level": "string",
    "name": "string",
    "party": "string",
    "address": "string",
    "email": "string",
    "letter_id": 0
  }
  ```

### Get One Rep Selection

- Endpoint path: /reps/{rep_id}
- Endpoint method: GET method
- Query parameters:

  - rep_id: pick one rep

- Headers:

  - Authorization: Bearer token

- Response: One rep selected by user
- Response shape (JSON):
  ```json
  {
    "rep_id": 0,
    "office": "string",
    "level": "string",
    "name": "string",
    "party": "string",
    "address": "string",
    "email": "string",
    "letter_id": 0
  }
  ```

### Get Reps Per Letter

- Endpoint path: /reps/letter/{letter_id}
- Endpoint method: GET method
- Query parameters:

  - letter_id: get list of reps selected for one letter

- Headers:

  - Authorization: Bearer token

- Response: List of reps selected for that letter
- Response shape (JSON):
  ```json
  [
    {
      "rep_id": 0,
      "office": "string",
      "level": "string",
      "name": "string",
      "party": "string",
      "address": "string",
      "email": "string",
      "letter_id": 0
    }
  ]
  ```

### Delete Reps From Letter

- Endpoint path: /reps/letters/{letter_id}
- Endpoint method: DELETE method
- Query parameters:

  - letter_id: to select letter
  - rep_id: to select rep

- Headers:

  - Authorization: Bearer token

- Response: Confirmation of deletion
- Response shape (JSON):
  ```json
  true
  ```
