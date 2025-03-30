import React, { useState } from 'react';
import Header from '../components/Header';
import SearchForm from '../components/SearchForm';
import Map from '../components/Map';
import ParkingCard from '../components/ParkingCard';
import UsageChart from '../components/UsageChart';
import { useRecommendation } from '../hooks/useRecommendation';

function Home() {
  const [searchParams, setSearchParams] = useState({
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
  
  const [recommendations, setRecommendations] = useState([]);
  const { getRecommendations } = useRecommendation();
  
  const handleSearch = (params) => {
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
      <Header />
      
      <div className="main-content">
        <div className="search-section">
          <h2>查找停车位</h2>
          <SearchForm onSearch={handleSearch} />
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

export default Home; 