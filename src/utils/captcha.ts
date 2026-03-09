/**
 * 验证码工具函数
 */

export interface CaptchaData {
  canvas: string; // Base64 编码的 canvas 图片
  captchaId: string; // 验证码 ID
}

/**
 * 生成随机字符（数字 + 大小写字母）
 */
export function generateRandomChar(): string {
  const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
  return chars.charAt(Math.floor(Math.random() * chars.length));
}

/**
 * 生成随机颜色
 */
export function generateRandomColor(dark: boolean = false): string {
  if (dark) {
    // 深色背景
    const r = Math.floor(Math.random() * 50);
    const g = Math.floor(Math.random() * 50);
    const b = Math.floor(Math.random() * 50);
    return `rgb(${r},${g},${b})`;
  } else {
    // 浅色干扰线
    const r = Math.floor(Math.random() * 150 + 50);
    const g = Math.floor(Math.random() * 150 + 50);
    const b = Math.floor(Math.random() * 150 + 50);
    return `rgb(${r},${g},${b})`;
  }
}

/**
 * 生成随机数（用于干扰线和噪点）
 */
export function random(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * 绘制验证码图片
 * @param length 验证码长度（默认 4 位）
 * @returns CaptchaData
 */
export function drawCaptcha(length: number = 4): CaptchaData {
  const width = 120;
  const height = 40;
  
  // 创建 canvas
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  
  if (!ctx) {
    throw new Error('无法获取 canvas 上下文');
  }
  
  // 1. 填充背景（深色）
  ctx.fillStyle = generateRandomColor(true);
  ctx.fillRect(0, 0, width, height);
  
  // 2. 绘制干扰线
  for (let i = 0; i < 5; i++) {
    ctx.strokeStyle = generateRandomColor();
    ctx.beginPath();
    ctx.moveTo(random(0, width), random(0, height));
    ctx.lineTo(random(0, width), random(0, height));
    ctx.stroke();
  }
  
  // 3. 绘制干扰点
  for (let i = 0; i < 50; i++) {
    ctx.fillStyle = generateRandomColor();
    ctx.beginPath();
    ctx.arc(random(0, width), random(0, height), random(1, 2), 0, 2 * Math.PI);
    ctx.fill();
  }
  
  // 4. 生成验证码文本
  let captchaText = '';
  for (let i = 0; i < length; i++) {
    captchaText += generateRandomChar();
  }
  
  // 5. 绘制验证码字符
  const chars = captchaText.split('');
  const charWidth = width / (length + 1);
  
  chars.forEach((char, index) => {
    ctx.save();
    
    // 随机字体大小（20-28px）
    const fontSize = random(20, 28);
    ctx.font = `bold ${fontSize}px Arial`;
    
    // 随机颜色（亮色）
    ctx.fillStyle = `rgb(${random(150, 255)},${random(150, 255)},${random(150, 255)})`;
    
    // 随机旋转角度（-30 到 30 度）
    const angle = (Math.random() - 0.5) * 0.5;
    const x = charWidth * (index + 1);
    const y = height / 2 + fontSize / 3;
    
    ctx.translate(x, y);
    ctx.rotate(angle);
    ctx.fillText(char, 0, 0);
    
    ctx.restore();
  });
  
  // 6. 绘制干扰曲线
  for (let i = 0; i < 3; i++) {
    ctx.strokeStyle = generateRandomColor();
    ctx.beginPath();
    const startX = random(0, width / 2);
    const startY = random(0, height);
    ctx.moveTo(startX, startY);
    
    const cp1X = startX + random(20, 40);
    const cp1Y = random(0, height);
    const cp2X = startX + random(40, 60);
    const cp2Y = random(0, height);
    const endX = startX + random(60, 80);
    const endY = random(0, height);
    
    ctx.bezierCurveTo(cp1X, cp1Y, cp2X, cp2Y, endX, endY);
    ctx.stroke();
  }
  
  // 7. 转换为 Base64
  const canvasData = canvas.toDataURL('image/png');
  
  // 生成验证码 ID（模拟）
  const captchaId = `captcha_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  
  return {
    canvas: canvasData,
    captchaId
  };
}

/**
 * 验证验证码（前端简单验证，实际验证应在后端）
 * @param input 用户输入的验证码
 * @param correctCaptcha 正确的验证码文本（实际应从后端获取）
 */
export function validateCaptcha(input: string, correctCaptcha: string): boolean {
  return input.toLowerCase() === correctCaptcha.toLowerCase();
}
