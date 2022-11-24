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

  number = []

  for i in data["offices"]:
    number.append(i["officialIndices"])

  print("\n \n \n NUMBER", number)

  # index = data["offices"][0]["officialIndices"]

  result = []
  new_data = []

  for i, item in enumerate(data["offices"]):
    new_data.append([item["name"], item["levels"], i])

  for i, item in enumerate(data["officials"]):
    # new_data.insert(i, [item["name"], item["party"]])
    new_data.append([item["name"], item["party"], i])

  print("\n \n \n NEW LIST", new_data)

  data_dict = {}
  good_data = []
  # for each item in this list
  # the item is a list
  # target == i (start at 0)
  # if the last number of the item == target:
  # append to good_data?
  k = 0
  for item in new_data:
    target = k
    if item[2] == target:
      good_data.append(item)
    k += 1

  print("\n \n \n GOOD LIST", good_data)

  for item in data["officials"]:
    rep = RepOut(name = item["name"], party = item["party"])
    result.append(rep)
    # print("\n \n \n REP LIST?", result)

  return result


@router.post("/api/reps")
def select_reps_for_letter():
    return{"message": "Hello Letter"}

@router.get("/api/reps/{reps_id}")
def get_reps_details():
    return{"message": "Hello World"}

@router.get("/api/reps")
def get_reps_list():
    return{"message": "Hello World"}
