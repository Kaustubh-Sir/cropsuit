// pages/SeasonalPlanning.jsx
import React, { useState } from "react";
import Navbar from "../components/Navbar";
import "../App.css";

function SeasonalPlanning() {
  const [selectedSeason, setSelectedSeason] = useState(null);

  const seasonData = {
    kharif: {
      name: "Kharif Season",
      icon: "🌧️",
      period: "June - October",
      description: "Monsoon season with high rainfall, ideal for water-intensive crops",
      color: "#4CAF50",
      crops: [
        { name: "Rice", yield: "25-30 quintals/acre", duration: "120-150 days", water: "High", profit: "₹40,000-₹50,000" },
        { name: "Cotton", yield: "15-20 quintals/acre", duration: "150-180 days", water: "Moderate", profit: "₹60,000-₹80,000" },
        { name: "Maize", yield: "30-35 quintals/acre", duration: "90-110 days", water: "Moderate", profit: "₹35,000-₹45,000" },
        { name: "Soybean", yield: "20-25 quintals/acre", duration: "90-120 days", water: "Moderate", profit: "₹45,000-₹60,000" },
        { name: "Sugarcane", yield: "300-400 quintals/acre", duration: "12-18 months", water: "Very High", profit: "₹1,00,000-₹1,50,000" },
        { name: "Millets", yield: "20-25 quintals/acre", duration: "90-120 days", water: "Low", profit: "₹30,000-₹40,000" },
      ],
      tips: [
        "Prepare fields before monsoon arrives",
        "Ensure proper drainage to prevent waterlogging",
        "Monitor for pest attacks during humid conditions",
        "Use disease-resistant crop varieties"
      ],
      weather: {
        temp: "25-35°C",
        rainfall: "High (700-1200mm)",
        humidity: "70-90%"
      }
    },
    rabi: {
      name: "Rabi Season",
      icon: "❄️",
      period: "November - April",
      description: "Winter season with moderate rainfall, suitable for temperate crops",
      color: "#2196F3",
      crops: [
        { name: "Wheat", yield: "35-40 quintals/acre", duration: "120-150 days", water: "Moderate", profit: "₹50,000-₹65,000" },
        { name: "Barley", yield: "25-30 quintals/acre", duration: "110-130 days", water: "Low", profit: "₹30,000-₹40,000" },
        { name: "Gram", yield: "15-20 quintals/acre", duration: "100-120 days", water: "Low", profit: "₹45,000-₹55,000" },
        { name: "Mustard", yield: "12-15 quintals/acre", duration: "110-140 days", water: "Low", profit: "₹40,000-₹50,000" },
        { name: "Peas", yield: "18-22 quintals/acre", duration: "90-110 days", water: "Moderate", profit: "₹35,000-₹45,000" },
        { name: "Potato", yield: "200-250 quintals/acre", duration: "90-120 days", water: "Moderate", profit: "₹80,000-₹1,00,000" },
      ],
      tips: [
        "Sow crops after monsoon ends for optimal moisture",
        "Protect crops from frost in extreme winter",
        "Apply fertilizers at right growth stages",
        "Irrigation critical during dry spells"
      ],
      weather: {
        temp: "10-25°C",
        rainfall: "Low (200-300mm)",
        humidity: "50-70%"
      }
    },
    zaid: {
      name: "Zaid Season",
      icon: "☀️",
      period: "April - June",
      description: "Summer season, best for quick-growing crops and vegetables",
      color: "#FF9800",
      crops: [
        { name: "Watermelon", yield: "200-250 quintals/acre", duration: "80-100 days", water: "High", profit: "₹70,000-₹90,000" },
        { name: "Cucumber", yield: "100-120 quintals/acre", duration: "50-70 days", water: "Moderate", profit: "₹50,000-₹60,000" },
        { name: "Muskmelon", yield: "150-180 quintals/acre", duration: "70-90 days", water: "Moderate", profit: "₹60,000-₹75,000" },
        { name: "Bitter Gourd", yield: "80-100 quintals/acre", duration: "60-80 days", water: "Moderate", profit: "₹55,000-₹70,000" },
        { name: "Tomato", yield: "250-300 quintals/acre", duration: "90-120 days", water: "Moderate", profit: "₹90,000-₹1,20,000" },
        { name: "Fodder Crops", yield: "300-350 quintals/acre", duration: "60-80 days", water: "Moderate", profit: "₹25,000-₹35,000" },
      ],
      tips: [
        "Ensure adequate irrigation in hot weather",
        "Mulching helps retain soil moisture",
        "Harvest early morning for better quality",
        "Quick market access essential for fresh produce"
      ],
      weather: {
        temp: "30-45°C",
        rainfall: "Very Low (50-100mm)",
        humidity: "40-60%"
      }
    }
  };

  return (
    <div style={{ width: '100%', minHeight: '100vh', margin: 0, padding: 0, background: '#f5f5f5' }}>
      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <section style={{
        width: '100%',
        background: 'linear-gradient(135deg, #00BCD4 0%, #4DD0E1 100%)',
        padding: '60px 20px',
        color: 'white'
      }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto', textAlign: 'center' }}>
          <h1 style={{ fontSize: '42px', marginBottom: '20px' }}>📅 Seasonal Crop Planning</h1>
          <p style={{ fontSize: '18px', opacity: 0.9 }}>
            Plan your farming activities across all three major Indian cropping seasons
          </p>
        </div>
      </section>

      {/* Season Selection */}
      <section style={{ width: '100%', padding: '60px 20px', background: 'white' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <h2 style={{ 
            textAlign: 'center', 
            color: '#00838f', 
            fontSize: '32px',
            marginBottom: '40px'
          }}>
            Select a Season to Plan
          </h2>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '30px'
          }}>
            {Object.keys(seasonData).map((seasonKey) => {
              const season = seasonData[seasonKey];
              return (
                <div
                  key={seasonKey}
                  onClick={() => setSelectedSeason(seasonKey)}
                  style={{
                    background: selectedSeason === seasonKey ? season.color : 'white',
                    color: selectedSeason === seasonKey ? 'white' : '#333',
                    border: `3px solid ${season.color}`,
                    borderRadius: '16px',
                    padding: '40px',
                    cursor: 'pointer',
                    textAlign: 'center',
                    transition: 'all 0.3s',
                    boxShadow: selectedSeason === seasonKey ? '0 8px 25px rgba(0,0,0,0.2)' : '0 2px 10px rgba(0,0,0,0.1)'
                  }}
                  onMouseEnter={(e) => {
                    if (selectedSeason !== seasonKey) {
                      e.currentTarget.style.transform = 'translateY(-5px)';
                      e.currentTarget.style.boxShadow = '0 8px 20px rgba(0,0,0,0.15)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (selectedSeason !== seasonKey) {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
                    }
                  }}
                >
                  <div style={{ fontSize: '64px', marginBottom: '20px' }}>{season.icon}</div>
                  <h3 style={{ fontSize: '28px', marginBottom: '10px' }}>{season.name}</h3>
                  <p style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '15px' }}>
                    {season.period}
                  </p>
                  <p style={{ fontSize: '14px', opacity: 0.9 }}>
                    {season.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Season Details */}
      {selectedSeason && (
        <>
          {/* Weather Conditions */}
          <section style={{ width: '100%', padding: '60px 20px', background: '#f5f5f5' }}>
            <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
              <h2 style={{ 
                textAlign: 'center', 
                color: seasonData[selectedSeason].color, 
                fontSize: '32px',
                marginBottom: '40px'
              }}>
                Weather Conditions
              </h2>
              
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                gap: '25px'
              }}>
                <div style={{
                  background: 'white',
                  borderRadius: '12px',
                  padding: '30px',
                  textAlign: 'center',
                  boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
                }}>
                  <div style={{ fontSize: '48px', marginBottom: '15px' }}>🌡️</div>
                  <h4 style={{ color: '#666', marginBottom: '10px' }}>Temperature</h4>
                  <div style={{ fontSize: '24px', fontWeight: 'bold', color: seasonData[selectedSeason].color }}>
                    {seasonData[selectedSeason].weather.temp}
                  </div>
                </div>

                <div style={{
                  background: 'white',
                  borderRadius: '12px',
                  padding: '30px',
                  textAlign: 'center',
                  boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
                }}>
                  <div style={{ fontSize: '48px', marginBottom: '15px' }}>🌧️</div>
                  <h4 style={{ color: '#666', marginBottom: '10px' }}>Rainfall</h4>
                  <div style={{ fontSize: '20px', fontWeight: 'bold', color: seasonData[selectedSeason].color }}>
                    {seasonData[selectedSeason].weather.rainfall}
                  </div>
                </div>

                <div style={{
                  background: 'white',
                  borderRadius: '12px',
                  padding: '30px',
                  textAlign: 'center',
                  boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
                }}>
                  <div style={{ fontSize: '48px', marginBottom: '15px' }}>💧</div>
                  <h4 style={{ color: '#666', marginBottom: '10px' }}>Humidity</h4>
                  <div style={{ fontSize: '24px', fontWeight: 'bold', color: seasonData[selectedSeason].color }}>
                    {seasonData[selectedSeason].weather.humidity}
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Recommended Crops */}
          <section style={{ width: '100%', padding: '60px 20px', background: 'white' }}>
            <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
              <h2 style={{ 
                textAlign: 'center', 
                color: seasonData[selectedSeason].color, 
                fontSize: '32px',
                marginBottom: '40px'
              }}>
                Recommended Crops
              </h2>
              
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                gap: '25px'
              }}>
                {seasonData[selectedSeason].crops.map((crop, index) => (
                  <div
                    key={index}
                    style={{
                      background: '#f5f5f5',
                      border: '2px solid #e0e0e0',
                      borderRadius: '12px',
                      padding: '25px',
                      transition: 'transform 0.3s'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-5px)';
                      e.currentTarget.style.boxShadow = '0 8px 20px rgba(0,0,0,0.15)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = 'none';
                    }}
                  >
                    <h3 style={{ 
                      color: seasonData[selectedSeason].color, 
                      fontSize: '22px', 
                      marginBottom: '15px' 
                    }}>
                      🌱 {crop.name}
                    </h3>
                    <div style={{ fontSize: '14px', lineHeight: '1.8', color: '#666' }}>
                      <p style={{ margin: '8px 0' }}><strong>Yield:</strong> {crop.yield}</p>
                      <p style={{ margin: '8px 0' }}><strong>Duration:</strong> {crop.duration}</p>
                      <p style={{ margin: '8px 0' }}><strong>Water Need:</strong> {crop.water}</p>
                      <p style={{ margin: '8px 0' }}><strong>Profit:</strong> {crop.profit}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Farming Tips */}
          <section style={{ width: '100%', padding: '60px 20px', background: '#f5f5f5' }}>
            <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
              <h2 style={{ 
                textAlign: 'center', 
                color: seasonData[selectedSeason].color, 
                fontSize: '32px',
                marginBottom: '40px'
              }}>
                Farming Tips for {seasonData[selectedSeason].name}
              </h2>
              
              <div style={{
                background: 'white',
                borderRadius: '12px',
                padding: '40px',
                boxShadow: '0 4px 15px rgba(0,0,0,0.1)'
              }}>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                  {seasonData[selectedSeason].tips.map((tip, index) => (
                    <li 
                      key={index}
                      style={{
                        padding: '15px 0',
                        borderBottom: index < seasonData[selectedSeason].tips.length - 1 ? '1px solid #e0e0e0' : 'none',
                        fontSize: '16px',
                        color: '#333'
                      }}
                    >
                      ✓ {tip}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>
        </>
      )}
    </div>
  );
}

export default SeasonalPlanning;