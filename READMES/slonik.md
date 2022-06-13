# When building sql queries 
> troubleshoot:  error: bind message supplies 1 parameters, but prepared statement "" requires 0

**Caused by interpolationg values. Instead use Value placeholders**

**Don't do this!**
```js
connection.query(sql`
  SELECT 1
  FROM foo
  WHERE bar = ${baz}
`);
```

**Do this - wrap with single quote**
```js
connection.query(sql`
  SELECT 1
  FROM foo
  WHERE bar = ${'baz'}
`);
```

# Troubleshoot
> error: error: syntax error at or near "$1"
- This maybe because you have wrapped a connect inside a connect
```js
  const result1 = await connection.query(query);
  const isExist = result.rows[0].exists;
  if (!isExist) {
    createTable(pool).then(() => cb(pool)); //  contains another - await connection.query(). Need to release the connection.
  } else {
    cb(pool);
  }
```

# Troubleshoot - Client was closed and is not queryable
> 
**SUCCESS**
```ts
  pool.connect(async (connection) => {
      const result = await connection.query(sql`SELECT EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename  = ${table});`
  });
```

**FAIL**
```ts
  const myPromise = () => new Promise((resolve) => {
    const result = await connection.query(sql`SELECT EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename  = ${table});`
    // error
    resolve(result);
  });
  pool.connect(async (connection) => {
    myPromise() // error - not returning result, therefore breaks
  });
```

**SUCCESS** - works because not async method
```ts
  pool.connect((connection) => {
    myPromise() // success
  });
```

**SUCCESS**
```ts
  pool.connect(async (connection) => {
    const result = await myPromise() // success
  });
```

**SUCCESS**
```ts
  pool.connect(async (connection) => {
    return myPromise() // success
  });
```


```