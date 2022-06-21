# ref - puid?:
- https://www.bmc.com/blogs/mongodb-docker-container/#:~:text=Go%20to%20the%20%E2%80%9Cmongodb%E2%80%9D%20folder,container%20as%20a%20background%20process.&text=The%20up%20command%20will%20pull,yml%20file.

- https://docs.linuxserver.io/general/understanding-puid-and-pgid

Using the PUID and PGID allows our containers to map the container's internal user to a user on the host machine. All of our containers use this method of user mapping and should be applied accordingly.

- https://marioyepes.com/mongodb-express-using-docker/

# login interactively
docker exec -it mongo1 bash

# to log into mongo - use the environment variables for user, pass etc...
mongo admin -u ad -p pas

# Data types
https://data-flair.training/blogs/mongodb-data-types/

- seeding db - ref
https://valenciandigital.com/insights/seeding-data-into-mongodb-using-docker