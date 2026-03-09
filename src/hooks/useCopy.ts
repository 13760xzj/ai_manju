import { useToast } from "./useToast";
export const useCopy = () => {
  const toast = useToast();
  const copyText = (text: string) => {
    if (navigator.clipboard && window.isSecureContext) {
      // 现代浏览器
      navigator.clipboard.writeText(text).then(
        () => toast.success("复制成功"),
        () => toast.error("复制失败"),
      );
    } else {
      // 兼容旧浏览器
      const textarea = document.createElement("textarea");
      textarea.value = text;
      textarea.style.position = "fixed"; // 避免滚动
      document.body.appendChild(textarea);
      textarea.focus();
      textarea.select();
      try {
        const success = document.execCommand("copy");
        if (success) {
          toast.success("复制成功");
        } else {
          toast.error("复制失败");
        }
      } catch (err) {
        console.error("复制失败", err);
        toast.error("复制失败");
      }
      document.body.removeChild(textarea);
    }
  };
  return {
    copyText,
  };
};
