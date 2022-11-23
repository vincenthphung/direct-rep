from fastapi import APIRouter, Depends, Response
from typing import Optional, Union, List
import requests
import json
import os
from queries.letters import(Error, LetterIn, LetterOut, LetterUpdate, LetterRepository)
from .new_keys import OPENAI_API_KEY

router = APIRouter()

# add keys.py to gitignore
openai_api_key = OPENAI_API_KEY

# headers structure vary depending on the api source
url = "https://api.openai.com/v1/completions"
headers = {"Authorization": f'Bearer {openai_api_key}'}

async def get_open_ai(topic):
  response = requests.post(url, headers=headers, json={
          "model": "text-davinci-002",
          "prompt": topic,
          "temperature": 0.7, "max_tokens": 256
  })
  content = json.loads(response.content)
  return content


@router.post("/api/letters", response_model=Union[LetterOut, Error])
def create_letter(
    topic: str, # use this to enter the prompt
    stance: bool,
    data: get_open_ai = Depends(),
    repo: LetterRepository = Depends()
    ):

    # input_query = "Write a letter" {if stance === true} say = "in favor of"; else: say = "in opposition to" + topic
    say = ""
    if stance == True:
        say = "in favor of"
    else:
        say = "in opposition to"

    input_query = f"Write a letter {say} {topic}"
    print("\n \n \n INPUT QUERY", input_query)
    get_open_ai(topic=input_query)

    # get_open_ai(topic=topic)
    # print("\n \n \n DATA", data)
    stance = stance
    text = data['choices'][0]['text']
    print("\n \n TEXT ONLY: ", text)
    return repo.create(topic, stance, text)

@router.get("/api/letters", response_model=Union[List[LetterOut], Error])
def get_all_letters(
    repo: LetterRepository = Depends(),
    ):
    return repo.get_all()


@router.put("/api/letters/{letters_id}", response_model=Union[LetterUpdate, Error])
def edit_letter_body(
  letter_id: int,
  content: str,
  repo: LetterRepository = Depends(),
) -> Union[LetterUpdate, Error]:
  print("\n \n CONTENT", content, letter_id)
  return repo.update(letter_id, content)


@router.get("/letters/{letter_id}", response_model=Optional[LetterOut])
def get_one_letter(
    letter_id: int,
    response: Response,
    repo: LetterRepository = Depends(),
    ) -> LetterOut:
    letter = repo.get_one(letter_id)
    if letter is None:
        response.status_code = 404
    return letter

@router.get("/api/issues")
def get_issues():
    return{"message": "Hello World"}

@router.post("/api/reps")
def select_reps_for_letter():
    return{"message": "Hello Letter"}

@router.get("/api/reps/{reps_id}")
def get_reps_details():
    return{"message": "Hello World"}

@router.get("/api/civics")
def get_reps():
    return{"message": "Hello World"}
