import React from 'react';
import { usageByTime } from '../data/usageData';

interface UsageChartProps {
    parkingId?: number; // 可选参数，未来用于显示特定停车场的数据
}

const UsageChart: React.FC<UsageChartProps> = () => {
    // 生成24小时数据点
    const hours = [...Array(24).keys()];

    // 获取小时标签（每3小时一个标签）
    const getHourLabel = (hour: number): string => {
        if (hour % 3 === 0) {
            return `${hour}:00`;
        }
        return '';
    };

    // 根据使用率获取样式颜色
    const getUsageColor = (usage: number): string => {
        if (usage < 50) return '#4CAF50'; // 绿色 - 空闲
        if (usage < 80) return '#FFC107'; // 黄色 - 适中
        return '#F44336'; // 红色 - 拥挤
    };

    return (
        <div className="usage-chart">
            <h3>全天停车位使用率趋势</h3>

            <div className="chart-container">
                <div className="chart-y-axis">
                    <div className="y-label">100%</div>
                    <div className="y-label">75%</div>
                    <div className="y-label">50%</div>
                    <div className="y-label">25%</div>
                    <div className="y-label">0%</div>
                </div>

                <div className="chart-bars">
                    {hours.map((hour) => (
                        <div key={hour} className="bar-container">
                            <div
                                className="bar"
                                style={{
                                    height: `${usageByTime[hour.toString()]}%`,
                                    backgroundColor: getUsageColor(usageByTime[hour.toString()])
                                }}
                            />
                            <div className="hour-label">{getHourLabel(hour)}</div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="chart-legend">
                <div className="legend-item">
                    <span className="legend-color" style={{ backgroundColor: '#4CAF50' }}></span>
                    <span>空闲 (&lt;50%)</span>
                </div>
                <div className="legend-item">
                    <span className="legend-color" style={{ backgroundColor: '#FFC107' }}></span>
                    <span>适中 (50-80%)</span>
                </div>
                <div className="legend-item">
                    <span className="legend-color" style={{ backgroundColor: '#F44336' }}></span>
                    <span>拥挤 (&gt;80%)</span>
                </div>
            </div>
        </div>
    );
}

export default UsageChart; 