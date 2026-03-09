import React from "react";
import CardTabs from "./CardTabs";

export interface TabItem {
  label: string;
  content: React.ReactNode;
}

export interface LeftPanelProps {
  tabs: TabItem[];
}
const LeftPanel: React.FC = ({ tabs }) => {
  return (
    <div className="left-panel h-full">
      <CardTabs tabs={tabs} />
    </div>
  );
};

export default LeftPanel;
