import { apiClient } from './api';

/**
 * 验证码接口返回的数据
 */
interface CaptchaResponse {
  captchaVerification: string;  // 验证码答案（加密的）
  originalImageBase64: string;  // 验证码图片（Base64）
  result?: boolean;             // 是否成功
  [key: string]: any;           // 允许其他字段
}

/**
 * 登录接口返回的数据
 */
interface LoginResponse {
  token?: string;               // 登录令牌（可能返回）
  [key: string]: any;           // 允许其他字段（如 user、code、msg 等）
}

/**
 * 获取当前用户信息返回的数据
 */
interface AuthMeResponse {
  id?: string;
  username?: string;
  [key: string]: any;           // 允许其他字段
}

export const authService = {
  /**
   * 获取验证码图片
   * 调用后端接口：POST /zhihuan-server/admin-api/system/captcha/get
   */
  async getCaptcha(): Promise<{ 
    captchaVerification: string;  // 验证码答案（登录时要传给后端）
    originalImageBase64: string;  // 验证码图片（Base64 格式，显示给用户看）
  }> {
    const response = await apiClient.post('/zhihuan-server/admin-api/system/captcha/get', {
      captchaType: 'blockPuzzle'  // 拼图验证码
    });
    return response as any;
  },

  /**
   * 登录（带验证码）
   * 调用后端接口：POST /zhihuan-server/admin-api/system/auth/login
   */
  async login(
    username: string, 
    password: string, 
    captchaVerification: string  // 验证码答案（从 getCaptcha 获取）
  ): Promise<LoginResponse> {
    const response = await apiClient.post<LoginResponse>('/zhihuan-server/admin-api/system/auth/login', { 
      username, 
      password,
      captchaVerification,  // 传给后端验证
      remenberMe: true      // 记住登录状态
    });
    const data = response as unknown as LoginResponse;
    if (data.token) {
      localStorage.setItem('token', data.token);
    }
    return data;
  },

  /**
   * 注册（带验证码）
   * 调用后端接口：POST /zhihuan-server/admin-api/system/auth/register
   */
  async register(
    username: string, 
    password: string, 
    confirmPassword: string,
    nickname: string,
    captchaVerification: string  // 验证码答案（从 getCaptcha 获取）
  ): Promise<void> {
    await apiClient.post('/zhihuan-server/admin-api/system/auth/register', { 
      tenantName: '幻织源码',
      username, 
      nickname,
      password, 
      confirmPassword,
      captchaVerification,
      tenantId: 1
    });
  },

  async logout(): Promise<void> {
    await apiClient.post('/auth/logout');
    localStorage.removeItem('token');
  },

  async getCurrentUser(): Promise<AuthMeResponse> {
    const response = await apiClient.get<AuthMeResponse>('/auth/me');
    return response as unknown as AuthMeResponse;
  }
};
