# setup
**using node to connect to postgres**
- https://www.thisdot.co/blog/connecting-to-postgresql-with-node-js
**steps to connect to docker container**
- https://stackoverflow.com/questions/37694987/connecting-to-postgresql-in-a-docker-container-from-outside

1. Start powershell in non-admin mode
2. Download postgres docker image:
docker pull postgres:latest

3. Start docker container in detached mode and persist data on postgres image by creating a volume and binding it to a destination
(Note: by default 5432 is the default port that is used; but state it explicitly to prevent connection errors from clients like pgadmin, dbeaver, etc.)

docker run --name postgres-test -e POSTGRES_PASSWORD=password -p 5432:5432 -v postgres-data:/var/lib/postgresql/data -d postgres:latest

4. Check status of running containers
docker ps -a

5. Go inside container_name in interactive mode
(Note: commands like ls, pwd, etc. can be executed here if you've checked linux containers during installation)

docker exec -it postgres-test psql -U postgres

6. Create sample data. At this point, you can play with psql commands in the following manner:

# CREATE DATABASE test;
# \c test
# CREATE TABLE test_table(something int);
# INSERT INTO test_table VALUES (123);
# SELECT * FROM test_table;
# \q
7. Open a database client application like pgadmin or dbeaver and enter the below in the connection fields:

Host: localhost
Database: test
User: [my username here...]
Password:  [my password here...]
8. Enter the query select * from test_table in the query editor and you should be able to see the output 123

**CRUD node, express, sequelis, postgres**
- https://blog.logrocket.com/crud-rest-api-node-js-express-postgresql/
psql
- -h=hostname
- -p=port
- -U=username
- -w-no password
- -W=force password

**connect via node**
- https://www.digitalocean.com/community/tutorials/how-to-use-postgresql-with-node-js-on-ubuntu-20-04

--------------------------------------------------------------------------------------------------------------

# run docker
docker-compose up 

# connect
// connect      containername  language username                database
docker exec -it postgres_todos psql     -U postgres_todos_user -d postgres_todos_db 


# Create new user and new db with owner
CREATE USER todos_user WITH PASSWORD 'todos_password';
CREATE DATABASE todos OWNER todos_user;
CREATE TABLE todos(
id SERIAL PRIMARY KEY,
name VARCHAR(500) NOT NULL,
completed BOOLEAN NOT NULL);


# Advance solution - create a timestamp (nice to have. Do later)
- https://x-team.com/blog/automatic-timestamps-with-postgresql/

# view db
\dt

```
List of relations
 Schema | Name  | Type  |        Owner
--------+-------+-------+---------------------
 public | todos | table | postgres_todos_user
(1 row)
```

# example - insert 1 row
INSERT INTO todos (name, completed) VALUES ('example todo1', false);

# view 1 row
SELECT * FROM todos;

# exit
\q

# Force exit?
[ctrl] D 

# Create connection via node server
**server.js**
```js
const Pool = require('pg').Pool

const pool = new Pool({
  user: 'postgres_todos_user',
  host: 'localhost',
  database: 'postgres_todos_db',
  password: 'postgres_todos_pwd',
  port: 5432,
})

const get = ({app, myCache, pool}) => {
  pool.query('SELECT * FROM todos ORDER BY id ASC', (error, results) => {
    if (error) {
      throw error
    }
    console.log('example get from postgresql', results.rows)
  })

  return app.get(url, (req, res) => {
    return res.send(myCache.mget(['pending', 'completed']));
  })
}
```

# docker commands
docker ps


