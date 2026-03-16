import React from "react";
import { ContentModal } from "@/components/common";
import {
  StoryboardLayout,
  GenerateTxtToPic,
  PicListItem,
  PicCardItem,
  GeneratePicToPic,
  GenerateThreeView,
} from "@/components/features";
import type { AssetType } from "@/constant";
import type { TabItem } from "../Storyboard/LeftPanel";

export interface StoryboardAssetsProps {
  visible: boolean;
  onCancel: () => void;
  assetType: AssetType;
}

const StoryboardAssets: React.FC<StoryboardAssetsProps> = ({
  visible,
  onCancel,
  assetType,
}) => {
  type RightItem = { index: number; selected?: boolean; url?: string };
  const scenesLeftPanel: TabItem[] = [
    { label: "生成场景图", content: <GeneratePicToPic /> },
    { label: "对话作图", content: <GenerateTxtToPic /> },
  ];
  const characterLeftPanel: TabItem[] = [
    { label: "生成角色图", content: <GeneratePicToPic /> },
    { label: "对话作图", content: <GenerateTxtToPic /> },
    { label: "三视图", content: <GenerateThreeView /> },
  ];
  const propsLeftPanel: TabItem[] = [
    { label: "生成道具图", content: <GeneratePicToPic /> },
    { label: "对话作图", content: <GenerateTxtToPic /> },
  ];

  const leftPanel =
    assetType === "scene"
      ? scenesLeftPanel
      : assetType === "character"
        ? characterLeftPanel
        : propsLeftPanel;

  return (
    <ContentModal
      visible={visible}
      showHeader={false}
      width="100%"
      height="100vh"
      onCancel={onCancel}
    >
      <StoryboardLayout
        onCancel={onCancel}
        leftPanelTabs={leftPanel}
        topData={new Array(20).fill(0).map((_, i) => ({
          id: i,
          url: `https://picsum.photos/120/70?random=${i}`,
        }))}
        buildRightListItem={(item) => <PicListItem item={item} />}
        buildRightCardItem={(item) => <PicCardItem item={item} />}
        rightData={
          Array.from({ length: 10 }, (_, i) => ({
            index: i,
            selected: i === 0,
          })) as RightItem[]
        }
      />
    </ContentModal>
  );
};

export { StoryboardAssets };
