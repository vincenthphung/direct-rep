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
  response = requests.get(url, params={"address": zipcode, "levels": ["administrativeArea1", "administrativeArea2", "locality"]}, headers=headers)
  content = json.loads(response.content)
  return content

# @router.get("/civics")
@router.get("/civics", response_model=Union[List[RepOut], Error])
def get_reps_from_api(
  zipcode: int,
  data: get_civics_api_reps = Depends()):
  get_civics_api_reps(zipcode=zipcode)

  address = data["officials"][0]["address"]
  print("\n \n \n ADDRESS", address)

  addresses = []
  for i in data["officials"]:
    # if i["address"]:
      # addresses.append(i["address"])
    print("\n \n \n I", i)
  # print("\n \n \n ADDRESSES", addresses)

  # number = []
  # for i in data["offices"]:
  #   number.append(i["officialIndices"])
  # print("\n \n \n NUMBER", number)
  # index = data["offices"][0]["officialIndices"]

  list_a = []
  list_b = []
  list_c = []

  # gather data from offices
  for i, item in enumerate(data["offices"]):
    list_a.append([item["name"], item["levels"], item['officialIndices']])

  # gather data from officials
  for i, item in enumerate(data["officials"]):
    list_b.append([item["name"], item["party"], i])

  # combine both data into one list
  for i in list_a:
    for j in list_b:
      if i[1] == ['administrativeArea1']:
        if i[2][0] == j[2] or j[2] in i[2]:
          list_c.append([i[0], i[1], j[0], j[1]])

      if i[1] == ['administrativeArea2']:
        if i[2][0] == j[2] or j[2] in i[2]:
          list_c.append([i[0], i[1], j[0], j[1]])

      if i[1] == ['locality']:
        if i[2][0] == j[2] or j[2] in i[2]:
          list_c.append([i[0], i[1], j[0], j[1]])

  # print("\n \n \n LIST A", list_a)
  # print("\n \n \n LIST B", list_b)
  # print("\n \n \n LIST C", list_c)

  result = []

  # use the combined list to create the output for the endpoint
  for item in list_c:
    rep = RepOut(
      office = item[0],
      level = item[1][0],
      name = item[2],
      party = item[3])
    result.append(rep)
  print("\n \n \n RESULT", result)

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
