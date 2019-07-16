# FinalProject
Fitness Tracker

Home Page:
 A simple webpage describes what is the Fitness Application.

Login Page:
A page with username and password fields.

Signup page:
It contains user details.
 
User's profile page:
Having user's personal data.

Captures the age & height as a attribute as a primary data. Based on that it redirects to particular diet chart and workouts page.

Diet Page:
Food to be intake based on underweight,overweight and obesity.

Exercise Page:
According to the diet, exercises are defined.

Activity Log:
The history of diet and exercises of an person.

My friends:
User can share their activites with their friends.

About:
About the fitness app.


## ProjectSetUp

This Fitness App uses Nodejs, Express.js, Passport jwt, vuejs[client]for authentication and MongoDb as database.

To start the MongoDb

./mongo

Start the server

npm run start

Runs on port 8082

Start the client

npm start or npm run dev

## RestAPI

User Schema

http://localhost:8082/fitnessapp/users/register [POST]

http://localhost:8082/fitnessapp/users/authenticate[POST]
http://localhost:8082/fitnessapp/users/checkUserExistsAlready [GET]
http://localhost:8082/fitnessapp/users/displayAllUsers  [GET]

http://localhost:8082/fitnessapp/users/deleteUsers [DELETE]

Workout Schema

http://localhost:8082/fitnessapp/workout/addNewWorkout [POST]
http://localhost:8082/fitnessapp/workout/getWorkoutCategory [GET]


Diet Schema

http://localhost:8082/fitnessapp/dietSheet/addNewDiet  [POST]
http://localhost:8082/fitnessapp/dietSheet/getDietByCategory  [GET]

Trainer Schema

http://localhost:8082/fitnessapp/trainer/addNewTrainer [POST]
http://localhost:8082/fitnessapp/trainer/checkTrainerNameExistsAlready [GET]
http://localhost:8082/fitnessapp/trainer/removeTrainerByName [DELETE]
http://localhost:8082/fitnessapp/trainer/listAllTrainers[GET]

http://localhost:8082/fitnessapp/trainer/updateTrainerDetails [PUT]


UserAndTrainer Schema

http://localhost:8082/fitnessapp/trainer/assignTrainerToUser [POST]
http://localhost:8082/fitnessapp/trainer/updateTrainerOfUser [PUT]
http://localhost:8082/fitnessapp/trainer/removeUserForTrainer [DELETE]
http://localhost:8082/fitnessapp/trainer/displayAllTheTrainerAndUsers [GET]

workoutAndUser

http://localhost:8082/fitnessapp/workout/addWorkoutCategoryToUser  [POST]
http://localhost:8082/fitnessapp/workout/getWorkoutCategoryOfUser [GET]
http://localhost:8082/fitnessapp/workout/addNewWorkout [POST]




