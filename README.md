## Session Authentication Sample Project

Most of the code from this project was adapted from the following source:
https://github.com/linkedweb/auth_system

## Installing Dependencies
- First, create a Python virtual environment by running `python -m venv .venv` from root
project directory. This ensures python dependencies are installed locally.
- From the root directory run `pip install -r requirements.txt` to install Django 
dependencies
- cd into the frontend directory and run `npm install` to install node modules

## Running this Program
- Create a .env file in the backend/ directory and paste the following: EMAIL_APP_PASSWORD="passwordGoesHere"
- Replace passwordGoesHere with the correct password
- Open a terminal then run `python manage.py migrate` from the backend/ directory 
to create the sqlite database tables
- In the same terminal run `python manage.py runserver` to run the Django server
- Open another terminal then run `npm start` from the frontend/ directory

## Important Info
- This app uses JWT tokens for authorization
- Once the user signs up, they must go to their email to verify their account creation. Once complete, they can then log in.
- Once logged in, the Authorization header must be included in each request to access protected resources. See Profile.js for an example of how to make an Authenticated request.
- Tokens are stored in local storage by the browser
- 'access' token expires after 60 minutes
- 'refresh' token expires after 1 day
- I didn't implement the logic to get a new access token if refresh token hasn't expired
- I also didn't implement ResetPassword or ResetPasswordConfirmation JS files, but their enpoints are listed in the Routes

## Useful Django Commands
- Create superuser to access the admin site. Admin site can be accessed at localhost:8000/admin  
`python manage.py createsuperuser`
- Build the database used by the app:  
`python manage.py migrate`
- Run the Django server  
`python manage.py runserver`
- Make the SQL migration files, which is required any time a model is added or modified, and upon creating a brand new app. Shouldn't be needed for this repo.   
`python manage.py makemigrations polls`
- Create a brand new django project:  
`django-admin startproject projectnamehere`