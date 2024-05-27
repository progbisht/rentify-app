# Rentify Backend

The backend of the rentify app is built using Node.js, Express.js & MongoDB. The purpose of rentify app is to rent out the properties. A user can be a seller of buyer. A seller is responsible for listing out properties and buyer can show intrest in the property.
The backend of the rentify app is responsible for handling these API endpoints:
- /users
- /places
- /wishlist
These endpoints ensure that they serve the specific purposes like user regestration and authentication, add new place and update and fetch user favourite places.


## Table of Contents

- [Getting Started](#getting-started)
- [Prerequisites](#prerequisites)
- [Installation](#installation)

## Getting Started (Project Setup)
- In order to get started with the application your system require
    - Node.js
    - VSCode or any modern code editor
    - System with min RAM of 4GB

- You can downlod the above from their official websites.

### Prerequisites

- Node.js       (v20.9.0)
- npm           (10.1.0)
- MongoDB       (Atlas or can use compass as well if requirement is to host db locally.)

### Installation

A step-by-step guide on how to get the project running on a local machine.

1. Clone the git repo
2. Open the folder with any modern code editor.
3. Change the directory to backend
   ```
   cd backend
   ```
4. Install the dependencies
    ```
    npm install
    ```
5. Start the backend part of the rentify app
    ```
    npm run dev
    ```

### Usage 

Now you can access the api endponts in order to serve their purpose.

- User specific API endpoints:
    ```
    POST /api/v1/users/register         - to regsiter a user
    POST /api/v1/users/login            - for user login
    POST /api/v1/users/logout           - to logout a user
    POST /api/v1/users/refresh-token    - to issue a new acces token
    GET /api/v1/users/profile           - to fetch user profile
    ```

- Place specific API endpoints:
    ```
    POST /api/v1/places/upload                  - to upload images of a place
    POST /api/v1/places/add-place               - to add a new place
    PATCH /api/v1/places/update-place           - to update place
    DELETE /api/v1/places/delete-place          - to delete a place
    GET /api/v1/places/user-places              - to get all user places (added by user)
    GET /api/v1/places/user-single-place/:id    - to get detailed user place
    GET /api/v1/places/all                      - to get all places
    GET /api/v1/places/single-place/:id         - to get detailed place
    GET /api/v1/places/interested/:id           - to fetch intrested user profiles
    ```

- Intrested Users Profile specific API endpoints:
    ```
    POST /api/v1/wishlist/add           - to regsiter a user
    GET /api/v1/wishlist/:id            - for user login
    
    ```