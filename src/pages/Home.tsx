import {useState} from 'react';
import Header from '../components/Header';
import SearchForm from '../components/SearchForm';
import Map, {ParkingLot} from '../components/Map';
import ParkingCard from '../components/ParkingCard';
import UsageChart from '../components/UsageChart';
import {useRecommendation} from '../hooks/useRecommendation';

interface SearchParams {
    time: Date;
    location: { lat: number; lng: number };
    preferences: {
        distanceWeight: number;
        usageWeight: number;
        priceWeight: number;
        preferenceWeight: number;
        favoriteIds: number[];
    };
}

interface Recommendation extends ParkingLot {
    id: number;
    name: string;
    distance: number; // 距离用户位置的距离
    hourlyRate: number; // 每小时费用
    currentUsage: number; // 当前使用率
    score: number; // 推荐分数
}

function Home() {
    const [searchParams, setSearchParams] = useState<SearchParams>({
        time: new Date(),
        location: {lat: 39.7286, lng: 116.1458},
        preferences: {
            distanceWeight: 0.4,
            usageWeight: 0.3,
            priceWeight: 0.2,
            preferenceWeight: 0.1,
            favoriteIds: []
        }
    });

    const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
    const {getRecommendations} = useRecommendation();

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
        <div className="home-page">
            <Header/>

            <div className="main-content">
                <div className="search-section">
                    <h2>查找停车位</h2>
                    <SearchForm onSearch={handleSearch}/>
                </div>

                <div className="map-section">
                    <Map
                        userLocation={searchParams.location}
                        parkingLots={recommendations}
                    />
                </div>

                {recommendations.length > 0 && (
                    <div className="results-section">
                        <h2>推荐停车场</h2>
                        <div className="recommendation-list">
                            {recommendations.map(lot => (
                                <ParkingCard
                                    key={lot.id}
                                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                                    // @ts-ignore
                                    parkingLot={lot as unknown as ParkingLot}
                                />
                            ))}
                        </div>
                    </div>
                )}

                <div className="chart-section">
                    <UsageChart/>
                </div>
            </div>
        </div>
    );
}

export default Home; 