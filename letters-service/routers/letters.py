from fastapi import APIRouter, Depends, Response
from typing import Union
from queries.letters import(Error, LetterIn, LetterOut, LetterRepository)

router = APIRouter()

@router.post("/letters", response_model=Union[LetterOut, Error])
def create_letter(
    letter: LetterIn,
    response: Response,
    repo: LetterRepository = Depends(),
):
    return repo.create(letter)

@router.put("/letters/{letters_id}")
def edit_letter_body():
    return{"message": "Hello Body"}

@router.get("/letters/{letters_id}")
def get_letter_details():
    return{"message": "Hello World"}

@router.get("/issues")
def get_issues():
    return{"message": "Hello World"}

@router.post("/reps")
def select_reps_for_letter():
    return{"message": "Hello Letter"}

@router.get("/reps/{reps_id}")
def get_reps_details():
    return{"message": "Hello World"}

@router.get("/civics")
def get_reps():
    return{"message": "Hello World"}
