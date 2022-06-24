# Login interactively
docker exec -it mongo1 bash

# Login to admin with user/pass
# User must log into admin database, in order to then switch to database - because we set - "userAdminAnyDatabase" which only applies to admin
- mongo -u boot -p secret admin
- use mongo_todos_db

# view imported todos
db.todos.find().toArray()

# remove 
db.todos.remove({})