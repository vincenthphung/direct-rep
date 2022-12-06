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

- add a GET endpoint to get all letters for dashboard ✅
- connect the GET endpoint for get one letter ✅
- add PUT endpoint to update user info ✅
- connect PUT endpoint for editing letter ✅

ISSUES:

- need to create an issues table in the database
- need to add a POST endpoint to create issues
- OR create SQL INSERT in migrations to hardcode the issues
- connect GET endpoint to get issues

REPS:

- dashboard page should be in letters microservice
- create the reps selection table in the database
- create a foreign key or reference to letter table
- add a POST endpoint to create new reps selection
- add a GET endpoint to get all reps selection for all letters
- add a GET endpoint to get all reps selection for one letter
- these will be filtered by the auth / user

FRONTEND:

- create shell for website based on wireframe
- include nav bar / menu
- learn more about Redux / finish tutorials
- eventually connect frontend forms to backend endpoints

## Tuesday 11/22/2022

Worked on some endpoints from the to-do list:

- add a GET endpoint to get all letters for dashboard ✅
- connect the GET endpoint for get one letter ✅
- add PUT endpoint to update user info ✅
- connect PUT endpoint for editing letter ✅
  We each took turns sharing our screen to create one endpoint and test it out.
  Set some goals for next to-do list and everyone has some areas we can work on individually.

Still need to review Redux tutorials to get more comfortable with that, but there is enough backend work to keep me busy until then!

I plan to spend some time working with the google civics api to start sketching out what the reps selection table will look like, and how to select them.

Also made a note to add a date_created property to the letter table, so we can later order them by date created.

We will need to figure out how to get the user's zipcode. Instructors mentioned we could probably hit the endpoint with an API call to avoid having to create a poller. Sounds like a great idea.

## Wednesday 11/23/2022

Working on the google civics api. Parsing through the JSON data.
Started to create lists to display the data we want to see.
Connecting the dots between the office names, names of the official, and the official index, when there are more than one official per office name.
Separated the zipcode variable so it becomes an input and not a hardcode.
Once the lists look good, I will try to connect it to our database with the reps selection POST endpoint.

Checked in with the group, everyone is working on a separate piece of the project. Things are moving along well!

## Friday 11/25/2022

Continued working on reps endpoints.

From google civics api, we are now able to get the data we want, formatted with the RepOut class.

Next steps:

- create rep table ✅
- connect it with letter table with a foreign key reference ✅
- connect a POST endpoint to create an instance of rep ✅
- we will have to connect these on the frontend:
  - dropdown options will be populated by the google civics api ✅
  - submit button will go to create the rep-selected instance ✅

Working on reps frontend:

- added local host path in docker compose file (last line): REACT_APP_LETTERS_API_HOST
- added RepForm.js file in src folder
- added repsApi.js file in store folder
- added to store.js
- imported and added path to file on App.js in routes

## Tuesday 11/29/2022

Back to the group after a productive holiday weekend.

Worked with Aaryan to connect the Create letter frontend.
We learned that query can only accept one argument, and found a creative way to include two arguments thanks to a stack overflow article. It took a couple of hours so it felt great to get it to work.

The Select Reps page is almost done but there is still an issue with the state. It appears that the state gets stuck in the virtual dom and therefore the render is constantly behind by one render. Still looking into how to fix this.

Previous to do list:

ISSUES:

- need to create an issues table in the database ✅
- OR create SQL INSERT in migrations to hardcode the issues ✅
- connect GET endpoint to get issues ✅

REPS:

- create the reps selection table in the database ✅
- create a foreign key or reference to letter table ✅ (added cascade on delete)
- add a POST endpoint to create new reps selection ✅
- add a GET endpoint to get all reps selection for all letters ✅
- add a GET endpoint to get all reps selection for one letter ✅

FRONTEND:

- create shell for website based on wireframe ✅
- include nav bar / menu ✅

Looking back on this to do list, a lot has been achieved and the project is really coming along.

Upcoming to do list:

- connect issues to create letter dropdown on frontend
- connect AUTH everywhere
- connect login, logout, and edit account forms
- connect edit letter frontend
- fix state rerender issue on reps form
- add POST endpoint for issues? (stretch goal)
- clean up code: delete / comment out print and console log statements
- clean up endpoints: some inconsistencies

The list is getting shorter! I can see the end in sight 😊

## Wednesday 11/30/2022 and Thursday 12/1/2022

AUTH:

We got the authentication working on the backend and frontend.

For the backend we had to add a new Authenticator class in our letters microservice, since the authenticator file is in the user microservice.

Then we had to update our routers with the following:

```
account_data: Optional[dict] = Depends(authenticator.try_get_current_account_data),
```

For the frontend, we added the TokenTest.js file to be able to create and retrieve the token. Then we connected it to our LoginTest form, where we use state to define username and password, and then call the login function.

We had to make sure the endpoints being called matched what we had in the backend: /token.

I added console.log statements everywhere to be able to follow the token and see what was going on.

Then we had to add the authorization as a header, with the token,to all of our endpoints throughout the React files, inculde the Redux fetch calls.

CONNECT ZIPCODE TO USER:

The RepForm now pulls the zipcode from the current user, by hitting the get account endpoint, and including credentials in that fetch call. Numbers starting with a leading 0 aren't working so we'll have to find a way to fix that (either directly in the SQL table, or by checking the length of the zipcode and adding 0 on the frontend).

The edit letter is now complete. We only edit the content. Followed the same approach as for create letter to pass multiple query arguments to the redux query option:

```
      query: (arg) => {
        const { oneId, oneContent } = arg;
        ... }
```

Updated to do list:

- start deployment
- add unit tests
- finish logout button
- edit / hide nav bar
- filter letters per user

## Friday 12/2/2022 and Monday 12/5/2022

On Friday we started testing deployment. There is still a lot to learn on that front.
Over the weekend I spent some time cleaning up the code, commenting out console log and print statements, and fixing a few errors that still popped up in the console.
I edited tables to make sure keys were not overlapping.
I added do not if null statements to prevent some fetch functions from running empty (!= null)
I updated useEffect dependencies where needed to make sure they run smoothly.
I added .then to our navigate links to make sure the user doesn't get to a page before the state has had time to change.

Today I added the user_id field to the letter table so that we can filter the letters by user. This connects to the account data in the backend that is being pulled during the authentication check.

The MVP is practically complete.

Updated to do list:

- fix leading zeros issue for zipcodes that start with zeros
- create unit tests
- get deployment done.

The list keeps getting shorter!
