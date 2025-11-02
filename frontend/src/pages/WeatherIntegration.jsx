// pages/WeatherIntegration.jsx
import React, { useState } from "react";
import Navbar from "../components/Navbar";
import "../App.css";

function WeatherIntegration() {
  const [location, setLocation] = useState("");
  const [weatherData, setWeatherData] = useState(null);

  const handleSearch = (e) => {
    e.preventDefault();
    
    // Sample weather data
    const sampleWeather = {
      location: location,
      current: {
        temp: 28,
        humidity: 65,
        rainfall: 12,
        windSpeed: 15,
        condition: "Partly Cloudy"
      },
      forecast: [
        { day: "Today", temp: "28°C", condition: "Partly Cloudy", rain: "20%", icon: "⛅" },
        { day: "Tomorrow", temp: "30°C", condition: "Sunny", rain: "5%", icon: "☀️" },
        { day: "Wednesday", temp: "27°C", condition: "Rainy", rain: "80%", icon: "🌧️" },
        { day: "Thursday", temp: "26°C", condition: "Cloudy", rain: "40%", icon: "☁️" },
        { day: "Friday", temp: "29°C", condition: "Sunny", rain: "10%", icon: "☀️" },
        { day: "Saturday", temp: "31°C", condition: "Hot", rain: "0%", icon: "🌤️" },
        { day: "Sunday", temp: "28°C", condition: "Partly Cloudy", rain: "15%", icon: "⛅" },
      ],
      alerts: [
        { type: "warning", message: "Heavy rainfall expected on Wednesday. Plan indoor activities." },
        { type: "info", message: "Ideal conditions for irrigation this week." }
      ]
    };
    
    setWeatherData(sampleWeather);
  };

  return (
    <div style={{ width: '100%', minHeight: '100vh', margin: 0, padding: 0, background: '#f5f5f5' }}>
      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <section style={{
        width: '100%',
        background: 'linear-gradient(135deg, #9C27B0 0%, #BA68C8 100%)',
        padding: '60px 20px',
        color: 'white'
      }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto', textAlign: 'center' }}>
          <h1 style={{ fontSize: '42px', marginBottom: '20px' }}>🌡️ Weather Integration</h1>
          <p style={{ fontSize: '18px', opacity: 0.9 }}>
            Real-time weather data and forecasts to help you make informed farming decisions
          </p>
        </div>
      </section>

      {/* Search Section */}
      <section style={{ width: '100%', padding: '40px 20px', background: '#fff' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <form onSubmit={handleSearch} style={{ display: 'flex', gap: '10px' }}>
            <input
              type="text"
              placeholder="Enter your city or district name..."
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              required
              style={{
                flex: 1,
                padding: '15px',
                border: '2px solid #ddd',
                borderRadius: '8px',
                fontSize: '16px'
              }}
            />
            <button 
              type="submit"
              style={{
                padding: '15px 40px',
                background: 'linear-gradient(135deg, #9C27B0 0%, #BA68C8 100%)',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                fontSize: '16px',
                fontWeight: 'bold',
                cursor: 'pointer'
              }}
            >
              Get Weather
            </button>
          </form>
        </div>
      </section>

      {/* Weather Dashboard */}
      {weatherData && (
        <>
          {/* Current Weather */}
          <section style={{ width: '100%', padding: '60px 20px', background: '#f5f5f5' }}>
            <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
              <h2 style={{ 
                textAlign: 'center', 
                color: '#7b1fa2', 
                fontSize: '32px',
                marginBottom: '40px'
              }}>
                Current Weather in {weatherData.location}
              </h2>
              
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '20px',
                marginBottom: '40px'
              }}>
                <div style={{
                  background: 'linear-gradient(135deg, #9C27B0 0%, #BA68C8 100%)',
                  color: 'white',
                  padding: '40px',
                  borderRadius: '12px',
                  textAlign: 'center',
                  boxShadow: '0 4px 15px rgba(0,0,0,0.2)'
                }}>
                  <div style={{ fontSize: '48px', fontWeight: 'bold', marginBottom: '10px' }}>
                    {weatherData.current.temp}°C
                  </div>
                  <div style={{ fontSize: '20px' }}>{weatherData.current.condition}</div>
                </div>
                
                <div style={{
                  background: 'white',
                  padding: '25px',
                  borderRadius: '12px',
                  boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
                }}>
                  <div style={{ fontSize: '14px', color: '#666', marginBottom: '8px' }}>💧 Humidity</div>
                  <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#9C27B0' }}>
                    {weatherData.current.humidity}%
                  </div>
                </div>
                
                <div style={{
                  background: 'white',
                  padding: '25px',
                  borderRadius: '12px',
                  boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
                }}>
                  <div style={{ fontSize: '14px', color: '#666', marginBottom: '8px' }}>🌧️ Rainfall</div>
                  <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#9C27B0' }}>
                    {weatherData.current.rainfall}mm
                  </div>
                </div>
                
                <div style={{
                  background: 'white',
                  padding: '25px',
                  borderRadius: '12px',
                  boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
                }}>
                  <div style={{ fontSize: '14px', color: '#666', marginBottom: '8px' }}>💨 Wind Speed</div>
                  <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#9C27B0' }}>
                    {weatherData.current.windSpeed} km/h
                  </div>
                </div>
              </div>

              {/* Alerts */}
              {weatherData.alerts && weatherData.alerts.length > 0 && (
                <div style={{ marginTop: '30px' }}>
                  {weatherData.alerts.map((alert, index) => (
                    <div 
                      key={index}
                      style={{
                        background: alert.type === 'warning' ? '#fff3e0' : '#e3f2fd',
                        borderLeft: `5px solid ${alert.type === 'warning' ? '#FF9800' : '#2196F3'}`,
                        padding: '20px',
                        borderRadius: '8px',
                        marginBottom: '15px'
                      }}
                    >
                      <strong>{alert.type === 'warning' ? '⚠️ Warning' : 'ℹ️ Info'}:</strong> {alert.message}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </section>

          {/* 7-Day Forecast */}
          <section style={{ width: '100%', padding: '60px 20px', background: 'white' }}>
            <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
              <h2 style={{ 
                textAlign: 'center', 
                color: '#7b1fa2', 
                fontSize: '32px',
                marginBottom: '40px'
              }}>
                7-Day Forecast
              </h2>
              
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
                gap: '20px'
              }}>
                {weatherData.forecast.map((day, index) => (
                  <div 
                    key={index}
                    style={{
                      background: '#f5f5f5',
                      border: '2px solid #e0e0e0',
                      borderRadius: '12px',
                      padding: '20px',
                      textAlign: 'center',
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
                    <div style={{ fontSize: '14px', fontWeight: 'bold', marginBottom: '10px', color: '#666' }}>
                      {day.day}
                    </div>
                    <div style={{ fontSize: '48px', marginBottom: '10px' }}>
                      {day.icon}
                    </div>
                    <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#9C27B0', marginBottom: '5px' }}>
                      {day.temp}
                    </div>
                    <div style={{ fontSize: '12px', color: '#666', marginBottom: '5px' }}>
                      {day.condition}
                    </div>
                    <div style={{ fontSize: '14px', color: '#2196F3' }}>
                      💧 {day.rain}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Farming Recommendations */}
          <section style={{ width: '100%', padding: '60px 20px', background: '#f5f5f5' }}>
            <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
              <h2 style={{ 
                textAlign: 'center', 
                color: '#7b1fa2', 
                fontSize: '32px',
                marginBottom: '40px'
              }}>
                Farming Recommendations
              </h2>
              
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                gap: '25px'
              }}>
                <div style={{
                  background: 'white',
                  border: '2px solid #4CAF50',
                  borderRadius: '12px',
                  padding: '25px'
                }}>
                  <h3 style={{ color: '#4CAF50', marginBottom: '15px' }}>🌱 Planting</h3>
                  <p style={{ color: '#666', lineHeight: '1.6' }}>
                    Current weather conditions are favorable for planting. Soil moisture is adequate.
                  </p>
                </div>

                <div style={{
                  background: 'white',
                  border: '2px solid #2196F3',
                  borderRadius: '12px',
                  padding: '25px'
                }}>
                  <h3 style={{ color: '#2196F3', marginBottom: '15px' }}>💧 Irrigation</h3>
                  <p style={{ color: '#666', lineHeight: '1.6' }}>
                    Moderate irrigation recommended. Expected rainfall on Wednesday may reduce water needs.
                  </p>
                </div>

                <div style={{
                  background: 'white',
                  border: '2px solid #FF9800',
                  borderRadius: '12px',
                  padding: '25px'
                }}>
                  <h3 style={{ color: '#FF9800', marginBottom: '15px' }}>🧪 Fertilization</h3>
                  <p style={{ color: '#666', lineHeight: '1.6' }}>
                    Good conditions for fertilizer application. Apply before Wednesday's rain for best absorption.
                  </p>
                </div>
              </div>
            </div>
          </section>
        </>
      )}

      {/* No Data Message */}
      {!weatherData && (
        <section style={{ width: '100%', padding: '80px 20px', background: 'white' }}>
          <div style={{ 
            maxWidth: '600px', 
            margin: '0 auto', 
            textAlign: 'center',
            color: '#666'
          }}>
            <div style={{ fontSize: '64px', marginBottom: '20px' }}>🌤️</div>
            <h3 style={{ fontSize: '24px', marginBottom: '10px' }}>No Weather Data Yet</h3>
            <p>Enter your location above to get weather information and farming recommendations</p>
          </div>
        </section>
      )}
    </div>
  );
}

export default WeatherIntegration;