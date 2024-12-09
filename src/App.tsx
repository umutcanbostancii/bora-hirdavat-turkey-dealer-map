import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import styled from 'styled-components';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import dealersData from './data/updated_dealers.json';
import { Dealer } from './types';

// Leaflet ikon tanımlaması
const customIcon = new L.Icon({
  iconUrl: '/marker-icon.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

// Styled components tanımlamaları
const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  background: #f0f2f5;
`;

const Header = styled.header`
  background: #fff;
  padding: 1rem;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
`;

const SearchContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  display: flex;
  gap: 1rem;
`;

const SearchInput = styled.input`
  padding: 0.75rem;
  border: 1px solid #e1e4e8;
  border-radius: 4px;
  flex: 1;
  font-size: 1rem;
  
  &:focus {
    outline: none;
    border-color: #0366d6;
    box-shadow: 0 0 0 3px rgba(3,102,214,0.3);
  }
`;

const SearchButton = styled.button`
  padding: 0.75rem 1.5rem;
  background: #0366d6;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 500;
  
  &:hover {
    background: #0256b4;
  }
  
  &:active {
    transform: translateY(1px);
  }
`;

const MapWrapper = styled.div`
  flex: 1;
  position: relative;
  margin: 1rem;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
`;

const StatsContainer = styled.div`
  background: #fff;
  padding: 1rem;
  margin: 0 1rem 1rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  display: flex;
  justify-content: space-around;
`;

const StatItem = styled.div`
  text-align: center;
  
  h3 {
    margin: 0;
    color: #0366d6;
    font-size: 1.5rem;
  }
  
  p {
    margin: 0.5rem 0 0;
    color: #586069;
  }
`;

function App() {
  const [searchCity, setSearchCity] = useState<string>('');
  const [filteredDealers, setFilteredDealers] = useState<Dealer[]>(dealersData.dealers);

  const handleSearch = () => {
    if (!searchCity.trim()) {
      setFilteredDealers(dealersData.dealers);
      return;
    }

    const filtered = dealersData.dealers.filter(dealer =>
      dealer.city.toLowerCase().includes(searchCity.toLowerCase())
    );
    setFilteredDealers(filtered);
  };

  const bounds: L.LatLngBoundsExpression = [
    [35.9025, 25.9125], // Güneybatı köşesi
    [42.0266, 44.5875]  // Kuzeydoğu köşesi
  ];

  return (
    <AppContainer>
      <Header>
        <SearchContainer>
          <SearchInput
            type="text"
            placeholder="Şehir ara..."
            value={searchCity}
            onChange={(e) => setSearchCity(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
          />
          <SearchButton onClick={handleSearch}>Ara</SearchButton>
        </SearchContainer>
      </Header>

      <StatsContainer>
        <StatItem>
          <h3>{dealersData.dealers.length}</h3>
          <p>Toplam Bayi</p>
        </StatItem>
        <StatItem>
          <h3>{dealersData.cities.length}</h3>
          <p>Şehir</p>
        </StatItem>
        <StatItem>
          <h3>{filteredDealers.length}</h3>
          <p>Gösterilen Bayi</p>
        </StatItem>
      </StatsContainer>
      
      <MapWrapper>
        <MapContainer
          bounds={bounds}
          style={{ height: '100%', width: '100%' }}
          zoomControl={true}
          minZoom={6}
          maxZoom={10}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          />
          
          {filteredDealers.map((dealer, index) => (
            <Marker
              key={index}
              position={[dealer.latitude, dealer.longitude]}
              icon={customIcon}
            >
              <Popup>
                <div>
                  <h3>{dealer.name}</h3>
                  <p>Şehir: {dealer.city}</p>
                  <p>İlçe: {dealer.district}</p>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </MapWrapper>
    </AppContainer>
  );
}

export default App; 