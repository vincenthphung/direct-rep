from fastapi import APIRouter, Response, Depends
import requests
import json
from .new_keys import GOOGLE_CIVICS_KEY

router = APIRouter()

google_api_key = GOOGLE_CIVICS_KEY
url = "https://www.googleapis.com/civicinfo/v2/representatives"
# "x-goog-api-key" is google's word for "Authorization"
headers = {"x-goog-api-key": google_api_key}
params = {"address": "02116", "levels": "administrativeArea1"}

# levels info:
# "country" = federal
# "administrativeArea1" = US states
# "administrativeArea2" = US counties
# "locality" = US cities

async def get_civics_api_reps():
  response = requests.get(url, params=params, headers=headers)
  content = json.loads(response.content)
  # print("\n \n \n RESPONSE", content)
  return content

@router.get("/civics")
def get_reps_from_api(data: get_civics_api_reps = Depends()):

  # print("\n \n \n DATA", data)

  name = data["officials"][0]["name"]
  address = data["officials"][0]["address"]
  party = data["officials"][0]["party"]

  office = data["offices"][0]["name"]
  level= data["offices"][0]["levels"]


  names = []
  addresses = []
  parties = []
  offices = []
  levels = []

  names = [i["name"] for i in data["officials"]]
  # addresses = [i["address"] for i in data["officials"]]
  parties = [i["party"] for i in data["officials"]]
  offices = [i["name"] for i in data["offices"]]
  levels = [i["levels"] for i in data["offices"]]

  print("\n \n \n NAMES", names)
  print("\n \n \n ADDRESSES", addresses)
  print("\n \n \n PARTIES", parties)
  print("\n \n \n OFFICES", offices)
  print("\n \n \n LEVELS", levels)

  # connect names and levels via officialindices key?
  # "officialIndices":[8,9,10,11,12,13,14]


  return "NAME:", name, "ADDRESS:", address, "PARTY:", party, "OFFICE:", office, "LEVEL:", level
# create list, append each item from list



@router.post("/api/reps")
def select_reps_for_letter():
    return{"message": "Hello Letter"}

@router.get("/api/reps/{reps_id}")
def get_reps_details():
    return{"message": "Hello World"}

@router.get("/api/reps")
def get_reps_list():
    return{"message": "Hello World"}
