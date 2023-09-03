import React, { ReactNode } from "react";

interface LogicLayoutProps {
  children: ReactNode;
}
const LogicLayout: React.FC<LogicLayoutProps> = ({ children }) => {
  return <>{children}</>;
};

export default LogicLayout;
