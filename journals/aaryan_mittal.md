# Journal - Aaryan Mittal

# PROECT OVERVIEW GROUP

## November 7, 2022 (Monday)

We decided upon our group Project idea and name. We decided to work upon a web application that auto generates letters through OpenAI API and sends it to representatives accoding to the users zipcode through Google Civics API.

## November 8, 2022 (Tuesday)

We desiged the wireframes for our web applications and had effective discussions for the models and design for our web application.

## November 9, 2022 (Wednesday)

We started to work upon the endpoints for our web application. We created a new readme.md file for our endpoints. We even designed the methods for our endpoints and decided the body for the post and put methods.

## November 10, 2022 (Thursday)

We spend more time on making our endpoints more efficient. We made changes to the use model and changed the signup method from dropdowns for state, city and county to only zipcode. This made our code better as we had better aces for the accurate data for the user through civics API, as zipcode made the location more accurate.

# WORKING PROJECT INDIVIDUAL

## November 14, 2022 (Monday)

### Goals for the week.

1. Finish FastAPI docs page with the endpoints.

2. Try Migration for a model.

3. Check API working model.

4. Finish the MVP in ReadMe.MD.

5. Start with autentication.

### Work done during the day

1. We started with setting up FastAPI for our project. We set up the Docker.yaml file and the FastAPI set up for the leter and user model.

2. We started with Pair Programming and John shared his screen and the whole group assisted him.

3. We determined the database to use for our project. We were consfsed between MongoDB and PostgreSQL. We finally decied to set up the PostgreSQL database.

### Work achieved during the day.

1. FastAPI set up done for the project.

2. The PostgreSQL database is working.

3. The project is workig locally on all our systems.

## November 15, 2022 (Tuesday)

### Work done during the day

1. We spent time working our endpoints readme file as made changed to the endpoints according to the FastAPI docs.

2. We designed our project diagram with the models wieframes and the endpoints for each model on Excalidraw.

3. We spent time doing more research on Google Civic API and OpenAI APi.

### Work achieved during the day.

1. Better endpoints according to the FastAPI docs.

2. A finalised diagram for our project on Excalidraw.

## November 16, 2022 (Wednesday)

### Work done during the day

1. We started with pair programming. I shared my screen for the group and did the code. I started with making the endpoints in the router folder for the letters service. Vincent designed the endpoints for the Users MOdels. I organised Vincent's endpoints for the users model using routers and queries folder.

2. I designed the migrations folder for the letters service with the help of the team(pair programming). I made the the migration model for the letter model in the letters service. We faced problem while doing the migration in Docker. The whole team spent time looking on the docker file. We came up with the solution after spending around two hours as there was a problem with admin username in the docker compose file.

3. Kim and I did pair programming. I shared my screen and we designed the BaseModel for the letter Model. We designed the LetterIn and LetterOut BaseModel. I made the letter repository in queries.py and made the post method working.

### Work achieved during the day.

1. Endpoints for the letters and users service working.

2. First migration working for the letter model in letter service.

3. Post Method working for the letter model in letters service.

## November 17, 2022 (Thursday)

### Work done during the day

1. We started with pair programming. Vincent shared his screen. We worked upon writing the readme.md file for our project.

2. I reviewd and worked upon the Excalidraw diagram for the project. I redseigned the wireframes and endpoints according to the udpated we made on the readme.md file.

3. I added /api in the beginning of the url after localhost for all the endpoints for the users and letter service.

### Work achieved during the day

1. Finished the readme.md file for the mvp.

2. Finalised the excalidraw diagram for the project.

3. Reviewed the endpoints with /api in the beginning.
