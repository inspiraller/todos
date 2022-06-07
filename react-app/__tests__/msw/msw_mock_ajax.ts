import { rest } from 'msw';

import { setupServer, SetupServerApi } from 'msw/node';

import mockTodos from './mockTodos.json';

import { PropsTodos, TODOS_URL_GET } from 'src/services/todos';

export const mswTodos = rest.get(`${TODOS_URL_GET}`, (req, res, ctx) => {
  let results: PropsTodos
  results = mockTodos;
  return res(ctx.status(200), ctx.json(mockTodos));
});

export const mswAllHandlers = () => [mswTodos];

export const mswServerAll = () => {
  const server: SetupServerApi = setupServer.apply(this, mswAllHandlers());
  return server;
};
