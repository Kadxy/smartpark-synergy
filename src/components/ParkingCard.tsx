import React from 'react';

interface ParkingLocation {
    lat: number;
    lng: number;
}

interface ParkingLot {
    id: number;
    name: string;
    location: ParkingLocation;
    totalSpaces: number;
    hourlyRate: number;
    distance: number;
    currentUsage: number;
    score?: number;
}

interface ParkingCardProps {
    parkingLot: ParkingLot;
}

const ParkingCard: React.FC<ParkingCardProps> = ({ parkingLot }) => {
    const { name, totalSpaces, hourlyRate, distance, currentUsage } = parkingLot;

    // 根据使用率计算剩余车位
    const remainingSpaces = Math.round(totalSpaces * (1 - currentUsage / 100));

    // 根据使用率确定颜色
    const getUsageColor = (usage: number): string => {
        if (usage < 50) return '#4CAF50'; // 绿色 - 空闲
        if (usage < 80) return '#FFC107'; // 黄色 - 适中
        return '#F44336'; // 红色 - 拥挤
    };

    // 格式化距离显示
    const formatDistance = (distance: number): string => {
        if (distance < 1000) {
            return `${distance}米`;
        } else {
            return `${(distance / 1000).toFixed(1)}公里`;
        }
    };

    return (
        <div className="parking-card">
            <h3>{name}</h3>

            <div className="parking-info">
                <div className="info-row">
                    <span className="info-label">距离:</span>
                    <span className="info-value">{formatDistance(distance)}</span>
                </div>

                <div className="info-row">
                    <span className="info-label">收费标准:</span>
                    <span className="info-value">¥{hourlyRate}/小时</span>
                </div>

                <div className="info-row">
                    <span className="info-label">总车位:</span>
                    <span className="info-value">{totalSpaces}个</span>
                </div>

                <div className="info-row">
                    <span className="info-label">剩余车位:</span>
                    <span className="info-value">{remainingSpaces}个</span>
                </div>
            </div>

            <div className="usage-indicator">
                <div className="usage-label">当前使用率: {currentUsage}%</div>
                <div className="usage-bar">
                    <div
                        className="usage-fill"
                        style={{
                            width: `${currentUsage}%`,
                            backgroundColor: getUsageColor(currentUsage)
                        }}
                    />
                </div>
            </div>

            <button className="navigate-button">导航前往</button>
        </div>
    );
}

export default ParkingCard; 