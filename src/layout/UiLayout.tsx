import React, { ReactNode } from "react";
interface UiLayoutProps {
  children: ReactNode;
}
const UiLayout: React.FC<UiLayoutProps> = ({ children }) => {
  return <div>{children}</div>;
};

export default UiLayout;
