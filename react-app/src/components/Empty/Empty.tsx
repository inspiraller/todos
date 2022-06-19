import {FC} from 'react';

import stylesTodo from "src/styles/Todo.module.css";

const Empty:FC = () => <p className={stylesTodo.empty}>This list is Empty</p>;

export default Empty;
