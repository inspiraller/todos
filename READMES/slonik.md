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

# ACtually that doesn't work 
> error: error: syntax error at or near "$1"

