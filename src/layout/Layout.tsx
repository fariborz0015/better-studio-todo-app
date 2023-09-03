import React, { ReactNode } from "react";

interface IndexProps {
  children: ReactNode;
}
const Index: React.FC<IndexProps> = ({ children }) => {
  return (
    <div className="container pt-[70px]">
      <div className="w-full">
        <h1 className="text-xl">✔️ Task List</h1>
        <p>
          Break your life to simple tasks to get things done! Does not matter how many tasks you
          done, It’s important to break to small tasks and be on progress.
        </p>
      </div>
      {children}
    </div>
  );
};

export default Index;
