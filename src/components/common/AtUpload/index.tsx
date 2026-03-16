import React, { useState } from "react";
import { Upload, Spin, message } from "antd";
import type { UploadFile, UploadProps } from "antd";

interface AtUploadProps extends Omit<UploadProps, "onChange"> {
  /** 上传成功回调，会返回 url 和文件信息 */
  onSuccess?: (url: string, file: UploadFile) => void;
  children: React.ReactNode;
  acceptType?: "picture" | "doc";
}

const AtUpload: React.FC<AtUploadProps> = ({
  onSuccess,
  children,
  acceptType,

  ...props
}) => {
  const [loading, setLoading] = useState(false);
  const accept =
    acceptType === "picture" ? ".png,.jpg,.webp,.jpeg" : ".doc,.docx,.md,.pdf";

  const handleChange: UploadProps["onChange"] = (info) => {
    const { file } = info;

    if (file.status === "uploading") {
      setLoading(true);
    }

    if (file.status === "done") {
      setLoading(false);

      const url = file.response?.url;

      if (url) {
        onSuccess?.(url, file);
      } else {
        message.error("上传成功但未返回图片地址");
      }
    }

    if (file.status === "error") {
      setLoading(false);
      message.error("上传失败");
    }
  };

  return (
    <Upload
      {...props}
      accept={accept}
      showUploadList={false}
      onChange={handleChange}
    >
      <div style={{ position: "relative", display: "inline-block" }}>
        {children}

        {loading && (
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "rgba(0,0,0,0.4)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "inherit",
            }}
          >
            <Spin size="small" />
          </div>
        )}
      </div>
    </Upload>
  );
};

export { AtUpload };
