## Tunne-app backend
Node back-end for use with the Tunne-app frontend

## Installation

Prequisities:

* Git
* NodeJS
* PostgreSQL
* Docker (optional)

### Clone the repository:
```
git clone https://peke.plab.fi/frostbit-web/tunne-app-backend.git

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