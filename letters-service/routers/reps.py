from fastapi import APIRouter, Response, Depends
from typing import Optional, Union, List
import requests
import json
from queries.reps import(Error, RepIn, RepOut, RepRepository)
from .new_keys import GOOGLE_CIVICS_KEY

router = APIRouter()

google_api_key = GOOGLE_CIVICS_KEY
url = "https://www.googleapis.com/civicinfo/v2/representatives"
# "x-goog-api-key" is google's word for "Authorization"
headers = {"x-goog-api-key": google_api_key}

# levels info:
# "country" = federal
# "administrativeArea1" = US states
# "administrativeArea2" = US counties
# "locality" = US cities

async def get_civics_api_reps(zipcode):
  response = requests.get(url, params={"address": zipcode, "levels": "administrativeArea1"}, headers=headers)
  content = json.loads(response.content)
  return content

# @router.get("/civics")
@router.get("/civics", response_model=Union[List[RepOut], Error])
def get_reps_from_api(
  zipcode: int,
  data: get_civics_api_reps = Depends()):
  get_civics_api_reps(zipcode=zipcode)

  # name = data["officials"][0]["name"]
  # address = data["officials"][0]["address"]
  # party = data["officials"][0]["party"]
  # office = data["offices"][0]["name"]
  # level= data["offices"][0]["levels"]
  # index = data["offices"][0]["officialIndices"]

  # names = []
  # addresses = []
  # parties = []
  # offices = []
  # levels = []
  # indices = []

  # names = [i["name"] for i in data["officials"]]
  # # addresses = [i["address"] for i in data["officials"]]
  # parties = [i["party"] for i in data["officials"]]
  # offices = [i["name"] for i in data["offices"]]
  # levels = [i["levels"] for i in data["offices"]]
  # indices = [i["officialIndices"] for i in data["offices"]]

  # print("\n \n \n NAMES", names)
  # print("\n \n \n ADDRESSES", addresses)
  # print("\n \n \n PARTIES", parties)
  # print("\n \n \n OFFICES", offices)
  # print("\n \n \n LEVELS", levels)
  # print("\n \n \n INDICES", indices)

  # result = []
  # for i in data["officials"]:
  #   name = [i["name"]],
  #   party = [i["party"]]

  #   result.append(name)
  #   result.append(party)

  # for j in data["offices"]:
  #   offices = [j["name"]]
  #   level = [j["levels"]]

  #   result.append(offices)
  #   result.append(level)


  # result = []
  # for i in data["officials"]:
  #   name = [i["name"]],
  #   party = [i["party"]]

  #   result.append(name)
  #   result.append(party)

  # for j in data["offices"]:
  #   offices = [j["name"]]
  #   level = [j["levels"]]

  #   result.append(offices)
  #   result.append(level)

  result = []
  for item in data["officials"]:
    # print("\n \n \n ITEM", item)
    # print("\n \n \n NAME", item["name"])
    rep = RepOut(name = item["name"], party = item["party"])
    result.append(rep)
    print("\n \n \n REP LIST?", result)

    # result.append(rep)
  return result
  # return result
  # return "NAME:", name, "ADDRESS:", address, "PARTY:", party, "OFFICE:", office, "LEVEL:", level, "INDEX", index


@router.post("/api/reps")
def select_reps_for_letter():
    return{"message": "Hello Letter"}

@router.get("/api/reps/{reps_id}")
def get_reps_details():
    return{"message": "Hello World"}

@router.get("/api/reps")
def get_reps_list():
    return{"message": "Hello World"}
