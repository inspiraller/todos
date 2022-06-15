# Prepared queries
- example - https://blog.logrocket.com/crud-rest-api-node-js-express-postgresql/
```js
pool.query(
    'UPDATE users SET name = $1, email = $2 WHERE id = $3',
    [name, email, id],
    (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(`User modified with ID: ${id}`)
    }
  )
}
```

# postgres - pass a string object to postgres query method
https://kb.objectrocket.com/postgresql/how-to-use-nodejs-to-insert-into-a-postgresql-table-958

# NOTE: You can only use template literals - dynamic values inside the values.
- Not the tablename. Note the colums. 
- Only the values 
- eg
- for postgres

```js
var queryConfig = {
  text: 'INSERT INTO users(username, firstname, lastname) VALUES ($1, $2, $3),
  values: ['a', 'b', 'c']
}
```

# Yet this implies that it should work
- https://github.com/gajus/slonik/blob/master/.README/VALUE_PLACEHOLDERS.md
```js
const query0 = sql`SELECT ${'foo'} FROM bar`;
const query1 = sql`SELECT ${'baz'} FROM (${query0})`;
```
Produces:
```
{
  sql: 'SELECT $1 FROM (SELECT $2 FROM bar)',
  values: [
    'baz',
    'foo'
  ]
  }
```

# HACK
- https://github.com/gajus/slonik#user-content-slonik-how-are-they-different-pg-vs-slonik
##  constructing queries is not allowed.
There is an internal mechanism that checks to see if q
```
  const query = {sql: `SELECT * FROM ${PG_TABLE} ORDER BY id ASC;`, type: 'SLONIK_TOKEN_SQL', values: []} as any;
```

# answer: 
- https://github.com/felixfbecker/node-sql-template-strings
Some values cannot be replaced by placeholders in prepared statements, like table names. append() replaces the SQL.raw() syntax from version 1, just pass a string and it will get appended raw.
```js
db.query(SQL`SELECT * FROM "`.append(table).append(SQL`" WHERE author = ${author} ORDER BY ${column} `).append(order))
```

# Conclusion
```
      const query = sql`SELECT * FROM ${sql.identifier([PG_TABLE])} ORDER BY id ASC`
```