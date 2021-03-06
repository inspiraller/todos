# How long did you spend on your solution?

1. 30m - create next app - with basic styling to render a list of todos
2. 45mm - put index page into a todos page, create jest setup and create basic render test
3. 30m - Refactor todos page - into separate components ton consume data from a fictitious REST response.
4. 45m - create a mock json response to load into this component, using msw and ensure test still passes

break

5. 1.30m node - create basic node server to provide REST api, and consume into todos page. 
6. 10m - Create Add Todo component 
7. 1h - Configure redux with devtools - to consume the rest api get request - to then populate Todos. Ensure test still works with redux
8. 10m - create action creator to just populate entire pending todos after api post method.
9. 20m tidyup and and ensure tests still work

# release/0.1.2-docker.sql
10. 4 days investigation slonik
- To be able to use .env to supply variable names of postgres user/pass, db, table, 
- Investigate how to create a table in docker using .env, arg, docker-compose build, bash script to iterate over args to find/replace args to supply into file.sql to create table.
- Investigate how to import csv into docker via mounting, fix error pgdata environment variable
- Provide a way for slonik to run sql statements via postgres to reference variable names for tablename using sql identifier
- Debug fullstack chain
11. 1/2 day - Finish nodeserver, and react-app to consume data

postgres,dynamic table names via arg into dockerfile, slonik identifier dynamic name to supply to sql statement, 

# release/0.1.3-docker-mongo
12.
- approx 2 weeks. Investigation into docker. Using bash scripts for wait, setting up mongoose. Refactoring both postgres and mongodb for consistent naming convention logic. Providing copy data of latest.csv in and out from copy-into-data into volume mount. 
-------------------------------------------
# How do you build and run solution as mongo?
## Key: 
- MAINREPO: https://github.com/inspiraller/todos.git

## Pre-requisites 1
- git clone MAINREPO
- cd thisrepo
- npm i

## Pre-requisites 2
- cd react-app
- npm i

## Pre-requisites 3
- cd mongo-node-server
- npm i

## Go back to MAINREPO
- cd MAINREPO
npm run mongo-start-all

# How do you build and run solution as postgres?
## Key: 
- MAINREPO: https://github.com/inspiraller/todos.git

## Pre-requisite - software
- Node
- Docker

## Pre-requisites 1
- git clone MAINREPO
- cd thisrepo
- npm i

## Pre-requisites 2
- cd react-app
- npm i

## Pre-requisites 3
- cd postgres-node-server
- npm i

## Go back to MAINREPO
- cd MAINREPO
npm run postgres-start-all

----------------------------------------------------------------
## Start from MAINREPO
- npm start
- open browser window at localhost:3000

***expected***
- Will create a container for postgres
- Will load node-app, to provide a basic REST api point for mock data of todo items
- Will load react-app, to consume REST api
- Will display a list of todos, supplied by data from rest API and consumed by react app

----------------------------------------------------------------
## End Docker
npm run db-clear

***expected***
- Will export db into postgres-db/export.csv

----------------------------------------------------------------
## Test react app
- cd thisrepo/react-app
- npm run test -- --watch

***expected***
- Will load msw to mock the data that would come from node-app.
- Will run integration tests using react-testing-library to do basic test on rendered page

----------------------------------------------------------------
## Test - Add Todo
- enter a value into the input field
- Press enter

***expected***
- Will populate the add todo

## Reload the page

***expected***
- Will retain the value, until you kill the node server

----------------------------------------------
# What technical and functional assumptons did you make when implementing your solution?
- Render a list of todos in a basic nice layout using react, with some semantic markup
- Consume an api or mock api to dynamically populate that todos list
- Provide a CRUD interface to Add to the todos list
- Create basic tests against rendering
- Mobile responsive layout
- Basic accessibility support
----------------------------------------
# Briefly explan your technical design and why do you think is the best approach to this problem?
- I have used next.js, react, typescript and redux (As desired skill required on job spec)
- have demonstrated experience using various tech stacks - node, react, jest, react testing library, consuming data via api, redux and so on
- I have organised code for maintainability and kept code structure small
- I have separated logic - services, redux, testing, react components, react routes for code structure
- Disclaimer: I don't think this is the best approach, but is a good demonstration of a combination of tech stack.

# If you were unable to complete any user stories, outline why and how would you have liked to implement them.
- I'd tidy up the references to urls for the api Requests to be share in a .env file between the node and react-app
- I would have tidied up the styles (to enjoy the user experience)
- Regarding - marking a pending item complete - I would add another action in node, and in redux
- I would create a production implementation of all the above
- I would check the npm packages for licencing issues
- I would provide theming of styles
- I would allow language support - option to run in different languages
- I would spend more time on node implementation and replace the cache solution with a db
- I would put in e2e tests with cypress, playwright or equivalent
- I would put in sonar for capturing code quality
- I may separate components into a react lazy load
- I may separate components into bit cloud
- I would create nicer error handling
- I would test on a few mobile device sizes
- I'd learn and become more fluent in graphql and replace redux solution and node with graphql and apollo server

...



