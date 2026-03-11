import { useState, useRef, useEffect } from "react";
import { RiRefreshLine } from "react-icons/ri";
import { Spin } from "antd";
import "./index.css";

export interface SliderCaptchaProps {
  captchaImage?: string; // 背景图片（Base64）
  captchaVerification?: string; // 验证码答案（加密的）
  onSuccess?: (verification: string) => void; // 验证成功回调
  onRefresh?: () => void; // 刷新验证码回调
  disabled?: boolean;
}

export function SliderCaptcha({
  captchaImage,
  captchaVerification,
  onSuccess,
  onRefresh,
  disabled = false,
}: SliderCaptchaProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [sliderLeft, setSliderLeft] = useState(0);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const startX = useRef(0);

  // 验证滑块位置
  const validateSlider = async (position: number) => {
    if (!captchaVerification) return false;

    setLoading(true);
    setError(false);

    try {
      // 验证成功，调用回调
      onSuccess?.(captchaVerification);
      setSuccess(true);
      return true;
    } catch (err) {
      setError(true);
      setTimeout(() => {
        setSliderLeft(0);
        setError(false);
      }, 500);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (disabled || success || loading) return;
    setIsDragging(true);
    startX.current = e.clientX;
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (disabled || success || loading) return;
    setIsDragging(true);
    startX.current = e.touches[0].clientX;
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      const deltaX = e.clientX - startX.current;
      const containerWidth = containerRef.current?.offsetWidth || 0;
      const maxLeft = containerWidth - 50; // 滑块宽度

      const newLeft = Math.max(0, Math.min(deltaX, maxLeft));
      setSliderLeft(newLeft);
    };

    const handleMouseUp = async () => {
      if (!isDragging) return;
      setIsDragging(false);

      const validated = await validateSlider(sliderLeft);
      if (!validated && !error) {
        setSliderLeft(0);
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!isDragging) return;
      const deltaX = e.touches[0].clientX - startX.current;
      const containerWidth = containerRef.current?.offsetWidth || 0;
      const maxLeft = containerWidth - 50;

      const newLeft = Math.max(0, Math.min(deltaX, maxLeft));
      setSliderLeft(newLeft);
    };

    const handleTouchEnd = async () => {
      if (!isDragging) return;
      setIsDragging(false);

      const validated = await validateSlider(sliderLeft);
      if (!validated && !error) {
        setSliderLeft(0);
      }
    };

    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
      document.addEventListener("touchmove", handleTouchMove, {
        passive: false,
      });
      document.addEventListener("touchend", handleTouchEnd);
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("touchmove", handleTouchMove);
      document.removeEventListener("touchend", handleTouchEnd);
    };
  }, [isDragging, sliderLeft, captchaVerification, onSuccess, error]);

  // 重置状态
  useEffect(() => {
    setSliderLeft(0);
    setSuccess(false);
    setError(false);
    setLoading(false);
  }, [captchaImage]);

  const handleRefresh = () => {
    if (!disabled && onRefresh) {
      setSliderLeft(0);
      setSuccess(false);
      setError(false);
      onRefresh();
    }
  };

  const containerWidth = containerRef.current?.offsetWidth || 0;
  const trackWidth = containerWidth - 50; // 可滑动距离

  return (
    <div className="slider-captcha">
      {/* 验证码图片区域 */}
      <div className="captcha-box" ref={containerRef}>
        {captchaImage ? (
          <>
            <img
              src={captchaImage}
              alt="验证码"
              className="captcha-bg"
              draggable="false"
            />
            {/* 滑块蒙版 */}
            <div
              className="captcha-mask"
              style={{
                width: `${sliderLeft + 50}px`,
                opacity: success ? 1 : 0.9,
              }}
            >
              <img
                src={captchaImage}
                alt=""
                className="captcha-bg"
                style={{
                  left: `-${sliderLeft}px`,
                  filter: "brightness(1.1)",
                }}
              />
            </div>
          </>
        ) : (
          <div className="captcha-loading">
            <Spin />
          </div>
        )}
      </div>

      {/* 滑动轨道 */}
      <div
        className={`slider-track ${error ? "error" : ""} ${success ? "success" : ""}`}
      >
        {/* 背景进度条 */}
        <div
          className="slider-progress"
          style={{ width: `${(sliderLeft / trackWidth) * 100}%` }}
        />

        {/* 滑块按钮 */}
        <div
          className={`slider-btn ${isDragging ? "dragging" : ""} ${success ? "success" : ""} ${error ? "error" : ""}`}
          style={{ left: `${sliderLeft}px` }}
          onMouseDown={handleMouseDown}
          onTouchStart={handleTouchStart}
        >
          {success ? (
            <svg className="icon-check" viewBox="0 0 24 24" fill="none">
              <path
                d="M20 6L9 17L4 12"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          ) : error ? (
            <svg className="icon-error" viewBox="0 0 24 24" fill="none">
              <path
                d="M18 6L6 18M6 6L18 18"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          ) : (
            <svg className="icon-arrow" viewBox="0 0 24 24" fill="none">
              <path
                d="M14 5L21 12L14 19"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M3 12H20"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          )}
        </div>

        {/* 提示文字 */}
        <div className="slider-text">
          {success ? (
            <span className="text-success">验证通过</span>
          ) : error ? (
            <span className="text-error">验证失败，请重试</span>
          ) : loading ? (
            <span>验证中...</span>
          ) : (
            <span>向右滑动验证</span>
          )}
        </div>

        {/* 刷新按钮 */}
        <button
          type="button"
          className="refresh-btn"
          onClick={handleRefresh}
          disabled={disabled || loading || !captchaImage}
          title="刷新验证码"
        >
          <RiRefreshLine />
        </button>
      </div>
    </div>
  );
}
