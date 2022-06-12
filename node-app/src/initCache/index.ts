import NodeCache from 'node-cache';
import mockTodos from './mockTodos.json';

const init = (myCache: NodeCache) => {
  myCache.set("pending", mockTodos.todosListPending);
  myCache.set("completed", mockTodos.todosListCompleted);
  return myCache;
}

export default init;
