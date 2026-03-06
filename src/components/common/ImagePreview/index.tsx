import { Image } from "antd";

interface ImagePreviewProps {
  images: string[];
  children: React.ReactNode;
  startIndex?: number;
}

export const ImagePreview: React.FC<ImagePreviewProps> = ({
  images,
  children,
  startIndex = 0,
}) => {
  const [visible, setVisible] = useState(false);
  const [current, setCurrent] = useState(startIndex);

  const openPreview = () => {
    setCurrent(startIndex);
    setVisible(true);
  };

  return (
    <>
      {/* 触发元素 */}
      <span onClick={openPreview} style={{ cursor: "pointer" }}>
        {children}
      </span>

      {/* 预览 */}
      <Image.PreviewGroup
        preview={{
          visible,
          current,
          onVisibleChange: (v) => setVisible(v),
          onChange: (index) => setCurrent(index),
        }}
      >
        {images.map((src, index) => (
          <Image key={index} src={src} style={{ display: "none" }} />
        ))}
      </Image.PreviewGroup>
    </>
  );
};
