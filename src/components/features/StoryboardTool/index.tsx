import React from "react";
import { ContentModal } from "@/components/common";
import {
  StoryboardLayout,
  GeneratePicToPic,
  GenerateTxtToPic,
  PicListItem,
  PicCardItem,
  GenerateThreeView,
} from "@/components/features";

export interface StoryboardToolProps {
  visible: boolean;
  onCancel: () => void;
}

const StoryboardTool: React.FC = ({ visible, onCancel }) => {
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
          { label: "三视图", content: <GenerateThreeView /> },
        ]}
        topData={new Array(20).fill(0).map((_, i) => ({
          id: i,
          url: `https://picsum.photos/120/70?random=${i}`,
        }))}
        buildRightListItem={(item) => <PicListItem item={item} />}
        buildRightCardItem={(item) => <PicCardItem item={item} />}
        rightData={Array.from({ length: 10 }, (_, i) => i + 1)}
      />
    </ContentModal>
  );
};

export { StoryboardTool };
