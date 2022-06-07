import React, { FC } from "react";

interface Props {
  children: React.ReactNode;
}
// wrap providers here...
const WrapProvider: FC<Props> = ({ children }) => (
  <div id="provider">{children}</div>
);

export default WrapProvider;
