export const useDownload = () => {
  const downloadFile = (content, filename, contentType = "text/markdown") => {
    // 创建 Blob 对象
    const blob = new Blob([content], { type: contentType });

    // 创建下载链接
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;

    // 触发下载
    document.body.appendChild(link);
    link.click();

    // 清理
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  };

  return { downloadFile };
};
