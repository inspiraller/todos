import { FC, Fragment, useEffect } from 'react'

import useSWR from 'swr'

import TodoArticle from 'src/components/TodoArticle/TodoArticle'
import stylesTodo from 'src/styles/Todo.module.css'

import {
  fetchTodos,
  prefixProtocol,
  TODOS_URL_GET,
  TtodosResponse,
} from 'src/services/todos'
import TodoAdd from 'src/components/TodoAdd/TodoAdd'
import useTodos from 'src/store/data/todos/useTodos'

export const TEXT_FAILED = 'Failed to load'
export const TEXT_LOADING = 'Loading...'
export const TESTID_PENDING = 'group-pending'

export const TESTID_TODO_ITEM_EXISTS = 'todoExists'

const Todos: FC = () => {
  const { acPopulateTodos, pending, completed } = useTodos()
  const { data: resp, error } = useSWR(
    `${prefixProtocol}${TODOS_URL_GET}`,
    fetchTodos
  )

  const obj = (resp as TtodosResponse)?.data
  const pendingLoaded = obj?.pending
  const completedLoaded = obj?.completed

  useEffect(() => {
    if (!pending?.length && pendingLoaded && completedLoaded) {
      acPopulateTodos({
        pending: pendingLoaded,
        completed: completedLoaded,
      })
    }
  }, [pending, pendingLoaded, completedLoaded, acPopulateTodos])

  if (error) return <div className={stylesTodo.fail}>{TEXT_FAILED}</div>
  if (!resp) return <div className={stylesTodo.loading}>{TEXT_LOADING}</div>

  return (
    <>
      <h1 className={stylesTodo.mainTitle}>Todos</h1>
      <TodoAdd />
      <div className={stylesTodo.wrapper}>
        <TodoArticle
          title={'Pending'}
          todosList={pending as string[]}
          dataTestId={TESTID_PENDING}
          dataTestIdItemExists={TESTID_TODO_ITEM_EXISTS}
        />
        <TodoArticle title={'Completed'} todosList={completed as string[]} />
      </div>
    </>
  )
}

export default Todos
