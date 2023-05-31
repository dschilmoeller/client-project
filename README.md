# ThermaSolutions Product Inquiry App

## Contributors

1. Lily Lacosse
1. David Schilmoeller
1. Thomas Vargas
1. Lee Xiong
1. Ryan Weispfenning

## Table of Contents

- [Description](#description)
- [Built With](#built-with)
- [Prerequisites](#prerequisite)
- [Installation](#installation)
- [Usage](#usage)
    
## Description

ThermaSolutions Product Inquiry App is a standalone application designed to simplify the submission and handling of a complex internal document. It has a user submission section which handles initial form submission as well as a simpler general feedback area, as well as an administration section which is password protected and allows for managing inquiries and feedback, as well ouputting a pre-filled docx file.

It was created for ThermaSolutions, a medical device manufacturer in Minnesota. 

## Walkthrough Video
<a href="https://vimeo.com/831963264" target="_blank"><img src=./documentation/images/Screenshot3.png /></a>

## Before you get started

Make sure you have the following software installed on your computer:

- [Node.js](https://nodejs.org/en/)
- [PostrgeSQL](https://www.postgresql.org/)
- [Nodemon](https://nodemon.io/)
- AWS S3 Account - You'll need to skip or remove the image upload section if this is not included.

## Screenshots
<img height="400px" src=./documentation/images/Screenshot1.png />
<img height="600px" src=./documentation/images/Screenshot2.png />

## Built With

<a href="https://www.w3schools.com/w3css/defaulT.asp"><img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/css3/css3-original.svg" height="40px" width="40px" /></a>
<a href="https://www.w3schools.com/html/"><img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/html5/html5-original.svg" height="40px" width="40px" /></a>
<a href="https://www.w3schools.com/js/default.asp"><img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/javascript/javascript-original.svg" height="40px" width="40px" /></a>
<a href="https://www.postgresql.org/"><img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/postgresql/postgresql-original.svg" height="40px" width="40px" /></a>
<a href="https://reactjs.org/"><img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original-wordmark.svg" height="40px" width="40px" /></a>
<a href="https://redux.js.org/"><img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/redux/redux-original.svg" height="40px" width="40px" /></a>
<a href="https://www.figma.com/?fuid="><img src="https://github.com/devicons/devicon/blob/master/icons/figma/figma-original.svg" height="40px" width="40px" /></a>
<a href="https://material-ui.com/"><img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/materialui/materialui-original.svg" height="40px" width="40px" /></a>
<a href="https://nodejs.org/en/"><img src="https://github.com/devicons/devicon/blob/master/icons/nodejs/nodejs-plain.svg" height="40px" width="40px" /></a>
## Getting Started

This project should be able to run in your favorite IDE. We used VS code while building it. 

<a href="https://code.visualstudio.com/"><img src="https://github.com/devicons/devicon/blob/master/icons/vscode/vscode-original-wordmark.svg" height="40px" width="40px" /></a>

### Prerequisites
Before you get started, make sure you have the following software installed on your computer:

- [Node.js](https://nodejs.org/en/)

### Installation

1. Fork the repository
2. Copy the SSH key in your new repository
3. In your terminal type...  `git clone {paste SSH link}`
4. Navigate into the repository's folder in your terminal
5. Open VS Code (or editor of your choice) and open the folder
6. In the terminal of VS Code run `npm install` to install all dependencies
7.  Create a `.env` file at the root of the project and paste this line into the file: 
```
SERVER_SESSION_SECRET=superDuperSecret
ACCESS_KEY = [YOUR AWS ACCESS KEY]
SECRET_ACCESS_KEY = [YOUR AWS SECRET ACCESS KEY]
AWS_BUCKET_URL = https://[your aws bucket name].s3.amazonaws.com
```
8. Create a database named `thermasolutions` in PostgresSQL
If you would like to name your database something else, you will need to change `thermasolutions` to the name of your new database name in `server/modules/pool.js`
9. The queries in the database.sql file are set up to create all the necessary tables that you need, as well as a dummy data table to test the app. Copy and paste those queries in the SQL query of the database. If this is going to production, leave out the dummy data.
10. See the note on line 65 of database.sql - the mockData.csv will need to be located in a folder on the local machine and the route will need to be updated to reflect its location on your machine.
10. Run `npm run server` in your VS Code terminal
11. Open a second terminal and run `npm run client`


### If you'd like to create an initial or new users for the admin portal you must:
1. open Postman or a similar application
1. send an object such as the following to http://localhost:3000/api/user/register
```
{
    "username":"(DESIRED USERNAME)",
    "password":"(DESIRED PASSWORD)",
    "access_level": "1"
}
```

## Usage

Once everything is installed and running it should open in your default browser - if not, navigate to http://localhost:3000/#/home/0 to access the user page; http://localhost:3000/#/admin will take you to the admin login.

## Special Thanks
- Prime Digital Academy Instructors and Staff
- ThermaSolutions Team for guidance and support
- Aquamarine Cohort