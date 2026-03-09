// 统一的 localStorage 操作工具

/**
 * 从 localStorage 加载数据
 * @param key 存储键名
 * @param fallback 默认值（加载失败时返回）
 * @returns 解析后的数据或默认值
 */
export function loadFromStorage<T>(key: string, fallback: T): T {
  try {
    const stored = localStorage.getItem(key);
    if (stored !== null) {
      return JSON.parse(stored);
    }
  } catch (e) {
    console.error(`Failed to load ${key} from localStorage:`, e);
  }
  return fallback;
}

/**
 * 保存数据到 localStorage
 * @param key 存储键名
 * @param value 要保存的值
 */
export function saveToStorage<T>(key: string, value: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.error(`Failed to save ${key} to localStorage:`, e);
  }
}

/**
 * 从 localStorage 移除数据
 * @param key 要移除的键名
 */
export function removeFromStorage(key: string): void {
  try {
    localStorage.removeItem(key);
  } catch (e) {
    console.error(`Failed to remove ${key} from localStorage:`, e);
  }
}

/**
 * 清空所有 localStorage 数据
 */
export function clearStorage(): void {
  try {
    localStorage.clear();
  } catch (e) {
    console.error('Failed to clear localStorage:', e);
  }
}
