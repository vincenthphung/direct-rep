# Journal - Aaryan Mittal

# PROJECT SETUP

## November 7, 2022 (Monday)

We decided upon our group Project idea and name. We decided to work upon a web application that auto generates letters through OpenAI API and sends it to representatives according to the users zipcode through Google Civics API.

## November 8, 2022 (Tuesday)

We designed the wireframes for our web applications and had effective discussions for the models and design for our web application.

## November 9, 2022 (Wednesday)

We started to work upon the endpoints for our web application. We created a new readme.md file for our endpoints. We even designed the methods for our endpoints and decided the body for the post and put methods.

## November 10, 2022 (Thursday)

We spend more time on making our endpoints more efficient. We made changes to the use model and changed the signup method from dropdowns for state, city and county to only zipcode. This made our code better as we had better aces for the accurate data for the user through civics API, as zipcode made the location more accurate.

# PROJECT (CODE)

## Goals for the week 2

1. Finish FastAPI docs page with the endpoints.

2. Try Migration for a model.

3. Check API working model.

4. Finish the MVP in ReadMe.MD.

5. Start with authentication.

## November 14, 2022 (Monday)

### Work done during the day

1. We started with setting up FastAPI for our project. We set up the Docker.yaml file and the FastAPI set up for the letter and user model.

2. We started with Pair Programming and John shared his screen and the whole group assisted him.

3. We determined the database to use for our project. We were confused between MongoDB and PostgreSQL. We finally decided to set up the PostgreSQL database.

### Work achieved during the day.

1. FastAPI set up done for the project.

2. The PostgreSQL database is working.

3. The project is working locally on all our systems.

## November 15, 2022 (Tuesday)

### Work done during the day

1. We spent time working our endpoints readme file as made changed to the endpoints according to the FastAPI docs.

2. We designed our project diagram with the models wireframes and the endpoints for each model on Excalidraw.

3. We spent time doing more research on Google Civic API and OpenAI APi.

### Work achieved during the day.

1. Better endpoints according to the FastAPI docs.

2. A finalized diagram for our project on Excalidraw.

## November 16, 2022 (Wednesday)

### Work done during the day

1. We started with pair programming. I shared my screen for the group and did the code. I started with making the endpoints in the router folder for the letters service. Vincent designed the endpoints for the Users MOdels. I organized Vincent's endpoints for the users model using routers and queries folder.

2. I designed the migrations folder for the letters service with the help of the team(pair programming). I made the the migration model for the letter model in the letters service. We faced problem while doing the migration in Docker. The whole team spent time looking on the docker file. We came up with the solution after spending around two hours as there was a problem with admin username in the docker compose file.

3. Kim and I did pair programming. I shared my screen and we designed the BaseModel for the letter Model. We designed the LetterIn and LetterOut BaseModel. I made the letter repository in queries.py and made the post method working.

### Work achieved during the day.

1. Endpoints for the letters and users service working.

2. First migration working for the letter model in letter service.

3. Post Method working for the letter model in letters service.

## November 17, 2022 (Thursday)

### Work done during the day

1. We started with pair programming. Vincent shared his screen. We worked upon writing the readme.md file for our project.

2. I reviewed and worked upon the Excalidraw diagram for the project. I redesigned the wireframes and endpoints according to the updated we made on the readme.md file.

3. I added /api in the beginning of the url after localhost for all the endpoints for the users and letter service.

### Work achieved during the day

1. Finished the readme.md file for the mvp.

2. Finalized the excalidraw diagram for the project.

3. Reviewed the endpoints with /api in the beginning.

## November 18, 2022 (Friday)

### Work done during the day

1. We started with pair programming. Kim shared her screen. We worked upon adding the authentication feature with making the login, logout and signup page work for the users service. We faced problems while working with the routers and queries files and solved it with consistently checking the terminal.

2. Kim had a problem with her React Server. We debugged it for some time and realized it was a problem with her system.

### Work achieved during the day

1. Authentication is working with signup, login and logout.

2. React server issue is solved.

## Goals for the week 3

1. Finish all the CRUD operations for the endpoints.

2. Start with Front-end(React). Make the Signup, Login and Logout form working in React.

3. Make the Civics API and OpenAi API working.

## November 21, 2022 (Monday)

### Work done during the day

1. We started with pair-programming. Kim and John did back-end and worked upon the OpenAI endpoints. Vincent and I started with the front-end. When Vincent and I started we faced a problem with a react library. The react-router-dom was not working properly and we realized that the library had not been installed.

2. Vincent and I continued working on the front-end and. We finished with the signup form in the react.

### Work achieved during the day

1. OpenAI Post request endpoint finished.

2. Signup form in React complete.

## November 22, 2022 (Tuesday)

### Work done during the day

1. Today, we spent time on our backend. Our group worked on different endpoints for the letter service. I worked upon the update user endpoint. I faced some issues while working with the token and hashed password. I was finally able to make the update user endpoint work by referencing the code to create user.

2. I spent time working on the user signup form. I used React Hooks to make the signup form and I connected it to the database using React Redux. I was new to React Redux, so I had to do to some research to make it work.

### Work achieved during the day

1. All letters endpoints working.

2. User update endpoint working.

3. Signup form in React(frontend) connected to database.

## November 23, 2022 (Wednesday)

### Work done during the day

1. Today, I spent time working on the frontend. I worked upon react and created the navbar and the dashboard page with the get all letters method.

