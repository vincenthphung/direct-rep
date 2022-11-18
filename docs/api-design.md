## Log in

- Endpoint path: localhost:8000/api/login/
- Endpoint method: POST

- Request shape (form):

  - email: string
  - password: string

- Response: Account information and a token
- Response shape (JSON):
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

- Endpoint path: localhost:8000/api/signup/
- Endpoint method: POST

- Request shape (form):

  - email: string
  - password: string
  - state: dropdown
  - county: dropdown
  - city: dropdown

- Response: Account information and a token
- Response shape (JSON):
  ```json
  {
    "account": {
      «key»: type»,
    },
    "token": string
  }
  ```

## Log out (NavBar Button)

- Endpoint path: localhost:8000/api/logout/
- Endpoint method: DELETE

- Headers:

  - Authorization: Bearer token

- Response: Always true
- Response shape (JSON):
  ```json
  true
  ```

# Update Profile Page

- Endpoint path: localhost:8000/api/account/$id/
- Endpoint method: PUT

- Headers:

  - Authorization: Bearer token

- Request shape (form):

  - email: string
  - password: string
  - state: dropdown
  - county: dropdown
  - city: dropdown

- Response: Account Information
- Response shape (JSON):
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

- Endpoint path: localhost:8000/api/dashboard/
- Endpoint method: GET
- Query parameters:

  - account: filter letters to show

- Headers:

  - Authorization: Bearer token

- Response: list of users past letters
- Response shape (JSON):
  ```json
  {
      letters: [
          "id": integer,
      ]
  }
  ```

# Create Letter Page

## (GET issues list)

- Endpoint path: our database ex. localhost:8000/api/issues
- Endpoint method: GET
- Query parameters:

- Headers:

  - Authorization: Bearer token

- Response: 3 dropdowns with users reps
- Response shape (JSON):

  ```json
  "issues": [
    ...
  ]

  ```

## (POST ai letter query)

### client makes request to our backend endpoint, which makes request to open AI

### TBD

- Endpoint path: https://api.openai.com/v1/completions
- Endpoint method: POST
- Query parameters:

  - issue: dropdown
  - stance: for/against

  - {
    "model": "text-davinci-002",
    "prompt": "Say this is a test",
    "max_tokens": 6,
    "temperature": 0,
    "top_p": 1,
    "n": 1,
    "stream": false,
    "logprobs": null,
    "stop": "\n"
    }

- Headers:

  - Authorization: Bearer token

- Request shape (JSON):

```json

```

- Response:AI written letter
- Response shape (JSON):
  `json { "id": "cmpl-uqkvlQyYK7bGYrRHQ0eXlWi7", "object": "text_completion", "created": 1589478378, "model": "text-davinci-002", "choices": [ { "text": "\n\nThis is a test", "index": 0, "logprobs": null, "finish_reason": "length" } ], "usage": { "prompt_tokens": 5, "completion_tokens": 6, "total_tokens": 11 } } `

## POST create instance of letter in our database

- Endpoint path: localhost:8000/api/letters
- Endpoint method: POST
- Query parameters:

  - «name»: «purpose»

- Headers:

  - Authorization: Bearer token

- Request shape (JSON):

  ```json
  «JSON-looking thing that has the
  keys and types in it»
  ```

- Response: «Human-readable description
  of response»
- Response shape (JSON):
  ```json
  «JSON-looking thing that has the
  keys and types in it»
  ```

# Letter Edit Page (PUT)

## PUT update / edit instance of letter in our database

- Endpoint path: localhost:8000/api/letters/pk
- Endpoint method: PUT
- Query parameters:

  - «name»: «purpose»

- Headers:

  - Authorization: Bearer token

- Request shape (JSON):

  ```json
  «JSON-looking thing that has the
  keys and types in it»
  ```

- Response: «Human-readable description
  of response»
- Response shape (JSON):
  ```json
  «JSON-looking thing that has the
  keys and types in it»
  ```

# Select Reps Page

## (GET reps)

### send through backend request to hide api key

- 3rd party endpoint path: Google civics API
- Local endpoint path:localhost:8000/reps
- Endpoint method: POST
- Query parameters:

  - state: user.state
  - county: user.county
  - city: user.city

- Headers:

  - Authorization: Bearer token

- Request shape (JSON):

  ```json
  TBD
  ```

- Response: List of reps

- Response shape (JSON):

  ````json
  {}

      ```
  ````

## PUT (update letter with reps)

- Local endpoint path:localhost:8000/letter/$pk
- Endpoint method: PUT
- Query parameters:

  - reps info

- Headers:

  - Authorization: Bearer token

- Request shape (JSON):

  ```json
  TBD
  ```

- Response: Updated letter with reps info

- Response shape (JSON):

  ````json
  {}

      ```
  ````

# Review Page (GET.pk)

## (GET letter)

- Local endpoint path:localhost:8000/review
- Endpoint method: GET
- Query parameters:

- Headers:

  - Authorization: Bearer token

- Request shape (JSON):

  ```json
  TBD
  ```

- Response: List of reps

- Response shape (JSON):

  ````json
  {}

      ```
  ````
