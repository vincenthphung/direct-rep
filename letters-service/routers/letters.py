from fastapi import APIRouter, Depends, Response
from typing import Optional, Union, List
import requests
import json
import os
from queries.letters import (Error, LetterIn, LetterNew,
                             LetterOut, LetterUpdate, LetterRepository, IssueRepository)
# from .new_keys import OPENAI_API_KEY
from jwtdown_fastapi.authentication import Authenticator
import os

OPENAI_API_KEY = os.environ.get('OPENAI_API_KEY')
SIGNING_KEY = os.environ.get('SIGNING_KEY')
OPENAI_URL = os.environ.get('OPENAI_URL')


class MyAuthenticator(Authenticator):
    async def get_account_data(self, username: str, accounts):
        pass

    def get_account_getter(self, accounts):
        pass

    def get_hashed_password(self, account):
        pass

    def get_account_data_for_cookie(self, account):
        pass


# print("\n \n SIGNING_KEY", os.environ)
# authenticator = MyAuthenticator(os.environ["SIGNING_KEY"])
authenticator = MyAuthenticator(SIGNING_KEY)

router = APIRouter()

# add keys.py to gitignore
# openai_api_key = OPENAI_API_KEY

# headers structure vary depending on the api source
# url = "https://api.openai.com/v1/completions"
url = OPENAI_URL
# headers = {"Authorization": f'Bearer {openai_api_key}'}
headers = {"Authorization": f'Bearer {OPENAI_API_KEY}'}


async def get_open_ai(topic):
    response = requests.post(url, headers=headers, json={
        "model": "text-davinci-002",
        "prompt": topic,
        "temperature": 0.7, "max_tokens": 256
    })
    content = json.loads(response.content)
    return content


@router.post("/api/letters", response_model=Union[LetterNew, Error])
def create_letter(
    topic: str,  # use this to enter the prompt
    stance: bool,
    account_data: Optional[dict] = Depends(
        authenticator.try_get_current_account_data),
    data: get_open_ai = Depends(),
    repo: LetterRepository = Depends()
):

    if account_data:
        # print("POST letter account data", account_data)
        # input_query = "Write a letter" {if stance === true} say = "in favor of"; else: say = "in opposition to" + topic
        say = ""
        if stance == True:
            say = "in favor of"
        else:
            say = "in opposition to"
        input_query = f"Write a letter {say} {topic}"
        get_open_ai(topic=input_query)
        stance = stance
        content = data['choices'][0]['text']
        user_id = account_data['id']
        return repo.create(topic, stance, content, user_id)
    else:
        return ("Not working")


@router.get("/api/letters", response_model=Union[List[LetterOut], Error])
def get_all_letters(
    account_data: Optional[dict] = Depends(
        authenticator.try_get_current_account_data),
    repo: LetterRepository = Depends(),
):
    if account_data:
        return repo.get_all()
    else:
        return ("Not working")


@router.put("/letters/{letter_id}", response_model=Union[LetterUpdate, Error])
def edit_letter_body(
    letter_id: int,
    content: str,
    account_data: Optional[dict] = Depends(
        authenticator.try_get_current_account_data),
    repo: LetterRepository = Depends(),
) -> Union[LetterUpdate, Error]:
    if account_data:
        return repo.update(letter_id, content)
    else:
        return ("Not working")


@router.delete("/letters/{letter_id}", response_model=bool)
def delete_letter(
    letter_id: int,
    account_data: Optional[dict] = Depends(
        authenticator.try_get_current_account_data),
    repo: LetterRepository = Depends(),
) -> bool:
    if account_data:
        return repo.delete(letter_id)
    else:
        return ("Not working")


@router.get("/letters/{letter_id}", response_model=Optional[LetterOut])
def get_one_letter(
    letter_id: int,
    response: Response,
    account_data: Optional[dict] = Depends(
        authenticator.try_get_current_account_data),
    repo: LetterRepository = Depends(),
) -> LetterOut:
    if account_data:
        letter = repo.get_one(letter_id)
        if letter is None:
            response.status_code = 404
        return letter
    else:
        return ("Not working")


@router.get("/api/issues")
def get_all_issues(
    account_data: Optional[dict] = Depends(
        authenticator.try_get_current_account_data),
    repo: IssueRepository = Depends(),
):
    if account_data:
        return repo.get_all()
    else:
        return ("Not working")