2. I worked in the backed and created a delete letter method and endpoint. I integrated this endpoint to the frontend in the dashboard page.

### Work achieved during the day

1. React Navbar made for the application.

2. Dashboard page working with get all letter working.

3. Delete endpoint for letters working in backend and frontend.

## Goals for the week 4

1. Work on authentication.

2. Optimize the frontend according to authentication.

3. Finish the minimal viable product.

## November 28, 2022 (Monday)

### Work done during the day

1. I worked upon the create letter endpoint and faced a error 402.

2. The group worked upon different endpoints. We put the issues into the database.

3. Get reps api call from Civics Api was finished by Kim.

### Work achieved during the day

1. Create letter frontend working.

2. Made all the issues for letters.

3. reps API working in frontend.

## November 29, 2022 (Tuesday)

### Work done during the day

1. Today we worked more upon the create letter frontend. We faced a lot of challenged when connecting it to the backend as we needed to make an api call. The main issue faced was on the url. I started pair programming with Kim and Vincent. We worked upon the params of the url but were facing problems while linking it to the topic and stance part of the url. After doing a lot off research we found out that topic could be sent in the body of the mutation and it now made the body params of the url variable. Although, this did not solve the issue as topic put in by the user was not being a part of the url param. After trying different patterns, I tried curly braces for the topic params in the mutation as the topic started params got connected with the users topic.

2. The first param of the create user url was working. The next problem was connecting the stance of the user to the url to make the api call. We tried the same pattern with stance as we did wit topic. Although, it did not work. After doing a lot research through the documentation, we found a different way through implementing args(arguments) in the url. We, tried this and it still did not work. We were losing hope and I realized that there was a problem in form and not in the mutation. So, the problem was the user's input was not getting read by the browser and we fixed it in two minutes. And, finally, the url for the create letter was working.

3. John worked upon the issues as there were problems in the database. In the end of every issues there was a "/n" coming up.

### Work achieved during the day

1. Create letter form (frontend) connected with the backend.

2. All the issues working in the backend.

## November 30, 2022 (Wednesday)

### Work done during the day

1. Today, I worked upon populating the issues from the issues model. I populated the issues into create letter form in react. So, now the issues(in create letter form) can be selected from a dropdown which is connected to the issues model in the database.

2. I used the react copy clipboard library to create an alert message and copy the contents of a letter from the review page.

3. Our group pair programmed and I shared my screen. We worked upon implementing authentication for the all the endpoints in the letters service. We faced a lot issues in the beginning such as connecting the authenticator from the letters microservice. Later, we were abe to resolve it by duplicating a new authenticator in the router by using the same signing key for all the microservices.

4. Our group spent time on the react part of authentication. We faced a lot problems, so , we decided to do more research and work on it the next day.

### Work achieved during the day

1. Issues dropdown working in the create letter form.

2. Copy letter working in review page.

3. Authentication working for all the letters endpoints.

## December 1, 2022 (Thursday)

### Work done during the day

1. We worked upon login component today. There were problems for the endpoints in react authentication. We fixed by revisiting all the endpoints. We solved the login unauthorized error by trial and error method. We fixed it by trying all the patterns that we could form.

2. We created a react redux file for the login component and connected to all the redux endpoints and React store.

3. We included login authorization for the dashboard and review page.

4. Kim and Vincent did pair-programming and worked upon the edit letter endpoint for react.

5. While merging, I merged the wrong branch to main branch. This lead to a broken main branch and none of our work for the day was reflecting in the main branch. So, I manually changed all the files not realizing I merged the wrong branch. We fixed main, although, we were still confused in what led to the error. So, we checked gitlab and found out that I had merged the wrong branch which led to a broken main branch.

### Work achieved during the day

1. Login user component working in React.

2. Redux file for login component created and connected with React store.

3. Authorization working for all the frontend endpoints.

4. Edit letter endpoint for frontend.

5. Fixed Main branch after wrong merge.

## December 2, 2022 (Friday)

### Work done during the day

1. My team worked upon the logout component for authentication in frontend. Kim worked upon it.

2. I worked upon the flow for making a letter. I connected the create letter page to edit letter. So when a letter is made the user is directly taken to edit letter. Then I connected the edit letter to representative selection page. So, after editing the letter the used can select the reps accordingly. Then, I connected the reps page to the final review page. So, after the letter is made the user can see the final letter with the representatives accordingly. I also worked upon the interface of the review to make it appear better.

3. We worked upon the navigation bar to change according to authentication.

4. We started working upon deployment. We did pair programming and John shared his screen. We were unable to finish it and were facing errors. So, we decided to do more research upon and then finish it.

### Work achieved during the day

1. Login component working in frontend.

2. All the endpoints after creating a letter are connected.

3. Navigation bar working according to authentication.

## Goals for the week 5

1. Finish Deployment for the application.

2. Write unit tests for the working components.

3. Start working on stretch goals.


## December 5, 2022 (Monday)

### Work done during the day

1. I worked upon showing the loading sign when there is a buffer while generating a letter. I used a built in react library named PromiseTracker and added it to the index.js page to make it work.

2. We worked upon cleaning the console errors and messages.

3. John worked upon deployment and succeeded with deploying one letters microservice.

4. Kim added the created by field to the letters table and then filtered the letters in dashboard according to the user.

### Work achieved during the day

1. Loading sign showing during the buffer time to generate a letter.

2. Browser console in cleaned and has no errors.

3. Letters in dashboard filtered for each user.
