import React from 'react';
import { useState } from 'react';
import './index.css';
import { parkingLots } from './data/parkingData';
import { parkingUsage } from './data/usageData';
import Header from './components/Header';
import SearchForm from './components/SearchForm';
import ParkingCard from './components/ParkingCard';
import UsageChart from './components/UsageChart';

// 定义接口
interface UserLocation {
    lat: number;
    lng: number;
}

interface UserPreferences {
    distanceWeight: number;
    usageWeight: number;
    priceWeight: number;
    preferenceWeight: number;
    favoriteIds?: number[];
}

interface SearchParams {
    time: Date;
    location: UserLocation;
    preferences: UserPreferences;
}

interface ParkingLot {
    id: number;
    name: string;
    location: UserLocation;
    totalSpaces: number;
    hourlyRate: number;
    distance: number;
    currentUsage?: number;  // 标记为可选字段
    score?: number;
}

const App: React.FC = () => {
    const [searchParams, setSearchParams] = useState<SearchParams>({
        time: new Date(),
        location: { lat: 39.7286, lng: 116.1458 },
        preferences: {
            distanceWeight: 0.4,
            usageWeight: 0.3,
            priceWeight: 0.2,
            preferenceWeight: 0.1,
            favoriteIds: []
        }
    });

    const [recommendations, setRecommendations] = useState<ParkingLot[]>([]);

    // 获取推荐停车场
    const getRecommendations = (time: Date, userLocation: UserLocation, preferences: UserPreferences): ParkingLot[] => {
        // 获取当前小时
        const hour = time.getHours();

        // 权重设置
        const weights = {
            distance: preferences.distanceWeight || 0.4,
            usage: preferences.usageWeight || 0.3,
            price: preferences.priceWeight || 0.2,
            preference: preferences.preferenceWeight || 0.1
        };

        // 计算每个停车场的得分
        const scoredParkingLots = parkingLots.map(lot => {
            // 使用率因子(越低越好)
            const currentUsage = parkingUsage.find(p => p.id === lot.id)?.usage[hour.toString()] || 50;
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
        return scoredParkingLots.sort((a, b) => (b.score || 0) - (a.score || 0));
    };

    const handleSearch = (params: SearchParams) => {
        setSearchParams(params);
        const results = getRecommendations(
            params.time,
            params.location,
            params.preferences
        );
        setRecommendations(results);
    };

    return (
        <div className="app-container">
            <Header />

            <div className="main-content">
                <div className="search-section">
                    <h2>查找停车位</h2>
                    <SearchForm onSearch={handleSearch} />
                </div>

                <div className="map-section">
                    <div className="map-placeholder">
                        <h3>地图显示</h3>
                        <p>这里将显示地图视图，展示用户位置和停车场。</p>
                        <p>当前位置: 纬度 {searchParams.location.lat.toFixed(4)}°, 经度 {searchParams.location.lng.toFixed(4)}°</p>
                    </div>
                </div>

                {recommendations.length > 0 && (
                    <div className="results-section">
                        <h2>推荐停车场</h2>
                        <div className="recommendation-list">
                            {recommendations.map(lot => (
                                <ParkingCard
                                    key={lot.id}
                                    parkingLot={lot}
                                />
                            ))}
                        </div>
                    </div>
                )}

                <div className="chart-section">
                    <UsageChart />
                </div>
            </div>
        </div>
    );
}

export default App; 