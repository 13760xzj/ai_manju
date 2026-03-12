export const useDownload = () => {
  const triggerDownload = (blob: Blob, filename: string) => {
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = filename;

    document.body.appendChild(link);
    link.click();

    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const base64ToBlob = (base64: string) => {
    const arr = base64.split(",");
    const mime = arr[0].match(/:(.*?);/)?.[1] || "";
    const bstr = atob(arr[1]);
    let n = bstr.length;

    const u8arr = new Uint8Array(n);

    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }

    return new Blob([u8arr], { type: mime });
  };

  const getFilenameFromUrl = (url: string) => {
    try {
      const pathname = new URL(url).pathname;
      const name = pathname.substring(pathname.lastIndexOf("/") + 1);
      return name || "download";
    } catch {
      return "download";
    }
  };

  const download = async (
    data: string | Blob,
    options?: {
      filename?: string;
      type?: string;
    },
  ) => {
    let blob: Blob;
    let filename = options?.filename || "download";

    // 1️⃣ Blob
    if (data instanceof Blob) {
      blob = data;
    }

    // 2️⃣ base64
    else if (data.startsWith("data:")) {
      blob = base64ToBlob(data);
      if (!options?.filename) {
        const mime = blob.type.split("/")[1] || "file";
        filename = `file.${mime}`;
      }
    }

    // 3️⃣ URL
    else if (/^https?:\/\//.test(data)) {
      const res = await fetch(data);
      blob = await res.blob();

      if (!options?.filename) {
        filename = getFilenameFromUrl(data);
      }
    }

    // 4️⃣ 普通文本
    else {
      const type = options?.type || "text/plain";
      blob = new Blob([data], { type });
    }

    triggerDownload(blob, filename);
  };

  return { download };
};
