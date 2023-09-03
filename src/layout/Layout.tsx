import React, { ReactNode } from "react";
import LogicLayout from "./LogicLayout";
import UiLayout from "./UiLayout";

interface LayoutProps {
  children: ReactNode;
}
const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <LogicLayout>
      <UiLayout>{children}</UiLayout>
    </LogicLayout>
  );
};

export default Layout;
