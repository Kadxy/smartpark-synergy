import { parkingLots } from '../data/parkingData';
import { parkingUsage } from '../data/usageData';

export function useRecommendation() {
  const getRecommendations = (time, userLocation, preferences = {}) => {
    // 获取当前小时
    const hour = new Date(time).getHours();
    
    // 权重设置（可通过preferences调整）
    const weights = {
      distance: preferences.distanceWeight || 0.4,  // 距离权重
      usage: preferences.usageWeight || 0.3,        // 使用率权重
      price: preferences.priceWeight || 0.2,        // 价格权重
      preference: preferences.preferenceWeight || 0.1 // 用户偏好权重
    };
    
    // 计算每个停车场的得分
    const scoredParkingLots = parkingLots.map(lot => {
      // 使用率因子(越低越好)
      const currentUsage = parkingUsage.find(p => p.id === lot.id)?.usage[hour] || 50;
      const usageFactor = 1 - (currentUsage / 100);
      
      // 距离因子(越近越好)
      const maxDistance = 1000; // 最大考虑距离1km
      const distanceFactor = 1 - Math.min(lot.distance / maxDistance, 1);
      
      // 价格因子(越便宜越好)
      const maxPrice = Math.max(...parkingLots.map(p => p.hourlyRate));
      const priceFactor = 1 - (lot.hourlyRate / maxPrice);
      
      // 用户偏好因子(简化处理)
      const preferenceFactor = preferences.favoriteIds?.includes(lot.id) ? 1 : 0.5;
      
      // 计算总分
      const score = 
        weights.distance * distanceFactor + 
        weights.usage * usageFactor + 
        weights.price * priceFactor + 
        weights.preference * preferenceFactor;
        
      return {
        ...lot,
        currentUsage,
        score
      };
    });
    
    // 按分数排序并返回
    return scoredParkingLots.sort((a, b) => b.score - a.score);
  };
  
  return { getRecommendations };
} 