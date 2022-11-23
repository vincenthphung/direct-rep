## 11/15/2022 (Tuesday)
> Today we started our journals and had our first stand-up. 
> - API Design
> - What have we done up until now?
	- Modeling out the pages
	- API Endpoints
	- Bounded Contexts
	- 
> - What are we going to do the rest of the night?
> - What is blocking us from continuing?
> - Every microservice needs "its own database"
	- You can have multiple databases within a single PostgreSQL service
> - BY THE END OF THE WEEK
>	- Should be able to see FastAPI docs page
>	- Should be able to put MVP in README
>	- Should be able to see journals in Repo
>	- Get Login done

<br>
<br>
<br>
<br>

## 11/16/2022 (Wednesday)

#### TO-DO
> - pgAdmin
> - endpoints for FastAPI backend

> Aaryan made
>    - users
>      - queries
>      - routers
>    - get endpoints
>    - letters
>    	- queries
>		- routers
>			- get endpoints

<br>
<br>
<br>
<br>


## 11/17/2022 (Thursday)
Successful POST request to Open AI
Added Wireframes/Diagrams
Updated Project README

<br>
<br>
<br>
<br>

## 11/18/2022 (Friday)

>
>Kim driving
>
>created migrations folder for users-service
>
>	created init, main, 001_
>
>created routers for accounts
>
>created queries for accounts
>
>created authenticator.py
>
>added users, accounts, and authenticator routers to main.py
>
>added accounts base/in/out shape
>
>added account repo to users-service/queries/
>
>created "create_account" function in users-service/routers/accounts.py
>
>got account creation and login/logout working


<br>
<br>
<br>
<br>

## 11/21/2022 (Monday)
> Kim and I pair programmed and got the OpenAI API to get the backend to successfully communicate with the Letters Service. It was cool to see our Dashboard send requests to OpenAI and receive a response that had a new letter response based on the query we sent. It really feels like the functionality is coming together and *maybe* that it wouldn't be crazy expensive to operate. This could actually work as a real product which is crazy to me haha.


## 11/22/2022 (Tuesday)
Today was a super prouductive day. Everyone did one endpoint so we got  
> Letter: (get_all), (get_one), (update)  
> Account: (update)

working fully with the back-end and the databases which is awesome! Today Aaryan also got the Signup page fully working between front-end/back-end/AND database which is awesome. He even did hooks and redux in the React. Really cool stuff. I feel like we're working at a really good pace to not only finish early, but potentially with enough time to work on some really cool stretch-goals that we've talked about. 