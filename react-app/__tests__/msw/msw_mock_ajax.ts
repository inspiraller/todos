import { rest } from 'msw';

import { setupServer, SetupServerApi } from 'msw/node';

import mockTodos from './mockTodos.json';

import { TODOS_URL_GET } from 'src/services/getTodos';
import { PropsTodos } from 'src/types';

export const mswTodos = rest.get(`${TODOS_URL_GET}`, (req, res, ctx) => {
  let results: PropsTodos;
  results = mockTodos;
  return res(ctx.status(200), ctx.json(mockTodos));
});

export const mswAllHandlers = () => [mswTodos];

export const mswServerAll = () => {
  const server: SetupServerApi = setupServer.apply(this, mswAllHandlers());
  return server;
};
