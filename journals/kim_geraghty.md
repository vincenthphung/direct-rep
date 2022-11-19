# Journal - Kim Geraghty

## Tuesday 11/08/2022

Received project and grading instructions.

Requirements include:

- using FastAPI for Backend
- PostrgreSQL or MongoDB for Database
- React for Frontend
- Login / Logout feature

Decided on project and name: Direct Rep.

## Wednesday 11/09/2022

Worked on our wireframe and user story.

## Monday 11/14/2022

Spent some time looking into the Google Civics API and set up my own Google API key.

## Tuesday 11/15/2022

Was able to create a connection with the Google Civics API: succesful GET request. This felt great!
I learned how to create an async function with requests to call the Google API, and use this function within another function with a @router.get header to create the local endpoint.
To use the async function in the actual GET endpoint, I added it as a dependency with = Depends().

First stand up. Team is focused on learning more about FastAPI and scaffolding for the endpoints.

## Wednesday 11/16/2022

Spent some time looking into the Open AI API and set up my own OpenAI API key.

Worked as a team to create our first endpoints on our localhost:8000/docs page.
Together, we created our docker-compose file to have multiple databases.
We decided to use PostgreSQL for our database. 
We were able to run our first migration and have a working POST endpoint with our letter model. This felt great!

## Thursday 11/17/2022

Was able to create a connection with the OpenAI API: succesful POST request. This felt amazing!
I had to pass in the url, headers, and json for the request. Now able to make requests to OpenAI and get responses.
Learning how to parse through the response to show just the parts that I want to see. For example data[0]["key_name"]

Worked as a team to finalize our ReadMe with the MVP and diagrams for Friday's deadline.
Our database is ready and working, everything looks great.
We worked through a few git pull and merge issues and are learning how to handle these more succesfully.

Plan to review info about Authentication and Logins.