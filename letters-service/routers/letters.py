from fastapi import APIRouter, Depends, Response
from typing import Union
import requests
import json
from queries.letters import(Error, LetterIn, LetterOut, LetterRepository)
<<<<<<< HEAD

router = APIRouter()

# put the key in a hidden file that doesn't go on gitLab
# openai_api_key = os.getenv("OPENAI_API_KEY")

=======
from .new_keys import OPENAI_API_KEY

router = APIRouter()

# add keys.py to gitignore
openai_api_key = OPENAI_API_KEY

# headers structure vary depending on the api source
>>>>>>> ffc5329 (updates to Open AI api)
url = "https://api.openai.com/v1/completions"
openai_api_key = "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"
# headers structure vary depending on the api source
headers = {"Authorization": f'Bearer {openai_api_key}'}

async def get_open_ai(topic):
  response = requests.post(url, headers=headers, json={
          "model": "text-davinci-002",
          "prompt": topic,
          "temperature": 0, "max_tokens": 35
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


@router.put("/api/letters/{letters_id}")
def edit_letter_body():
    return{"message": "Hello Body"}

@router.get("/api/letters/{letters_id}")
def get_letter_details():
    return{"message": "Hello World"}

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
