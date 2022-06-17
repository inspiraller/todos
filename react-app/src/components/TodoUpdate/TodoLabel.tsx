import React, { FC, useEffect,useState } from "react";
import { formatDistance } from "date-fns";

import stylesTodo from "src/styles/Todo.module.css";
import { TevtInputChange, Tid } from "src/types";

interface PropsLabel {
  todoText: string;
  id: Tid;
  handleChange: (evt: TevtInputChange) => void;
  created_timestamp: string;
  completed?: string;
}
const TodoLabel: FC<PropsLabel> = ({
  id,
  todoText,
  created_timestamp,
  completed,
  handleChange,
}) => {
  const [now, setNow] = useState(new Date().toISOString())
  let timer: NodeJS.Timer | null;

  const clearTimer = () => {
    if (timer) {
      clearInterval(timer);
    }
  }

  useEffect(() => {
    clearTimer();
    timer = setInterval(() => {
      setNow(new Date().toISOString())
    }, 60000);
    return clearTimer;
  }, [completed])

  const isCompleted = !!completed;
  const timeDiff =
    completed
      ? formatDistance(new Date(created_timestamp), new Date(completed))
      : formatDistance(new Date(created_timestamp), new Date(now))

  const dateTime = completed ?? now

  return (
    <label className={stylesTodo.label}>
      <input
        type="checkbox"
        value={id}
        checked={isCompleted}
        onChange={handleChange}
      />
      <span className={stylesTodo.todoGroup}>{todoText}</span>

      <time className={stylesTodo.completed} dateTime={dateTime}>
        {timeDiff}
      </time>
    </label>
  );
};

export default TodoLabel;
