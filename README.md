# Pre-requisites 1
- clone repo and install dependencies
- git clone thisreop
- cd thisrepo
- npm i

# Pre-requisites 2
- cd react-app
- npm i

# Pre-requisites 3
- cd node-app
- npm i

- cd back to the thisrepo

----------------------------------------------------------------
# Start from thisrepo
- npm start
- open browser window at localhost:3000

***expected**
- Will load node-app, to provide a basic REST api point for mock data of todo items
- Will load react-app, to consume REST api
- Will display a list of todos, supplied by data from rest API and consumed by react app

----------------------------------------------------------------
# End 
- CTRL C C

----------------------------------------------------------------
# Test react app
- cd thisrepo/react-app
- npm run test -- --watch

***expected**
- Will load msw to mock the data that would come from node-app.
- Will run integration tests using react-testing-library to do basic test on rendered page


