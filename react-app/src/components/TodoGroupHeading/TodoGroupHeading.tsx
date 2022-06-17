import React, { FC,  useState } from "react";
import stylesTodo from "src/styles/Todo.module.css";

export const compareStringAsc = (a: string, b: string) => {
  if (a < b) {
    return -1;
  }
  if (b < a) {
    return 1;
  }
  return 0;
};

type Torder = "desc" | "asc";
type TsetSortOrder = React.Dispatch<React.SetStateAction<Torder>>;
type TuseSortList = () => { sortOrder: Torder; setSortOrder: TsetSortOrder };

export const useSortList: TuseSortList = () => {
  const [sortOrder, setSortOrder] = useState<Torder>("asc");
  return { sortOrder, setSortOrder };
};

interface Props {
  todoGroup: string;
  setSortOrder: TsetSortOrder;
  sortOrder: Torder;
}
const TodoGroupHeading: FC<Props> = ({
  todoGroup,
  setSortOrder,
  sortOrder,
}) => {
  const toggleSort = () => {
    setSortOrder((prev) => (prev !== "desc" ? "desc" : "asc"));
  };
  return (
    <h2 className={stylesTodo.groupHeading}>
      <span className={stylesTodo.groupHeadingTitle}>{todoGroup}</span>
      <button
        type="button"
        className={`${stylesTodo.sort} ${
          sortOrder === "asc" ? stylesTodo.sortAsc : stylesTodo.sortDesc
        }`}
        onClick={toggleSort}
      >
        <span className="sort__text">Desc</span>
      </button>
    </h2>
  );
};

export default TodoGroupHeading;
