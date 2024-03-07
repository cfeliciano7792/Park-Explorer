## Getting Started with Random Code Developer

This program exists to support a user who is looking to retrieve a particular park code from a list of parks.

## Why this Project Matters 

Thhis project enables a separate web application to do the work it needs to do by providing both an on screen button page, but also returning a value for the other application to use. The on screen button page validates the value which is otherwise hidden.

## Important Information

The following endpoint should be used for the fetch request and running the micrservice locally: http://localhost:3000/ 

The park codes can be found at this location: http://localhost:4000

The user should first run the microservice file and then run the react application. I advise changing app.JS into a separate page within your application to maintain button functionality. This is not mandatory though :)

## Which file is the microservice?

idCodesMicroservice.js

you should make a point to download the entire repo, but this is the most important file as the rest of the application acts to present the button functionality as app.JS. Beyond this it's important to make sure that you have node and all other necessary dependencies installed. The application is designed as minimally as possible to reduce dependencies.


## Clear instructions for how to programmatically REQUEST data from the microservice you implemented. Include an example call.

<img width="888" alt="image" src="https://github.com/BigDataBaba/cs361-repo/assets/40153506/198d98af-07d8-41a2-8146-0d2a816b6473">

Above we see an example request from my the microservice. I made a point to throw in an error as the entire microservice will fall apart if the ID codes are not fetched. It would also be very difficult to know whether or not those ID codes were fetched. We use generic JavaScript try syntax here.

The portion below, which is the getRandomID, and does the heavy lifting with the return from the microservice.

## Clear instructions for how to programmatically RECEIVE data from the microservice you implemented.

<img width="1093" alt="image" src="https://github.com/BigDataBaba/cs361-repo/assets/40153506/ed32fe42-fc75-4932-b91a-2e59ceab0ff6">

Above shows the code which will handle the JSON. The code listed above this image, and the previous response provides an approach for handling the JSON on the front end, and then quickly integrating it within the application into a button page.


## UML sequence diagram showing how requesting and receiving data works. Make it detailed enough that your partner (and your grader) will understand

<img width="763" alt="image" src="https://github.com/BigDataBaba/cs361-repo/assets/40153506/da515071-2b42-45c5-957f-21bdc48afff4">
