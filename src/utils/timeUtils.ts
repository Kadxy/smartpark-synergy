/**
 * 格式化日期时间
 * 
 * @param {Date} date - 日期对象
 * @returns {string} 格式化后的日期时间字符串 (YYYY-MM-DD HH:MM)
 */
export function formatDateTime(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  
  return `${year}-${month}-${day} ${hours}:${minutes}`;
}

/**
 * 获取当前时间的小时
 * 
 * @param {Date} date - 日期对象
 * @returns {number} 小时数 (0-23)
 */
export function getHour(date: Date): number {
  return date.getHours();
}

/**
 * 获取时间段描述
 * 
 * @param {number} hour - 小时数 (0-23)
 * @returns {string} 时间段描述
 */
export function getTimeDescription(hour: number): string {
  if (hour >= 0 && hour < 6) return '凌晨';
  if (hour >= 6 && hour < 9) return '早高峰';
  if (hour >= 9 && hour < 12) return '上午';
  if (hour >= 12 && hour < 14) return '中午';
  if (hour >= 14 && hour < 17) return '下午';
  if (hour >= 17 && hour < 20) return '晚高峰';
  return '夜间';
} 