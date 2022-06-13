import { sql, DataIntegrityError, DatabasePoolConnection } from "slonik";

const createTable = async (connection: DatabasePoolConnection, table: string) => {
    try {
      console.log(3.1, table)
      const result = await connection.query(sql`
      CREATE TABLE ${table}(
        id SERIAL PRIMARY KEY,
        name VARCHAR(500) NOT NULL,
        completed BOOLEAN NOT NULL);
    `);
      console.log("32. createTable", { result });
      return result;
    } catch (err) {
      throw err;
    }
  };

export const createTableIfNotExist = async (
  connection: DatabasePoolConnection,
  table: string
) => {
    console.log("createTableIfNotExist()");
    try {
      console.log(1)
      const resultExist = await connection.query(
        sql`SELECT EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename  = ${table});`
      );
      console.log(2, resultExist)
      const isExist = resultExist.rows[0].exists;
      if (!isExist) {
        console.log(3, connection)
        // const resultCreated = await createTable(connection, table);
        const resultCreated = await connection.query(sql`CREATE TABLE ${table} (id SERIAL PRIMARY KEY, name VARCHAR(500) NOT NULL, completed BOOLEAN NOT NULL);`);
        console.log(4)
        return { table: resultCreated }
      } else {
        return { isExist: true };
      }
    } catch (err) {
      if (err instanceof DataIntegrityError) {
        console.error(
          "There is more than one row matching the select criteria."
        );
      }
      throw err;
    }
  }
