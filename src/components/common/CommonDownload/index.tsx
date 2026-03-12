import React from "react";
import { useDownload } from "@/hooks/useDownload";
import { RiDownloadLine } from "react-icons/ri";

export interface CommonDownloadProps {
  title?: string; // 未传时根据content自动识别文件名
  content: string | Blob;
  type?: string;
  children?: React.ReactNode;
}

export const CommonDownload: React.FC<CommonDownloadProps> = ({
  title,
  content,
  type,
  children,
}) => {
  const { download } = useDownload();

  const downLoadHandler = () => {
    download(content, {
      filename: title,
      type,
    });
  };

  return (
    <div className="cursor-pointer" onClick={downLoadHandler}>
      {children || <RiDownloadLine style={{ fontSize: "18px" }} />}
    </div>
  );
};
