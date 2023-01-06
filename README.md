
# **DirectRep**


⚡️ Powered by: [Google Civics API](https://developers.google.com/civic-information) and [OpenAI GPT3](https://beta.openai.com/docs/models/gpt-3) ⚡️

DirectRep is an app that allows US Citizens to write letters to their elected representatives using Artifical Intelligence to generate the body text given a specific "issue" and "stance" on that issue. The user's representatives are gathered using [Google Civic Information API](https://developers.google.com/civic-information) and are determined by the Zip Code the user provides on Sign-Up.

This service lowers the barrier-to-entry for citizens to have their voices heard by their elected representatives. Regardless of your literacy, your English proficiency, your ability to articulate your thoughts and opinions, having your voice heard is now easier for ***everyone*** to access. 

<br><br>
**\*\*Disclaimers\*\***  
There may be data missing from Google Civics API which may lead to certain representatives not being shown in the results. Always double check and verify your representatives' data.


<br>


## 👾**Developers**👾
### **[Kim Geraghty](https://gitlab.com/kim.geraghty.kg)** -- FullStack Developer  
### **[Aaryan Mittal](https://gitlab.com/aaryanmittal154)** -- FullStack Developer  
### **[Vincent Phung](https://gitlab.com/vincent.h.phung)** -- FullStack Developer  
### **[John Gardner](https://gitlab.com/John.Gardner)** -- FullStack Developer  


<br><br>


## 🗺️**Diagrams of Architecture**🗺️

---
### **DirectRep Wireframe Overview**
![DirectRep wireframe overview](https://i.imgur.com/soj2m9q.png)
### **Users-Service Microservice**
![users-service microservice architecture diagram](https://i.imgur.com/2rLvTBS.png)
### **Users-Service Endpoints**
![users-service microservice endpoints diagram](https://i.imgur.com/kRd2CNz.png)
### **Letters-Service Microservice**
![letters-service microservice architecture diagram](https://i.imgur.com/hP3HoZe.jpg)
### **Letters-Service Endpoints**
![letters-service microservice endpoints diagram](https://i.imgur.com/0JKQQVk.png)
<br><br><br>

## 👥**Users-Service Microservice**👥 -- `:8080`

<br><br>

### **Endpoints**


|      **Page**       | **Request Type** |             **Path**              | **Request Shape JSON**                                                                                          | **Response Shape (JSON)                                                                                                                                                                |
| :-----------------: | :--------------: | :-------------------------------: | --------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
|     Signup Page     |      `POST`      |    localhost:8080/api/accounts    | {<br>;"full_name": `"string"`,<br>"email": `"string"`,<br>"zipcode": `"string"`,<br>"password": `"string"`<br>} | {<br>"access_token": `"string"`,<br>"token_type": `"Bearer"`,<br>"account": <br>{<br>"id": `0`,<br>"full_name": `"string"`,<br>"email": `"string"`,<br>"zipcode": `"string"`<br>}<br>} |
|     Login Page      |      `POST`      |       localhost:8080/token        | {<br>"username": `"string"`,<br>"password": `"string"`<br>}                                                     | {<br>"access_token": `"string"`,<br>"token_type": `"Bearer"`<br>}                                                                                                                      |
|      Get Token      |      `GET`       |       localhost:8080/token        | N/A                                                                                                             | {<br>"access_token": `"string"`,<br>"token_type": `"Bearer"`,<br>"account": <br>{<br>"id": `0`,<br>"full_name": `"string"`,<br>"email": `"string"`,<br>"zipcode": `"string"`<br>}<br>} |
| Update Profile Page |      `PUT`       | localhost:8080/api/accounts/`$id` | {<br>"full_name": `"string"`,<br>"email": `"string"`,<br>"zipcode": `"string"`,<br>"password": `"string"`<br>}  | {<br>"access_token": `"string"`,<br>"token_type": `"Bearer"`,<br>"account": <br>{<br>"id": `0`,<br>"full_name": `"string"`,<br>"email": `"string"`,<br>"zipcode": `"string"`<br>}<br>} |
|     Logout Page     |     `DELETE`     |       localhost:8080/token        | N/A                                                                                                             | {<br>`true`<br>}                                                                                                                                                                       |

<br>

### **Database Models**  
*(values in parenthesis are max values. e.g. VARCHAR(255) is a variable character with a max_length of 255 characters)*
<br><br><br>
#### **'user' database table**
|    **Field**    |    **FieldType**     | **\*\*options** |
| :-------------: | :------------------: | :-------------: |
|       id        | `SERIAL PRIMARY KEY` |   `NOT NULL`    |
|    full_name    |    `VARCHAR(255)`    |   `NOT NULL`    |
|      email      |    `VARCHAR(255)`    |   `NOT NULL`    |
|     zipcode     |     `VARCHAR(5)`     |   `NOT NULL`    |
| hashed_password |    `VARCHAR(255)`    |   `NOT NULL`    |


<br><br><br>

## 📨**Letters Microservice**📨 -- `:8090`

### **Endpoints**

<br><br>
**Letters-Service Endpoints**
|         **Page**         | **Request Type** |               **Path**                | **Request Shape (JSON)**                                | **Response Shape (JSON)**                                                                                                                                 |
| :----------------------: | :--------------: | :-----------------------------------: | :------------------------------------------------------ | :-------------------------------------------------------------------------------------------------------------------------------------------------------- |
|      Create Letter       |       POST       |      localhost:8090/api/letters       | {<br>"topic": `"string"`,<br>"stance": `"boolean"`<br>} | {<br>"id": `0`,<br>"topic": `"string"`<br>"stance": `true`,<br>"content": `"string"`,<br>"user_id": `0`<br>}                                              |
| Get ALL Letters for User |       GET        |      localhost:8090/api/letters       | N/A                                                     | {<br>"id": `0`,<br>"created": `"2022-12-12T04:00:12.644Z"`,<br>"topic": `"string"`,<br>"stance": `true`,<br>"content": `"string"`,<br>"user_id": `0`<br>} |
|    Get Single Letter     |       GET        | localhost:8090/letters/`${letter_id}` | N/A                                                     | {<br>"id": `0`,<br>"created": `"2022-12-12T04:00:12.644Z"`,<br>"topic": `"string"`,<br>"stance": `true`,<br>"content": `"string"`,<br>"user_id": `0`<br>} |
|     Edit Letter Body     |       PUT        | localhost:8090/letters/`${letter_id}` | {<br>"letter_id": `0`,<br>"content": `"string"`<br>}    | {<br>"content": `"string"`<br>}                                                                                                                           |
|      Delete Letter       |      DELETE      | localhost:8090/letters/`${letter_id}` | N/A                                                     | {<br>`true`<br>}                                                                                                                                          |


<br><br>
**Issues Endpoints**

|    **Page**    | **Request Type** |         **Path**          | **Request Shape (JSON)** | **Response Shape (JSON)** |
| :------------: | :--------------: | :-----------------------: | :----------------------: | :------------------------ |
| Get ALL issues |       GET        | localhost:8090/api/issues |           N/A            | {<br>`"string"`<br>}      |

<br><br>
**Reps Endpoints**

|                     **Page**                     | **Request Type** |                **Path**                 | **Request Shape (JSON)**                                                                                                                                                    | **Response Shape (JSON)**                                                                                                                                                                                         |
| :----------------------------------------------: | :--------------: | :-------------------------------------: | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
|                Get Reps from API                 |       GET        |          localhost:8090/civics          | N/A                                                                                                                                                                         | {<br>"office": `"string"`,<br>"level": `"string"`,<br>"name": `"string"`,<br>"party": `"string"`,<br>"address": `"string"`<br>"address": `{}`,<br>"email": `"string"`<br>}                                        |
|                   Get All Reps                   |       GET        |         localhost:8090/api/reps         | N/A                                                                                                                                                                         | [<br>{<br>"office": `"string"`,<br>"level": `"string"`,<br>"name": `"string"`,<br>"party": `"string"`,<br>"address": `"string"`,<br>"address": `{}`,<br>"email": `"string"`<br>}<br>]                             |
|                    Select Rep                    |       POST       |         localhost:8090/api/reps         | {<br>"office": `"string"`,<br>"level": `"string"`,<br>"name": `"string"`,<br>"party": `"string"`,<br>"address": `"string"`,<br>"address": `{}`,<br>"email": `"string"`<br>} | {<br>"rep_id" `0`,<br>"office": `"string"`,<br>"level": `"string"`,<br>"name": `"string"`,<br>"party": `"string"`,<br>"address": `"string"`,<br>"address": `{}`,<br>"email": `"string"`,<br>"letter_id": `0`<br>} |
|             Get SINGLE Rep Selection             |       GET        |      localhost:8090/reps/${rep_id}      | N/A                                                                                                                                                                         | {<br>"office": `"string"`,<br>"level": `"string"`,<br>"name": `"string"`,<br>"party": `"string"`,<br>"address": `"string"`,<br>"address": `{}`,<br>"email": `"string"`<br>}                                       |
|    Get ALL Rep Selections for SPECIFIC letter    |       GET        | localhost:8090/reps/letter/${letter_id} | N/A                                                                                                                                                                         | [<br>{<br>"office": `"string"`,<br>"level": `"string"`,<br>"name": `"string"`,<br>"party": `"string"`,<br>"address": `"string"`,<br>"address": `{}`,<br>"email": `"string"`<br>}<br>]                             |
| Delete SINGLE Rep Selection from SPECIFIC letter |      DELETE      | localhost:8090/reps/letter/${letter_id} | N/A                                                                                                                                                                         | {<br>`true`<br>}                                                                                                                                                                                                  |



<br><br><br>


### **Database Models**  
*(values in parenthesis are max values. e.g. VARCHAR(255) is a variable character with a max_length of 255 characters)*

<br><br><br>
#### **'letter' database table**
| **Field** |    **FieldType**     |      **\*\*options**       |
| :-------: | :------------------: | :------------------------: |
|    id     | `SERIAL PRIMARY KEY` |         `NOT NULL`         |
|  created  |     `TIMESTAMP`      | `DEFAULT CURRENT_TIMESTAMP |
|   topic   |   `VARCHAR(1000)`    |         `NOT NULL`         |
|  stance   |      `BOOLEAN`       |         `NOT NULL`         |
|  user_id  |      `INTEGER`       |         `NOT NULL`         |


<br><br><br>

#### **'issue' database table**
|  **Field**   |    **FieldType**     | **\*\*options** |
| :----------: | :------------------: | :-------------: |
|      id      | `SERIAL PRIMARY KEY` |   `NOT NULL`    |
|  user_issue  |   `VARCHAR(1000)`    |   `NOT NULL`    |
| openai_issue |   `VARCHAR(1000)`    |   `NOT NULL`    |


<br><br><br>

#### **'rep' database table**
|  **Field  |    **FieldType**     |                               **\*\*options**                                |
| :-------: | :------------------: | :--------------------------------------------------------------------------: |
|  rep_id   | `SERIAL PRIMARY KEY` |                                  `NOT NULL`                                  |
|  office   |    `VARCHAR(255)`    |                                  `NOT NULL`                                  |
|   level   |    `VARCHAR(255)`    |                                  `NOT NULL`                                  |
|   name    |    `VARCHAR(255)`    |                                  `NOT NULL`                                  |
|  address  |   `VARCHAR(1000)`    |                                  `NOT NULL`                                  |
|   email   |    `VARCHAR(255)`    |                                  `NOT NULL`                                  |
| letter_id |        `INT`         | `FOREIGN KEY (letter_id)`<br>`REFERENCES (letter_id)`<br>`ON DELETE CASCADE` |


<br><br><br>




**Key Features**
---

### **Location Dependent Representative Results**

> Your list of available representatives is pulled from Google Civics API using the Zip Code provided on Sign-Up

### **AI Generated Text Response**

> When creating a letter, your "issue" and "stance" are sent to a 3rd party API that then uses a large-language model to generate the letter body the users desires.

### **User Customization**

> When the AI returns your letter body, the user can change, add, or remove any part of the letter, making it fully customizable and ensuring the voice accurately represents the user.

### **Account Dependent Information**

> After creating an account and creating letters, the letters you see in your Dashboard are only the letters you created

### **Account Dependent Information**

> After creating an account and creating letters, the letters you see in your Dashboard are only the letters you created

<br>

## **Getting the App Started**
---

1. Git clone into your local repository
	`git clone «repo»`
2. cd into it
   `cd direct-rep`
3. Create a new file in the root directory called `.env` (This is where you'll store your Google Civics API Key and you OpenAI API Key)
4. Create a volume and name it beta-data
	`docker volume create postgres-data`
5. Build the image and run the container
	`docker compose up --build`
6.  Open browser to http://localhost:3000 to make sure it’s running
7.  Once it’s up and running, you can begin with creating an account and confirming that account. Once you confirm the account, you can create a new letter.


<br><br><br>
## **FAQ**
### **Who are your customers?**  
> People residing in the United States of America.
### **What needs/desires does your application satisfy for your customers?**  
> Making contacting your elected officials more accessible
### What features/functionality do you plan to have in the application that helps your customers?
> - List of representatives with their details.
> - List of issues.
> - Open AI to draft an automated AI generated letter.
> - Login / logout feature.
> - Email template sent to user’s email with letter draft and rep’s emails list.
> - Keep track of past letter templates / requests