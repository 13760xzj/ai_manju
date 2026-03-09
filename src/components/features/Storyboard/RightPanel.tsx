import React from "react";

export interface RightPanelProps {
  children?: React.ReactNode;
}

const RightPanel: React.FC = ({ children }) => {
  return <div className="right-panel h-full">{children}</div>;
};

export default RightPanel;
