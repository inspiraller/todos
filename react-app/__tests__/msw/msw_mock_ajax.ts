import { rest } from 'msw'

import { setupServer, SetupServerApi } from 'msw/node'
import { TODOS_URL_GET } from 'src/services/todos'
import mockTodos from './mockTodos.json'

export const mswTodos = rest.get(`${TODOS_URL_GET}`, (req, res, ctx) => {
  return res(ctx.status(200), ctx.json(mockTodos))
})

export const mswAllHandlers = () => [mswTodos]

export const mswServerAll = () => {
  const server: SetupServerApi = setupServer.apply(this, mswAllHandlers())
  return server
}
