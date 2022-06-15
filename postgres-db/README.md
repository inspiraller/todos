# run docker
 docker-compose --env-file \"../.env\" up --build

# Testing:
# connect
// connect      containername  language username               database
docker exec -it todos          psql     -U postgres_todos_user -d postgres_todos_db


# Search if table exist
```
SELECT EXISTS (SELECT FROM pg_tables WHERE tablename = 'todos');
```

# view db
\dt

```
List of relations
 Schema | Name  | Type  |        Owner
--------+-------+-------+---------------------
 public | todos | table | postgres_todos_user
(1 row)
```
# exit
\q

# Force exit?
[ctrl] D 

# docker commands - show containers
- docker ps -a
- docker volume ls
- docker image ls

**log the docker container id for debugging**
- docker logs baf32ff7ec03

------------------------------------------
# Troubleshooting: - syntax error at or near "$1"
- This seems to be caused by interpolation problems.
- Ensure you have not wrapped a pool.connect inside a pool.connect
- Know that the variables interpolated may be processed with a single quote
- Ensure each sql statments end in semi colon;

# Investigation:
- kill/clear the postgres-sql container and volumes
- Consider downgrading or upgrading slonik
- Test the sql commands in docker container as above

# Run bash script
sh postgres-db\script.sh
- pass variables - https://www.baeldung.com/linux/use-command-line-arguments-in-bash-script




