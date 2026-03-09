import { useState } from 'react';
import './index.css';

export interface CaptchaInputProps {
  value: string;
  onChange: (value: string) => void;
  onRefresh?: () => void;  // 刷新验证码回调
  captchaImage?: string;   // 后端返回的验证码图片（Base64）
  onError?: () => void;
  disabled?: boolean;
}

export function CaptchaInput({
  value,
  onChange,
  onRefresh,
  captchaImage,
  onError,
  disabled = false
}: CaptchaInputProps) {
  const [error, setError] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    onChange(inputValue);
    
    // 清空错误状态
    if (error) {
      setError(false);
    }
  };

  const handleBlur = () => {
    // 失焦时验证（如果有值）
    if (value) {
      // 简单验证长度
      const isValid = value.length >= 4;
      if (!isValid) {
        setError(true);
        onError?.();
      }
    }
  };

  const handleRefresh = () => {
    if (!disabled && onRefresh) {
      onRefresh();  // 调用父组件传入的刷新函数
      onChange(''); // 清空输入
      setError(false);
    }
  };

  return (
    <div className="captcha-input-wrapper">
      <input
        type="text"
        className={`captcha-input ${error ? 'error' : ''}`}
        value={value}
        onChange={handleChange}
        onBlur={handleBlur}
        placeholder="请输入验证码"
        disabled={disabled}
        autoComplete="off"
      />
      <div 
        className="captcha-image-wrapper"
        onClick={handleRefresh}
        title="点击刷新验证码"
      >
        {captchaImage ? (
          <img 
            src={captchaImage} 
            alt="验证码" 
            className="captcha-image"
          />
        ) : (
          <div className="captcha-placeholder">
            <span>点击获取验证码</span>
          </div>
        )}
        <div className="captcha-refresh-hint">
          点击刷新
        </div>
      </div>
    </div>
  );
}
