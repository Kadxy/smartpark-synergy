interface Point {
  lat: number;
  lng: number;
}

/**
 * 计算两个坐标点之间的距离（米）
 * 使用Haversine公式计算
 * 
 * @param {Point} point1 - 第一个坐标点 {lat, lng}
 * @param {Point} point2 - 第二个坐标点 {lat, lng}
 * @returns {number} 距离，单位：米
 */
export function calculateDistance(point1: Point, point2: Point): number {
  const R = 6371000; // 地球半径，单位：米
  const dLat = toRad(point2.lat - point1.lat);
  const dLng = toRad(point2.lng - point1.lng);
  
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(toRad(point1.lat)) * Math.cos(toRad(point2.lat)) * 
    Math.sin(dLng/2) * Math.sin(dLng/2);
  
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  const distance = R * c;
  
  return distance;
}

/**
 * 将角度转换为弧度
 * 
 * @param {number} degrees - 角度值
 * @returns {number} 弧度值
 */
function toRad(degrees: number): number {
  return degrees * Math.PI / 180;
} 