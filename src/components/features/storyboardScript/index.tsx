import React from "react";
import { ContentModal } from "@/components/common";
import {
  StoryboardLayout,
  GeneratePicToPic,
  GenerateTxtToPic,
  PicListItem,
  PicCardItem,
  GenerateNineGrid,
} from "@/components/features";

export interface StoryboardScriptProps {
  visible: boolean;
  onCancel: () => void;
}

type RightItem = { index: number; selected?: boolean; url?: string };

const StoryboardScript: React.FC<StoryboardScriptProps> = ({
  visible,
  onCancel,
}) => {
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
        leftPanelTabs={[
          { label: "生成场景图", content: <GeneratePicToPic /> },
          { label: "对话作图", content: <GenerateTxtToPic /> },
          { label: "九宫格", content: <GenerateNineGrid /> },
        ]}
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

export { StoryboardScript };
