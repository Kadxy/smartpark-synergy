import React from 'react';

function Map({ userLocation, parkingLots }) {
  return (
    <div className="map-container">
      <div className="map-placeholder">
        <h3>地图显示</h3>
        <p>这里将显示地图视图，展示用户位置和停车场。</p>
        <p>当前位置: 纬度 {userLocation.lat.toFixed(4)}°, 经度 {userLocation.lng.toFixed(4)}°</p>
        
        {parkingLots && parkingLots.length > 0 && (
          <div className="parking-markers">
            <p>停车场数量: {parkingLots.length}</p>
            <ul>
              {parkingLots.slice(0, 3).map(lot => (
                <li key={lot.id}>
                  {lot.name} - 距离: {lot.distance}米
                </li>
              ))}
              {parkingLots.length > 3 && <li>...</li>}
            </ul>
          </div>
        )}
        
        <p className="map-note">
          注: 实际项目中可以集成高德地图、百度地图或其他地图API
        </p>
      </div>
    </div>
  );
}

export default Map; 
 