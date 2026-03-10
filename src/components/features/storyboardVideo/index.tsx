import React from "react";
import { ContentModal } from "@/components/common";
import {
  StoryboardLayout,
  GeneratePicToVideo,
  GenerateMultiToVideo,
  PicListItem,
  PicCardItem,
  FirstLastFrame,
} from "@/components/features";

export interface StoryboardScriptProps {
  visible: boolean;
  onCancel: () => void;
}

const StoryboardVideo: React.FC<StoryboardScriptProps> = ({
  visible,
  onCancel,
}) => {
  return (
    <ContentModal
      visible={visible}
      showHeader={false}
      width="900%"
      height="100vh"
      onCancel={onCancel}
    >
      <StoryboardLayout
        onCancel={onCancel}
        leftPanelTabs={[
          { label: "图生视频", content: <GeneratePicToVideo /> },
          { label: "多参生视频", content: <GenerateMultiToVideo /> },
          { label: "首位帧视频", content: <FirstLastFrame /> },
        ]}
        topData={new Array(20).fill(0).map((_, i) => ({
          id: i,
          url: `https://picsum.photos/120/70?random=${i}`,
        }))}
        buildRightListItem={(item) => (
          <PicListItem item={item} isVideo={true} />
        )}
        buildRightCardItem={(item) => (
          <PicCardItem item={item} isVideo={true} />
        )}
        rightData={Array.from({ length: 10 }, (_, i) => i + 1)}
      />
    </ContentModal>
  );
};

export { StoryboardVideo };
