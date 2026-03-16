import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button, Modal, Input, SliderCaptcha } from "@/components/common";
import { useToast } from "@/hooks/useToast";
import { authService } from "@/services/authService";
import "./index.css";

export interface HeaderProps {
  isLoggedIn: boolean;
  onLogin: () => void;
  onLogout: () => void;
}

export function Header({ isLoggedIn, onLogin, onLogout }: HeaderProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const toast = useToast();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [isRegisterMode, setIsRegisterMode] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [activeTab, setActiveTab] = useState("case");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [nickname, setNickname] = useState(""); // 昵称
  const [loginCaptchaImage, setLoginCaptchaImage] = useState(""); // 登录验证码图片
  const [loginCaptchaVerification, setLoginCaptchaVerification] = useState(""); // 登录验证码答案
  const [registerCaptchaImage, setRegisterCaptchaImage] = useState(""); // 注册验证码图片
  const [registerCaptchaVerification, setRegisterCaptchaVerification] =
    useState(""); // 注册验证码答案
  const [loginCaptchaSuccess, setLoginCaptchaSuccess] = useState(false); // 登录验证码是否通过
  const [registerCaptchaSuccess, setRegisterCaptchaSuccess] = useState(false); // 注册验证码是否通过

  useEffect(() => {
    const path = location.pathname;
    if (path === "/case" || path === "/") {
      setActiveTab("case");
    } else if (path === "/projects") {
      setActiveTab("projects");
    } else if (path === "/works") {
      setActiveTab("works");
    } else if (path === "/personal-assets") {
      setActiveTab("personal");
    }
  }, [location.pathname]);

  const isWhiteHeader =
    location.pathname === "/case" ||
    location.pathname === "/works" ||
    location.pathname === "/personal-assets";

  const whiteHeaderThemeVars = isWhiteHeader
    ? ({
        // 与全局品牌色保持一致：粉色 + 青色，用于导航栏渐变
        "--secondary-color": "#53B76F",
        "--secondary-rgb": "83, 183, 111",
        "--accent-color": "#FFE4F0",
        "--accent-rgb": "255, 228, 240",
      } as React.CSSProperties)
    : undefined;

  // 打开登录弹窗时获取验证码
  useEffect(() => {
    if (showLoginModal && !isRegisterMode) {
      loadLoginCaptcha();
    }
  }, [showLoginModal, isRegisterMode]);

  // 打开注册弹窗时获取验证码
  useEffect(() => {
    if (showLoginModal && isRegisterMode) {
      loadRegisterCaptcha();
    }
  }, [showLoginModal, isRegisterMode]);

  // 获取登录验证码
  const loadLoginCaptcha = async () => {
    try {
      const data = await authService.getCaptcha();
      setLoginCaptchaImage(data.originalImageBase64); // 保存图片用于显示
      setLoginCaptchaVerification(data.captchaVerification); // 保存答案用于登录
    } catch (err) {
      console.error("获取验证码失败:", err);
      // 没有后端时，显示友好提示
      setLoginCaptchaImage(""); // 清空图片
      setLoginCaptchaVerification(""); // 清空答案
      // toast.error('验证码服务未连接，请检查后端是否启动');
    }
  };

  // 获取注册验证码
  const loadRegisterCaptcha = async () => {
    try {
      const data = await authService.getCaptcha();
      setRegisterCaptchaImage(data.originalImageBase64); // 保存图片用于显示
      setRegisterCaptchaVerification(data.captchaVerification); // 保存答案用于注册
    } catch (err) {
      console.error("获取验证码失败:", err);
      // 没有后端时，显示友好提示
      setRegisterCaptchaImage(""); // 清空图片
      setRegisterCaptchaVerification(""); // 清空答案
      // toast.error('验证码服务未连接，请检查后端是否启动');
    }
  };

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    if (!username.trim()) {
      setError("请输入用户名");
      return;
    }

    if (!nickname.trim() && isRegisterMode) {
      setError("请输入昵称");
      return;
    }

    if (!password.trim()) {
      setError("请输入密码");
      return;
    }

    if (!loginCaptchaVerification || !loginCaptchaSuccess) {
      setError("请先完成滑块验证");
      return;
    }

    setIsLoading(true);

    try {
      // 调用后端 API 登录（带验证码）
      await authService.login(username, password, loginCaptchaVerification);
      onLogin();
      setShowLoginModal(false);
      setUsername("");
      setPassword("");
      setError("");
      toast.success("登录成功！");
    } catch (err: unknown) {
      console.error("登录失败:", err);
      // 登录失败后刷新验证码
      loadLoginCaptcha();
      setLoginCaptchaSuccess(false);
      const msg =
        err instanceof Error ? err.message : "登录失败，请检查用户名和密码";
      setError(msg);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    if (!username.trim()) {
      setError("请输入用户名");
      return;
    }

    if (!password.trim()) {
      setError("请输入密码");
      return;
    }

    if (password.length < 6) {
      setError("密码长度至少为 6 位");
      return;
    }

    if (password !== confirmPassword) {
      setError("两次输入的密码不一致");
      return;
    }

    if (!registerCaptchaVerification || !registerCaptchaSuccess) {
      setError("请先完成滑块验证");
      return;
    }

    setIsLoading(true);

    try {
      // 调用后端 API 注册（带验证码）
      await authService.register(
        username,
        password,
        confirmPassword,
        nickname,
        registerCaptchaVerification,
      );
      toast.success("注册成功！请登录");
      setIsRegisterMode(false);
      setPassword("");
      setConfirmPassword("");
      setNickname("");
      setRegisterCaptchaSuccess(false);
      setError("");
    } catch (err: unknown) {
      console.error("注册失败:", err);
      // 注册失败后刷新验证码
      loadRegisterCaptcha();
      setRegisterCaptchaSuccess(false);
      const msg = err instanceof Error ? err.message : "注册失败，请稍后重试";
      setError(msg);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLoginClick = () => {
    setShowLoginModal(true);
    setIsRegisterMode(false);
    setError("");
  };

  const handleLogoutClick = () => {
    onLogout();
  };

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    if (tab === "case") {
      navigate("/case");
    } else if (tab === "works") {
      navigate("/works");
    } else if (tab === "personal") {
      navigate("/personal-assets");
    } else if (tab === "projects") {
      navigate("/projects");
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const switchToRegister = () => {
    setIsRegisterMode(true);
    setError("");
  };

  const switchToLogin = () => {
    setIsRegisterMode(false);
    setError("");
  };

  const closeModal = () => {
    setShowLoginModal(false);
    setIsRegisterMode(false);
    setError("");
    setUsername("");
    setPassword("");
    setConfirmPassword("");
    setNickname("");
    setLoginCaptchaSuccess(false);
    setRegisterCaptchaSuccess(false);
  };

  return (
    <>
      <header
        className={`header ${isWhiteHeader ? "header--white" : ""}`}
        style={whiteHeaderThemeVars}
      >
        <div className="logo">
          <h1>AI 漫剧生成平台</h1>
        </div>
        <div className="nav-buttons">
          <button
            className={`nav-btn ${activeTab === "case" ? "active" : ""}`}
            onClick={() => handleTabChange("case")}
          >
            案例广场
          </button>
          {isLoggedIn && (
            <button
              className={`nav-btn ${activeTab === "projects" ? "active" : ""}`}
              onClick={() => handleTabChange("projects")}
            >
              项目管理
            </button>
          )}
          <button
            className={`nav-btn ${activeTab === "works" ? "active" : ""}`}
            onClick={() => handleTabChange("works")}
          >
            我的作品
          </button>
          <button
            className={`nav-btn ${activeTab === "personal" ? "active" : ""}`}
            onClick={() => handleTabChange("personal")}
          >
            个人资产库
          </button>
        </div>
        <div className="header-right">
          {isLoggedIn ? (
            <Button
              variant="danger"
              size="small"
              onClick={handleLogoutClick}
              className="logout-btn"
            >
              退出登录
            </Button>
          ) : (
            <Button
              variant="ghost"
              size="small"
              onClick={handleLoginClick}
              className="user-btn"
            >
              登录
            </Button>
          )}
        </div>
      </header>

      <Modal
        isOpen={showLoginModal}
        onClose={closeModal}
        title={isRegisterMode ? "注册新账号" : "欢迎登录 AI 漫剧生成平台"}
        size="small"
        footer={null}
      >
        <form
          className="login-form"
          onSubmit={isRegisterMode ? handleRegister : handleLogin}
        >
          <Input
            label="用户名"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="请输入用户名"
            disabled={isLoading}
            autoComplete="username"
            required
          />

          {isRegisterMode && (
            <Input
              label="昵称"
              type="text"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              placeholder="请输入昵称"
              disabled={isLoading}
              autoComplete="nickname"
              required
            />
          )}

          <div style={{ position: "relative" }}>
            <Input
              label="密码"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder={
                isRegisterMode ? "请输入密码（至少6位）" : "请输入密码"
              }
              disabled={isLoading}
              autoComplete={
                isRegisterMode ? "new-password" : "current-password"
              }
              required
            />
            <button
              type="button"
              className="password-toggle"
              onClick={togglePasswordVisibility}
              tabIndex={-1}
              aria-label={showPassword ? "隐藏密码" : "显示密码"}
            >
              {showPassword ? (
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                  <line x1="1" y1="1" x2="23" y2="23" />
                </svg>
              ) : (
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
              )}
            </button>
          </div>

          {isRegisterMode && (
            <div style={{ position: "relative" }}>
              <Input
                label="确认密码"
                type={showConfirmPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="请再次输入密码"
                disabled={isLoading}
                autoComplete="new-password"
                required
              />
              <button
                type="button"
                className="password-toggle"
                onClick={toggleConfirmPasswordVisibility}
                tabIndex={-1}
                aria-label={showConfirmPassword ? "隐藏密码" : "显示密码"}
              >
                {showConfirmPassword ? (
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                    <line x1="1" y1="1" x2="23" y2="23" />
                  </svg>
                ) : (
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                )}
              </button>
            </div>
          )}

          {/* 滑块验证码（登录和注册都需要） */}
          <div className="captcha-input-group">
            <div className="captcha-input-label">滑动验证</div>
            <SliderCaptcha
              captchaImage={
                isRegisterMode ? registerCaptchaImage : loginCaptchaImage
              }
              captchaVerification={
                isRegisterMode
                  ? registerCaptchaVerification
                  : loginCaptchaVerification
              }
              onSuccess={(verification) => {
                if (isRegisterMode) {
                  setRegisterCaptchaSuccess(true);
                  setRegisterCaptchaVerification(verification);
                } else {
                  setLoginCaptchaSuccess(true);
                  setLoginCaptchaVerification(verification);
                }
              }}
              onRefresh={
                isRegisterMode ? loadRegisterCaptcha : loadLoginCaptcha
              }
              disabled={isLoading}
            />
          </div>

          {error && <div className="login-error">{error}</div>}

          {!isRegisterMode && (
            <div className="form-options">
              <label className="checkbox-label">
                <input type="checkbox" disabled={isLoading} />
                记住我
              </label>
              <a href="#" className="forgot-password">
                忘记密码？
              </a>
            </div>
          )}

          <Button
            type="submit"
            variant="primary"
            className="login-btn"
            disabled={isLoading}
          >
            {isLoading
              ? isRegisterMode
                ? "注册中..."
                : "登录中..."
              : isRegisterMode
                ? "注册"
                : "登录"}
          </Button>

          <div className="register-link">
            {isRegisterMode ? (
              <>
                已有账号？
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    switchToLogin();
                  }}
                >
                  立即登录
                </a>
              </>
            ) : (
              <>
                还没有账号？
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    switchToRegister();
                  }}
                >
                  立即注册
                </a>
              </>
            )}
          </div>
        </form>
      </Modal>
    </>
  );
}
