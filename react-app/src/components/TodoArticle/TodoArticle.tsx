import React, { FC, useState } from "react";
import useTodos from "src/store/data/todos/useTodos";
import stylesTodo from "src/styles/Todo.module.css";
import { RowPropsClient, TevtInputChange } from "src/types";
import Empty from "../Empty/Empty";
import TodoGroupHeading, {
  compareStringAsc,
  compareStringDesc,
  useSortList,
} from "../TodoGroupHeading/TodoGroupHeading";
import TodoUpdate, { useUpdate } from "../TodoUpdate/TodoUpdate";

interface Props {
  todoGroup: string;
  todosList: RowPropsClient[];
  isCompleted?: boolean;
}

interface PropsLabel extends RowPropsClient {
  isCompleted?: boolean;
  handleChange: (evt: TevtInputChange) => void;
}
const Label: FC<PropsLabel> = ({ isCompleted, id, todoText, handleChange }) => {
  return (
    <label>
      <input
        type="checkbox"
        value={id}
        checked={isCompleted}
        onChange={handleChange}
      />
      <span className={stylesTodo.todoGroup}>{todoText}</span>
    </label>
  );
};

const sortDistance = (
  aStart: number,
  aEnd: number,
  bStart: number,
  bEnd: number
) => aEnd - aStart - (bEnd - bStart);

const TodoArticle: FC<Props> = ({ todoGroup, todosList = [], isCompleted }) => {
  const [isShow, setShow] = useState(true);
  const { handleChange } = useUpdate({ isCompleted });
  const { sortOrder, setSortOrder } = useSortList();
  const listSorted = todosList.slice();

  if (isCompleted) {
    listSorted.sort((objA, objB) =>
      sortDistance(
        Number(objA.created_timestamp),
        Number(objA.completed),
        Number(objB.created_timestamp),
        Number(objB.completed)
      )
    );
  } else {
    listSorted.sort((objA, objB) =>
      compareStringAsc(objB.created_timestamp, objA.created_timestamp)
    );
  }
  if (sortOrder === "desc") {
    listSorted.reverse();
  }

  const handleToggle = () => {
    setShow(prev => !prev);
  }

  const classButtonShowVisible = isShow? stylesTodo.buttonShowVisible: '';
  
  return (
    <article className={stylesTodo.group}>
      <button type="button" onClick={handleToggle} className={`${stylesTodo.buttonShow} ${classButtonShowVisible}`}><span>Toggle</span></button>
      <TodoGroupHeading
        todoGroup={todoGroup}
        setSortOrder={setSortOrder}
        sortOrder={sortOrder}
      />
      {isShow && listSorted.length ? (
        <ul className={stylesTodo.ul}>
          {listSorted.map(({ todoText, id, created_timestamp, completed }) => (
            <li key={`todo_li_${id}`}>
              <TodoUpdate
                id={id}
                todoText={todoText}
                handleChange={handleChange}
                created_timestamp={created_timestamp}
                completed={completed}
              />
            </li>
          ))}
        </ul>
      ) : null}
      {!listSorted.length ? <Empty/> : null}
    </article>
  );
};

export default TodoArticle;
