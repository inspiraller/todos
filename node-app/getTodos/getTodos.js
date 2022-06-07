const mockTodos = require('../mockTodos.json');

// TODO: get from .env
const urlGet = "/api/todos/get";

module.exports = ({app, myCache}) =>
  app.get(urlGet, (req, res) => {
    myCache.set( "pending", mockTodos.todosListPending )
    myCache.set( "completed", mockTodos.todosListCompleted )
    return res.send(myCache.mget(['pending', 'completed']));
  });
