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

## Friday 11/18/2022

Worked on Authentication today.

Worked as a team with screen sharing to create the Users table in our database.
Ran migrations in users and letters to update my database. We all merged in our journal updates.
Then we created our post endpoint to create a user account, and added login and logout with djwot tokens.
To do this we also had to update our requirements.txt to include the new libraries.

I had an issue with my React container which was solved by simply deleting and recreating the run.sh file.
Was told by Adrian that it has to do with Windows vs Mac and CRLF vs LF, which are spaces on lines nvisible to the eye.

Other than that, everything went well. Hoping to start some frontend next week and pair programming.
(So far we have worked as a group with everyone taking a turn at screen sharing).
Feeling great about this group!

## Monday 11/21/2022

Spent some time over the weekend learning more about OpenAI. Was able to edit the prompt input by passing the input in as an argument for the third party api function call.

Today we did pair programming. I worked with John using VS Code Live Share to integrate the Open AI api with the backend. Now we can create a letter in our database with the POST request. We added a variable to have "in favor of" and "in opposition to" options, added to the prompt input with concatenation. We learned more about the third party API's different query options.

We added "requests" to our requirements.txt so it will be a part of our file now.

We regrouped with the others and merged all our work into main. They worked on the frontend User form. Great progress all around and pair programming was fun!

Thoughts for next stand up:

- need to add a POST endpoint to create issues to add them to the database or create SQL INSERT in migrations to hardcode the issues
- need to create an issues table in the database
- create the reps selection table in the database
- add PUT endpoint to update user info
- connect PUT endpoint for editing letter
- dashboard page should be in letters microservice
- add a GET endpoint to get all letters for dashboard
- add a GET endpoint to get all reps for dashboard
- these will be filtered by the auth / user
