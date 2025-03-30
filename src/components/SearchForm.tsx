import React, { useState } from 'react';

interface UserLocation {
    lat: number;
    lng: number;
}

interface UserPreferences {
    distanceWeight: number;
    usageWeight: number;
    priceWeight: number;
    preferenceWeight: number;
    favoriteIds: number[];
}

interface SearchParams {
    time: Date;
    location: UserLocation;
    preferences: UserPreferences;
}

interface SearchFormProps {
    onSearch: (params: SearchParams) => void;
}

const SearchForm: React.FC<SearchFormProps> = ({ onSearch }) => {
    const [time, setTime] = useState<Date>(new Date());
    const [location, setLocation] = useState<UserLocation>({ lat: 39.7286, lng: 116.1458 });
    const [preferences, setPreferences] = useState<UserPreferences>({
        distanceWeight: 0.4,
        usageWeight: 0.3,
        priceWeight: 0.2,
        preferenceWeight: 0.1,
        favoriteIds: []
    });

    // 处理表单提交
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSearch({
            time,
            location,
            preferences
        });
    };

    // 根据当前系统时间获取格式化的日期时间
    const getCurrentDateTime = (): string => {
        const now = new Date();
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const day = String(now.getDate()).padStart(2, '0');
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');

        return `${year}-${month}-${day}T${hours}:${minutes}`;
    };

    // 处理时间变化
    const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTime(new Date(e.target.value));
    };

    return (
        <div className="search-form">
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="time">停车时间:</label>
                    <input
                        type="datetime-local"
                        id="time"
                        value={getCurrentDateTime()}
                        onChange={handleTimeChange}
                    />
                </div>

                <div className="form-group">
                    <label>偏好设置:</label>
                    <div className="preferences">
                        <div>
                            <label htmlFor="distanceWeight">距离重要性:</label>
                            <input
                                type="range"
                                id="distanceWeight"
                                min="0"
                                max="1"
                                step="0.1"
                                value={preferences.distanceWeight}
                                onChange={(e) => setPreferences({
                                    ...preferences,
                                    distanceWeight: parseFloat(e.target.value)
                                })}
                            />
                            <span>{preferences.distanceWeight}</span>
                        </div>

                        <div>
                            <label htmlFor="usageWeight">空位重要性:</label>
                            <input
                                type="range"
                                id="usageWeight"
                                min="0"
                                max="1"
                                step="0.1"
                                value={preferences.usageWeight}
                                onChange={(e) => setPreferences({
                                    ...preferences,
                                    usageWeight: parseFloat(e.target.value)
                                })}
                            />
                            <span>{preferences.usageWeight}</span>
                        </div>

                        <div>
                            <label htmlFor="priceWeight">价格重要性:</label>
                            <input
                                type="range"
                                id="priceWeight"
                                min="0"
                                max="1"
                                step="0.1"
                                value={preferences.priceWeight}
                                onChange={(e) => setPreferences({
                                    ...preferences,
                                    priceWeight: parseFloat(e.target.value)
                                })}
                            />
                            <span>{preferences.priceWeight}</span>
                        </div>
                    </div>
                </div>

                <button type="submit" className="search-button">查找停车位</button>
            </form>
        </div>
    );
}

export default SearchForm; 