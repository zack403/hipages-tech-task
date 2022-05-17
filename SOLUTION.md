Solution Documentation
===========================

Typescript was used both on the backend and frontend which was a great improvement for this application by enforcing types accross the application which reduced errors by ensuring predictability across our variables and function parameters. It also helps speed up development as having types provides type-hinting reducing the need to look up what variable values and function
calls might be and in general improves developer experience.
Dockerfile has been added to both the frontend and backend and a docker-compose file at the root of the project which runs the application on a docker container

# Running the application
- have docker installed
- set buildkit to false on docker desktop
- From the root of the project, run `docker-compose up -d`
- wait for some minutes
* You should now have the UI running at http://localhost:3000 and the server running at http://localhost:8080

# Backend

The backend was written in NestJS Typescript and TypeORM for database related operations, NestJS uses express under the hood. I went for NestJS because it provides a lot of abstraction enabling cleaner, modular and testable code which will be useful if this application grew larger and become more complex.

I have also use the controller-service-repository pattern which makes us to have seperation of concerns

The folder structure resides on the src folder -
- core(controllers, entities, dto's and services) - consist of the application main modules 
- database - where connection to the database is made
- types - contains the return type of api calls
- utils - re useable functions across the application

 . How the pieces all works together
When the application starts, typeorm uses the file in the database folder to connect to the database
ceates the entities, add relationship between the entities and starts listening for incoming request
- request come through the controller folder (job.controller), the controller uses dependency injection by injecting the jobService in its constructor and pass request to the service via its method in the class
- i have made the getAll jobs endpoint to accept a filter param (status, search, page, limit) this is useful for perfomance purpose and not put heavy load on the server to load all records
- the update job status endpoint accept the status to update to param and does the update.
- Class validator has been used for necessary validations
- the service then picks this request and pass it to the repository to talk to the database whether to retrieve or insert records, so i made sure its only the repository that knows how to talk to the database
- the service is responsible for getting the data from the repository and sending it back to the controller which in turns sends it to the request initiator.
 - i have also use enum (JobStatus) across the application for necessary validations and apply them where necessary, some of the benefit of using eneum are single source of truth, consistency, error highlighting
 - pagination, searching, sorting and filtering has been put in the getAll request to ensure we dont put too much load on the server in case this application grew larger abd become complex.
 - I have also enabled Swagger documentation (* at http://localhost:8080/api/v1/docs) for the api's via NestJS main module, this will be helpful in case the application grew large and become complex
 - uniform response message has been put in place to ensure smooth experience on the frontend
 - A docker file has been included with instructions on how to build the app for the docker compose to take over

## Frontend
The frontend was written in React with react-bootstrap for the styling and axios for making api calls
The design follows the seperation of concerns pattern
The folder structure resides on the src folder
- components (card, tab , job) - this is where we have the each piece of the ui with there relevant css
- services - this is where every module that needs to make api calls reside e.g jobService for getting job data
- types comprises of different interfaces used across the application
- utils reuseable functions across the applications, the enum file and agent file also resides here

How the pieces works together
- The two tabs reside in the tab.tsx file and its responsible for switching between the invited and accepted tabs and rendering the respective component based on selected tab
- the invited and accepted component calls the same endpoint but passing different JobStatus enums
- the accept and decline button calls the same endpoint but also passes different JobStatus enum
- the content area resides in the content.tsx file which hold the job data info
- the invited and accepted component is responsible for making api calls and returns the content component and pass it the data it needs to display on the ui respectively
- i have also used enum on the frontend to represent tabState and JobStatus to have consistency
- have used different utility functions to format date, name and price
- i have used modules in css for the syling too
- dockerfile added on instructions on how to run the app

# Improvements If given more time

## Migrations 

In order to keep this application simple I used the sync method from typeorm to ensure the database had the correct
schema. Before this application went to production this would need to be swapped out to use migrations so that the
database schema could be updated and maintained without causing data loss.

## caching
Caching would be a great improvement to this application if given more time, it will greatly improve the performance of the application and increase the response time.

## testing
No testing currently on this application, if given more time and logic became more complicated it
would be beneficial to add unit tests to the individual functions at the service or database layer.

Would also be good to add more edge-case tests to cover the various validation errors to ensure that changes to our 
swagger specification don't introduce bugs further down the road.

## Redux

As this is just a simple application i have used react hooks useState for managing the state, if this application grew larger and become complex, it will certainly be sure to use redux for global state management for effective communication between components

## Pagination + Filtering - Frontend
If given more time, pagination and filtering would have been implemented on the frontend too