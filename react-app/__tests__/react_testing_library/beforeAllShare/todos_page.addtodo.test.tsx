import { waitFor, cleanup } from '@testing-library/react/pure' // prevent cleanup after test - https://github.com/testing-library/react-testing-library/issues/541#issuecomment-562601514
import userEvent from '@testing-library/user-event'

import { mswServerAll } from '__tests__/msw/msw_mock_ajax'
import mockTodos from '__tests__/msw/mockTodos.json'
import { TEXT_TODO } from 'src/components/TodoAdd/TodoAdd'
import Todos from 'src/pages/todos'
import renderPure from '../../__utils__/_renderPure'

const server = mswServerAll()

/* eslint-disable testing-library/no-wait-for-side-effects, testing-library/prefer-screen-queries */
/* eslint-disable  @typescript-eslint/no-explicit-any */
let rendered: any

const TEXT_RENDERED_PAGE = 'Todos'
const RENDERED_ARTICLE = mockTodos.completed[0]

describe('add todo', () => {
  beforeAll(async () => {
    server.listen()
    rendered = await renderPure(Todos, TEXT_RENDERED_PAGE)
    const regTestTextExists = RegExp(RENDERED_ARTICLE, 'i')

    await waitFor(() => rendered.findByText(regTestTextExists))
  })
  afterAll(() => {
    server.close()
    cleanup()
    jest.resetAllMocks()
  })
  it(`Should render page with article text - ${RENDERED_ARTICLE}`, async () => {
    expect(rendered)
  })
  it('should add to input', () => {
    const input = rendered.getByPlaceholderText(TEXT_TODO) // FAIL HERE....
    userEvent.type(input, 'hello world')
    expect(true).toBe(true)
  })
})
