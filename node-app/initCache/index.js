const mockTodos = require('./mockTodos.json');

const init = (myCache) => {
  myCache.set("pending", mockTodos.todosListPending);
  myCache.set("completed", mockTodos.todosListCompleted);
  return myCache;
}

module.exports = init;
