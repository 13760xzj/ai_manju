import React, { useState } from "react";
import TopBar from "./TopBar";
import LeftPanel from "./LeftPanel";
import RightPanel from "./RightPanel";
import { type TabItem } from "./LeftPanel";
import ResourceBoard from "./ResourceBoard";

import "./layout.css";

export interface StoryboardLayoutProps<T = object> {
  onCancel?: () => void;
  leftPanelTabs: TabItem[];
  topData: T[];
  onTopItemClick?: (index: number) => void;
  buildRightListItem: (item: T) => React.ReactNode;
  buildRightCardItem: (item: T) => React.ReactNode;
  rightData: object[];
}

export const StoryboardLayout: React.FC<StoryboardLayoutProps> = ({
  onCancel,
  leftPanelTabs = [],
  topData = [],
  onTopItemClick,
  buildRightListItem,
  buildRightCardItem,
  rightData = [],
}) => {
  const [curIndex, setCurIndex] = useState<number>(-1);
  function handleThumbClick(index: number) {
    setCurIndex(index);
    if (onTopItemClick) {
      onTopItemClick(index);
    }
  }

  return (
    <div className="layout">
      {/* 顶部 */}
      <div className="layout-top">
        <TopBar
          onCancel={onCancel}
          data={topData}
          childWidth={100}
          renderItem={(item, index) => {
            const isSelected = index === curIndex;
            return (
              <div
                className={`w-full h-full flex flex-col cursor-pointer p-1!`}
                onClick={() => handleThumbClick(index)}
              >
                <div
                  className="flex-1 w-full h-full overflow-hidden rounded bg-gray-50/50"
                  style={{
                    boxShadow: isSelected
                      ? `0 0 0 2px var(--primary-color)`
                      : "none",
                  }}
                >
                  <img
                    src={item.url}
                    className="object-cover h-full w-full transition-transform duration-200 ease-in-out transform hover:scale-120"
                  />
                </div>
                <div
                  className={`text-xs text-center mt-2! ${
                    isSelected ? "text-white" : "text-gray-500"
                  }`}
                >
                  分镜 {index + 1}
                </div>
              </div>
            );
          }}
        />
      </div>

      {/* 主体 */}
      <div className="layout-body">
        <div className="layout-left">
          <LeftPanel tabs={leftPanelTabs} />
        </div>

        <div className="layout-right">
          <RightPanel
            children={
              <ResourceBoard
                data={rightData}
                index={0}
                layoutType="list"
                onSelect={(index) => {
                  console.log("onSelect", index);
                }}
                dataChange={(data) => {
                  console.log("dataChange", data);
                }}
                buildListItem={buildRightListItem}
                buildCardItem={buildRightCardItem}
              />
            }
          />
        </div>
      </div>
    </div>
  );
};
