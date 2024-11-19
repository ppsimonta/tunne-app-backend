## Tunne-app backend
Node back-end for use with the [Tunne-app frontend](https://github.com/ppsimonta/tunne-app-frontend).

This repository contains the backend services for the **Tunne App**, a platform designed to track and analyze users' emotional well-being. It handles API requests, data management, and user authentication.

## Features

- **Instance Management**: Create, retrieve, edit, and manage instances, which are customizable surveys or assessments.
- **User Profiles**: Users can create profiles, join instances, and track responses.
- **Survey Responses**: Collect and store answers to surveys.
- **Real-Time Data**: Collect and analyze real-time data such as emoji-based feedback and body metrics.
- **CSV Generation**: Generate and download CSV reports based on instance data.
- **OAuth Authentication**: Supports Google OAuth2 for user authentication.

## Backend Overview

### **Controllers**

The backend controllers handle the core logic for various operations, including instance management, survey handling, and user authentication. Below is an overview of the primary controllers.

#### **Instance Management**
- **createInstance**: Creates a new instance of a survey or emotional assessment.
- **getAllInstances**: Retrieves all available instances.
- **getInstanceByRandomId**: Fetches a specific instance by a random identifier.
- **addInstanceToUserProfile**: Adds an instance to a user's profile.
- **getInstancesByProfile**: Retrieves all instances associated with a user's profile.
- **getSingleInstance**: Retrieves detailed information about a specific instance.
- **getParticipantCount**: Returns the number of participants for an instance.
- **generateCSVForInstance**: Generates a CSV report for a specific instance.

#### **Survey Responses**
- **insertResponse**: Inserts a user's response to a specific survey.
- **answerInstance**: Allows a user to submit answers for an instance.
- **getInstanceAnswers**: Fetches all answers submitted by a user for a specific instance.
- **getAllEmojiData**: Retrieves all emoji-based responses for a particular instance.
- **getAllBodyData**: Retrieves all body metric data associated with an instance.

#### **User Authentication**
- **googleAuth**: Initiates Google OAuth2 authentication for logging in.
- **googleAuthCallback**: Handles the OAuth2 callback for successful or failed authentication.
- **successLogin**: Handles a successful login by sending user details.
- **failedLogin**: Handles failed login attempts.
- **logout**: Logs a user out of the application, destroying their session.
- **getLoggedInUser**: Retrieves the currently logged-in user.

#### **User Profile Management**
- **getAllProfiles**: Retrieves all user profiles stored in the system.
- **getRole**: Retrieves the role of the logged-in user (e.g., admin, user).
- **promoteToOwner**: Promotes a user to the owner role for an instance.
- **getInstancesByOwner**: Retrieves instances owned by the logged-in user.

#### **Analytics**
- **getSurvey**: Retrieves the survey associated with a specific instance.
- **getRandomBodyData**: Fetches random body data for an instance.
- **getAverageAge**: Retrieves the average age of participants for a specific instance.
- **getRespondants**: Retrieves the list of respondents for an instance.

### **State Management**

The backend utilizes **Express** for routing and handling HTTP requests. **Passport.js** is used for user authentication with Google OAuth2, and **Sessions** manage user sessions for storing authentication tokens.

## Tech Stack

- **Node.js**: JavaScript runtime for building the backend.
- **Express.js**: Web framework for handling HTTP requests and routing.
- **Passport.js**: Authentication middleware for handling OAuth2 login with Google.
- **Session Management**: Manages user sessions and authentication states.
- **dotenv**: Loads environment variables for configuration.
- **Sequelize**: ORM used for interacting with the database (e.g., user profiles, instances).
- **CSV**: Generates CSV files for download.

## Installation

Prequisities:

* Git
* NodeJS
* PostgreSQL
* Docker (optional)

### Clone the repository:
```
git clone https://github.com/ppsimonta/tunne-app-backend.git

cd tunne-app-backend
```
### Set the front-end URL:
1. If running with NodeJS 

    Remember to rename the ```.env.example``` file to ```.env``` and fill in the values.

2. If using Docker 

    Edit the values in ```docker-compose.yml``` file 

## Running the app
You can either build and serve the static files or use Docker with the provided Dockerfile

1. Build and serve using the NodeJS server

    ```
    npm install 

    npm run dev
    ```
2. Run using docker

    ``docker-compose up --build`` 

    The port can be changed by editing the ```docker-compose.yml``` file where it says ```ports``` and setting the value right of the colon to the desired port number
