from fastapi import APIRouter, Response, Depends
from typing import Optional, Union, List
import requests
import json
from queries.reps import (Error, RepIn, RepOut, CivicsOut, RepRepository)
from jwtdown_fastapi.authentication import Authenticator
import os

GOOGLE_CIVICS_KEY = os.environ.get("GOOGLE_CIVICS_KEY")
GOOGLE_CIVICS_URL = os.environ.get('GOOGLE_CIVICS_URL')
SIGNING_KEY = os.environ.get('SIGNING_KEY')


class MyAuthenticator(Authenticator):
    async def get_account_data(self, username: str, accounts):
        pass

    def get_account_getter(self, accounts):
        pass

    def get_hashed_password(self, account):
        pass

    def get_account_data_for_cookie(self, account):
        pass


authenticator = MyAuthenticator(SIGNING_KEY)

router = APIRouter()

url = GOOGLE_CIVICS_URL
headers = {"x-goog-api-key": GOOGLE_CIVICS_KEY}


async def get_civics_api_reps(zipcode):
    response = requests.get(url,
                            params={
                                "address": zipcode,
                                "levels": [
                                    "country",
                                    "administrativeArea1",
                                    "administrativeArea2",
                                    "locality"]},
                            headers=headers)
    content = json.loads(response.content)
    return content


@router.get("/civics", response_model=Union[List[CivicsOut], Error])
def get_reps_from_api(
        zipcode: str,
        account_data: Optional[dict] = Depends(
            authenticator.try_get_current_account_data),
        data: get_civics_api_reps = Depends()):
    if account_data:
        get_civics_api_reps(zipcode=zipcode)

        list_a = []  # offices
        list_b = []  # officials
        list_c = []  # combined

        # gather data from offices
        for i, item in enumerate(data["offices"]):
            list_a.append([item["name"], item["levels"],
                          item['officialIndices']])

        # gather data from officials
        for i, item in enumerate(data["officials"]):
            if 'address' in item:
                if 'emails' in item:
                    list_b.append([item["name"], item["party"],
                                  item["address"], item['emails'][0], i])
                else:
                    list_b.append([item["name"], item["party"],
                                  item["address"], 'N/A', i])
            elif 'emails' in item:
                list_b.append([item["name"], item["party"], [
                              {'line1': 'N/A', 'city': 'N/A',
                               'state': 'N/A', 'zip': 'N/A'}
                              ], item['emails'][0], i])
            else:
                list_b.append([item["name"], item["party"], [
                              {'line1': 'N/A', 'city': 'N/A',
                               'state': 'N/A', 'zip': 'N/A'}
                              ], "N/A", i])

        # combine both data into one list
        for i in list_a:
            for j in list_b:
                if i[1] == ['country']:  # level
                    if i[2][0] == j[4] or j[4] in i[2]:
                        # office name and index numbers
                        list_c.append([i[0], i[1], j[0], j[1], j[2], j[3]])

                if i[1] == ['administrativeArea1']:
                    if i[2][0] == j[4] or j[4] in i[2]:
                        # office name and index numbers
                        list_c.append([i[0], i[1], j[0], j[1], j[2], j[3]])

                if i[1] == ['administrativeArea2']:
                    if i[2][0] == j[4] or j[4] in i[2]:
                        # office name and index numbers
                        list_c.append([i[0], i[1], j[0], j[1], j[2], j[3]])

                if i[1] == ['locality']:
                    if i[2][0] == j[4] or j[4] in i[2]:
                        # office name and index numbers
                        list_c.append([i[0], i[1], j[0], j[1], j[2], j[3]])

        result = []
        # use the combined list to create the output for the endpoint
        for item in list_c:
            rep = CivicsOut(
                office=item[0],
                level=item[1][0],
                name=item[2],
                party=item[3],
                address={
                    'line1': item[4][0]['line1'],
                    'city': item[4][0]['city'],
                    'state': item[4][0]['state'],
                    'zip': item[4][0]['zip']},
                email=item[5]
            )
            result.append(rep)
        return result
    else:
        print("Not Authorized")


@router.post("/api/reps", response_model=Union[RepOut, Error])
def select_rep(
    rep: RepIn,
    account_data: Optional[dict] = Depends(
        authenticator.get_current_account_data),
    repo: RepRepository = Depends(),
):
    if account_data:
        return repo.create(rep)
    else:
        print("Not Authorized")


@router.get("/reps/{rep_id}", response_model=Optional[RepOut])
def get_one_rep_selection(
    rep_id: int,
    response: Response,
    account_data: Optional[dict] = Depends(
        authenticator.try_get_current_account_data),
    repo: RepRepository = Depends(),
) -> RepOut:
    if account_data:
        rep = repo.get_one(rep_id)
        if rep is None:
            response.status_code = 404
        return rep
    else:
        print("Not Authorized")


@router.get("/api/reps", response_model=Union[List[RepOut], Error])
def get_all_reps_selection(
        account_data: Optional[dict] = Depends(
            authenticator.try_get_current_account_data),
        repo: RepRepository = Depends(),
):
    if account_data:
        return repo.get_all()
    else:
        print("Not Authorized")


@router.get("/reps/letter/{letter_id}",
            response_model=Union[List[RepOut], Error])
def get_reps_per_letter(
    letter_id: int,
    response: Response,
    account_data: Optional[dict] = Depends(
        authenticator.try_get_current_account_data),
    repo: RepRepository = Depends(),
):
    if account_data:
        rep = repo.get_per_letter(letter_id)
        if rep is None:
            response.status_code = 404
        return rep
    else:
        print("Not Authorized")


@router.delete("/reps/letters/{letter_id}", response_model=bool)
def delete_reps_from_letter(
    letter_id: int,
    rep_id: int,
    account_data: Optional[dict] = Depends(
        authenticator.try_get_current_account_data),
    repo: RepRepository = Depends(),
) -> bool:
    if account_data:
        return repo.delete(letter_id, rep_id)
    else:
        print("Not Authorized")
