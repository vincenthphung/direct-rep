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

@router.get("/civics", response_model=Union[List[RepOut], Error])
def get_reps_from_api(
  zipcode: int,
  data: get_civics_api_reps = Depends()):
  get_civics_api_reps(zipcode=zipcode)

  # see how many entries there are for offices:
  # number = []
  # for i in data["offices"]:
  #   number.append(i["officialIndices"])
  # print("\n \n \n NUMBER", number)

  list_a = [] # offices
  list_b = [] # officials
  list_c = [] # combined

  # gather data from offices
  for i, item in enumerate(data["offices"]):
    list_a.append([item["name"], item["levels"], item['officialIndices']])

  # gather data from officials
  for i, item in enumerate(data["officials"]):
    if 'address' in item:
      list_b.append([item["name"], item["party"], item["address"], i])
    else:
      list_b.append([item["name"], item["party"], [{'line1': 'N/A', 'city': 'N/A', 'state': 'N/A', 'zip': 'N/A'}], i])

  # combine both data into one list
  for i in list_a:
    for j in list_b:
      if i[1] == ['administrativeArea1']:
        if i[2][0] == j[3] or j[3] in i[2]:
          list_c.append([i[0], i[1], j[0], j[1], j[2]])

      if i[1] == ['administrativeArea2']:
        if i[2][0] == j[3] or j[3] in i[2]:
          list_c.append([i[0], i[1], j[0], j[1], j[2]])

      if i[1] == ['locality']:
        if i[2][0] == j[3] or j[3] in i[2]:
          list_c.append([i[0], i[1], j[0], j[1], j[2]])

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
      party = item[3],
      address = {'line1': item[4][0]['line1'], 'city': item[4][0]['city'], 'state': item[4][0]['state'], 'zip': item[4][0]['zip']}
      )
    result.append(rep)
  # print("\n \n \n RESULT", result)
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
