import React, { FC } from "react";
import { Provider } from 'react-redux';
import objStore from 'src/store/config/getStore';

interface Props {
  children: React.ReactNode;
}
// wrap providers here...
const WrapProvider: FC<Props> = ({ children }) => (
  <Provider store={objStore.store}>{children}</Provider>
);

export default WrapProvider;
