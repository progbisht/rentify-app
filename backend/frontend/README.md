# Rentify Frontend

This is a rentify app client-interfae developed using HTML, Tailwind CSS, Node.js and React.js. The frontend is designed with the simplistic design keeping in mind to give a decent user interface. 


## Description
This application can perform the following tasks
- Add a task to their to-do list
- Mark a task as done using a checkbox
- Delete a task, whether it’s done or not, using a ‘delete’ icon on the right side of the task.
- See a count of undone tasks.
- Delete all ‘done’ tasks.

This app support adding, updating and deleting the same list from multiple tabs or windows.


## Requirements 
- React.js: Frontend library for building user interfaces.
- Node.js: JavaScript runtime environment for server-side code.
- Tailwind CSS: CSS Framework for decent UI.

Note: Configure the tailwind css as per the guidelines mentioned on the offical website.


## Versions
- Node.js       (v20.9.0)
- npm           (10.1.0)


## Installation

1. Clone the git repo:

2. Change into the backend directory (to install the dependencies):
   ```
   cd backend


3. Install backend dependencies:
   ```
   npm install

4. Change into the frontend directory:
   ```
   cd frontend

5. Install frontend dependencies:
   ```
   npm install



## Usage
1. Open the frontend directory and start the development server:
    ```
    npm start
    ```
    This will start the frontend server (React.js).
    Access the application in a web browser: http://localhost:3000/


2. Change into the backend directory and run the server:
    ```
    cd ..
    cd backend
    npm run dev
    ```
    This will start the backend server (Node.js/Express.js) at http://localhost:4000/


3. Test out the functionality of the application such as 
- register and login a user, 
- add update or delete a new place, 
- mark a place interested
etc.