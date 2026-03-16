import { Image, Modal } from "antd";
import React, { useMemo, useState } from "react";
import "./index.css";

interface MediaPreviewProps {
  urls: string[];
  children: React.ReactNode;
  startIndex?: number;
}

function isVideo(url: string) {
  return /\.(mp4|webm|ogg|mov)$/i.test(url);
}

export const MediaPreview: React.FC<MediaPreviewProps> = ({
  urls,
  children,
  startIndex = 0,
}) => {
  const [visible, setVisible] = useState(false);
  const [current, setCurrent] = useState(startIndex);

  const isVideoPreview = useMemo(() => {
    return urls.length === 1 && isVideo(urls[0]);
  }, [urls]);

  const openPreview = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
    setCurrent(startIndex);
    setVisible(true);
  };

  return (
    <>
      {/* 触发元素 */}
      <div onClick={openPreview} style={{ cursor: "pointer" }}>
        {children}
      </div>

      {/* 视频预览 */}
      {isVideoPreview && (
        <Modal
          open={visible}
          footer={null}
          onCancel={() => setVisible(false)}
          bodyStyle={{ background: "#444" }}
          width="65%"
          centered
          destroyOnClose
        >
          <video
            src={urls[0]}
            controls
            autoPlay
            style={{
              width: "100%",
              height: "100%",
              objectFit: "contain",
            }}
          />
        </Modal>
      )}

      {/* 图片预览 */}
      {!isVideoPreview && (
        <Image.PreviewGroup
          preview={{
            visible,
            current,
            onVisibleChange: (v) => setVisible(v),
            onChange: (index) => setCurrent(index),
          }}
        >
          {urls.map((src, index) => (
            <Image key={index} src={src} style={{ display: "none" }} />
          ))}
        </Image.PreviewGroup>
      )}
    </>
  );
};
