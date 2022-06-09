import { rest } from 'msw'

import { setupServer, SetupServerApi } from 'msw/node'
import { TODOS_URL_GET, TODOS_URL_POST } from 'src/services/todos'
import mockTodos from './mockTodos.json'

const nodeExampleCache = mockTodos;

export const mswGetTodos = rest.get(`${TODOS_URL_GET}`, (req, res, ctx) => {
  return res(ctx.status(200), ctx.json(nodeExampleCache))
})

export const mswPostTodos = rest.post(`${TODOS_URL_POST}`, (req, res, ctx) => {
  const value = (req?.body as any)?.title;
  nodeExampleCache.pending.push(value);

  return res(ctx.status(200), ctx.json(nodeExampleCache.pending))
})

export const mswAllHandlers = () => [mswGetTodos, mswPostTodos]

export const mswServerAll = () => {
  const server: SetupServerApi = setupServer.apply(this, mswAllHandlers())
  return server
}
