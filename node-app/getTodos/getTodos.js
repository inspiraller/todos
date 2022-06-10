const path = require('path');
require('dotenv').config({path: path.resolve(__dirname, '../../.env')})

const {PG_TABLE} = process.env;

// TODO: get from .env
const url = "/api/todos/get";

module.exports = {
  url,
  get: ({app, myCache, pool}) => {

    pool.query(`SELECT * FROM ${PG_TABLE} ORDER BY id ASC`, (error, results) => {
      if (error) {
        throw error
      }
      console.log('example get from postgresql', results.rows)
    })

    return app.get(url, (req, res) => {
      return res.send(myCache.mget(['pending', 'completed']));
    })
  }
}
