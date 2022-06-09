import { waitFor, cleanup, fireEvent } from '@testing-library/react/pure' // prevent cleanup after test - https://github.com/testing-library/react-testing-library/issues/541#issuecomment-562601514
// import userEvent from '@testing-library/user-event'

import Todos from 'src/pages/todos'
import {
  TESTID_PENDING,
  TESTID_TODO_ITEM_EXISTS,
} from 'src/components/Todos/Todos'
import { TEXT_TODO } from 'src/components/TodoAdd/TodoAdd'

import objStore from 'src/store/config/getStore'

import { mswServerAll } from '__tests__/__utils__/msw/msw_mock_ajax'
import renderPure from '__tests__/__utils__/react/_renderPure'

const server = mswServerAll()

/* eslint-disable testing-library/no-wait-for-side-effects, testing-library/prefer-screen-queries */
/* eslint-disable  @typescript-eslint/no-explicit-any */
let view: any

const TEXT_RENDERED_PAGE = 'Todos'

let input: any
const TEXT_INPUT = 'hello world'

describe('add todo', () => {
  beforeAll(async () => {
    server.listen()
    view = await renderPure(Todos, TEXT_RENDERED_PAGE)
  })
  afterAll(() => {
    server.close()
    cleanup()
    jest.resetAllMocks()
  })
  it(`Should render page - with zero pending items`, () => {
    expect(view)
    expect(objStore.store.getState().todos?.pending.length).toBe(0)
  })
  it('should (type) into input', () => {
    input = view.getByPlaceholderText(TEXT_TODO)
    fireEvent.change(input, { target: { value: TEXT_INPUT } }) // userEvent.type(input, TEXT_INPUT) - does not work
  })
  it('should (press) enter', () => {
    /* eslint-disable testing-library/no-debugging-utils */
    // view.debug();
    expect(input.value).toBe(TEXT_INPUT)
    fireEvent.submit(input)
  })
  it('should wait for pending item to exist - and update state', async () => {
    await waitFor(() => view.findByTestId(TESTID_TODO_ITEM_EXISTS), {
      timeout: 2000,
    })
    expect(objStore.store.getState().todos?.pending.length).toBe(1)
    expect(objStore.store.getState().todos?.completed.length).toBe(0)
  })
  it('should render li', () => {
    expect(view.getByTestId(TESTID_PENDING)).toHaveTextContent(TEXT_INPUT)
  })
})
