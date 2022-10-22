# Bug Tracking System Server

## Introduction

This application is an express server that serves as the backend for the bug tracking system [here](https://github.com/sigltech/developerBugTracker_client). The server uses JWT for authentication and authorization. The server is built using Node.js and Express.js and uses MongoDB for data storage. You may use your own MongoDB Atlas cluster

## Installation(local)

1. Clone the repository
2. Run `npm install` in the root directory
3. run `npm start` in the root directory to start the server on port 5050
4. In order to use the application, users must first clone the client repository and follow the instructions in the README.md file to start the client. Alternatively, the application can be used with the deployed server and client. **This has yet to be implemented but will be done soon once the MVP is completed**.
5. Make sure to create a .env file in the root directory of the server and add the following variables:
   1. `MONGO_URI` - The URI for your MongoDB Atlas cluster
   2. `SUPER_SECRET_KEY` - The secret for your JWT tokens

## Usage

### Routes

#### Users

**PLEASE NOTE: All routes that post to the server require a JSON object in the body of the request that is x-www-form-urlencoded. This can be specified in the request header**

`Content-Type: application/x-www-form-urlencoded`



1. `POST /api/auth/users/register` - Registers a new user. The request body must contain the following:
   1. `name` - The name of the user
   2. `password` - The password of the user
   3. `role` - The role of the user. Must be either `admin` or `developer`
2. `POST /api/auth/users/login` - Logs in a user. Check routes for body requirements

