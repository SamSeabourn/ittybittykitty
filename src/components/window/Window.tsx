import React from "react";
import "./style.css";

type Props = {
  children: React.ReactNode;
};

const Window = ({ children }: Props) => {
  return (
    <div>
      <div className="window-container">
        <div>{children}</div>
      </div>
    </div>
  );
};

export default Window;
