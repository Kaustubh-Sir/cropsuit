// pages/Features.jsx
import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import "../App.css";

function Features() {
  return (
    <div style={{ width: '100vw', minHeight: '100vh', margin: 0, padding: 0, overflowX: 'hidden', background: '#f5f5f5' }}>
      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <section style={{
        width: '100%',
        background: 'linear-gradient(135deg, #4CAF50 0%, #66BB6A 100%)',
        padding: '80px 20px',
        color: 'white'
      }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto', textAlign: 'center' }}>
          <h1 style={{ fontSize: '48px', marginBottom: '20px', fontWeight: 'bold' }}>
            Comprehensive Farming Solutions
          </h1>
          <p style={{ fontSize: '20px', opacity: 0.95, maxWidth: '800px', margin: '0 auto' }}>
            Discover how CropSuit empowers farmers with cutting-edge technology
            and data-driven insights for maximum yield and sustainability
          </p>
        </div>
      </section>

      {/* Main Features Grid */}
      <section style={{ width: '100%', padding: '80px 20px', background: 'white' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
            gap: '30px'
          }}>
            
            {/* Crop Recommendations */}
            <Link to="/crop-recommendations" style={{
              textDecoration: 'none',
              background: '#f9f9f9',
              padding: '40px',
              borderRadius: '16px',
              border: '2px solid #e0e0e0',
              transition: 'all 0.3s',
              position: 'relative'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-8px)';
              e.currentTarget.style.boxShadow = '0 12px 30px rgba(0,0,0,0.15)';
              e.currentTarget.style.borderColor = '#4CAF50';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
              e.currentTarget.style.borderColor = '#e0e0e0';
            }}>
              <div style={{ fontSize: '64px', marginBottom: '20px' }}>🌾</div>
              <h2 style={{ fontSize: '28px', color: '#2e7d32', marginBottom: '15px' }}>
                Crop Recommendations
              </h2>
              <p style={{ fontSize: '16px', color: '#666', lineHeight: '1.6', marginBottom: '20px' }}>
                Get AI-powered suggestions for the best crops suited to your soil,
                climate, and season. Maximize profits with data-backed decisions.
              </p>
              <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '20px' }}>
                <span style={{ padding: '6px 14px', background: '#e8f5e9', color: '#2e7d32', borderRadius: '20px', fontSize: '13px', fontWeight: '600' }}>
                  Season-based
                </span>
                <span style={{ padding: '6px 14px', background: '#e8f5e9', color: '#2e7d32', borderRadius: '20px', fontSize: '13px', fontWeight: '600' }}>
                  Soil analysis
                </span>
                <span style={{ padding: '6px 14px', background: '#e8f5e9', color: '#2e7d32', borderRadius: '20px', fontSize: '13px', fontWeight: '600' }}>
                  ROI calculator
                </span>
              </div>
              <div style={{ fontSize: '24px', color: '#4CAF50' }}>→</div>
            </Link>

            {/* Weather Integration */}
            <Link to="/weather-integration" style={{
              textDecoration: 'none',
              background: '#f9f9f9',
              padding: '40px',
              borderRadius: '16px',
              border: '2px solid #e0e0e0',
              transition: 'all 0.3s',
              position: 'relative'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-8px)';
              e.currentTarget.style.boxShadow = '0 12px 30px rgba(0,0,0,0.15)';
              e.currentTarget.style.borderColor = '#9C27B0';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
              e.currentTarget.style.borderColor = '#e0e0e0';
            }}>
              <div style={{ fontSize: '64px', marginBottom: '20px' }}>🌡️</div>
              <h2 style={{ fontSize: '28px', color: '#7b1fa2', marginBottom: '15px' }}>
                Weather Integration
              </h2>
              <p style={{ fontSize: '16px', color: '#666', lineHeight: '1.6', marginBottom: '20px' }}>
                Real-time weather forecasts and alerts help you plan planting,
                irrigation, and harvesting with precision timing.
              </p>
              <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '20px' }}>
                <span style={{ padding: '6px 14px', background: '#f3e5f5', color: '#7b1fa2', borderRadius: '20px', fontSize: '13px', fontWeight: '600' }}>
                  7-day forecast
                </span>
                <span style={{ padding: '6px 14px', background: '#f3e5f5', color: '#7b1fa2', borderRadius: '20px', fontSize: '13px', fontWeight: '600' }}>
                  Rainfall alerts
                </span>
                <span style={{ padding: '6px 14px', background: '#f3e5f5', color: '#7b1fa2', borderRadius: '20px', fontSize: '13px', fontWeight: '600' }}>
                  Temperature
                </span>
              </div>
              <div style={{ fontSize: '24px', color: '#9C27B0' }}>→</div>
            </Link>

            {/* Fertilizer Guidance */}
            <Link to="/fertilizer-guidance" style={{
              textDecoration: 'none',
              background: '#f9f9f9',
              padding: '40px',
              borderRadius: '16px',
              border: '2px solid #e0e0e0',
              transition: 'all 0.3s',
              position: 'relative'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-8px)';
              e.currentTarget.style.boxShadow = '0 12px 30px rgba(0,0,0,0.15)';
              e.currentTarget.style.borderColor = '#FF9800';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
              e.currentTarget.style.borderColor = '#e0e0e0';
            }}>
              <div style={{ fontSize: '64px', marginBottom: '20px' }}>🧪</div>
              <h2 style={{ fontSize: '28px', color: '#e65100', marginBottom: '15px' }}>
                Fertilizer Guidance
              </h2>
              <p style={{ fontSize: '16px', color: '#666', lineHeight: '1.6', marginBottom: '20px' }}>
                Optimize fertilizer usage with scientific recommendations
                tailored to your crops, reducing waste and improving soil health.
              </p>
              <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '20px' }}>
                <span style={{ padding: '6px 14px', background: '#fff3e0', color: '#e65100', borderRadius: '20px', fontSize: '13px', fontWeight: '600' }}>
                  NPK analysis
                </span>
                <span style={{ padding: '6px 14px', background: '#fff3e0', color: '#e65100', borderRadius: '20px', fontSize: '13px', fontWeight: '600' }}>
                  Organic options
                </span>
                <span style={{ padding: '6px 14px', background: '#fff3e0', color: '#e65100', borderRadius: '20px', fontSize: '13px', fontWeight: '600' }}>
                  Cost savings
                </span>
              </div>
              <div style={{ fontSize: '24px', color: '#FF9800' }}>→</div>
            </Link>

            {/* Seasonal Planning */}
            <Link to="/seasonal-planning" style={{
              textDecoration: 'none',
              background: '#f9f9f9',
              padding: '40px',
              borderRadius: '16px',
              border: '2px solid #e0e0e0',
              transition: 'all 0.3s',
              position: 'relative'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-8px)';
              e.currentTarget.style.boxShadow = '0 12px 30px rgba(0,0,0,0.15)';
              e.currentTarget.style.borderColor = '#00BCD4';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
              e.currentTarget.style.borderColor = '#e0e0e0';
            }}>
              <div style={{ fontSize: '64px', marginBottom: '20px' }}>📅</div>
              <h2 style={{ fontSize: '28px', color: '#00838f', marginBottom: '15px' }}>
                Seasonal Planning
              </h2>
              <p style={{ fontSize: '16px', color: '#666', lineHeight: '1.6', marginBottom: '20px' }}>
                Plan your farming activities across Kharif, Rabi, and Zaid
                seasons with comprehensive crop calendars and recommendations.
              </p>
              <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '20px' }}>
                <span style={{ padding: '6px 14px', background: '#e0f7fa', color: '#00838f', borderRadius: '20px', fontSize: '13px', fontWeight: '600' }}>
                  3 seasons
                </span>
                <span style={{ padding: '6px 14px', background: '#e0f7fa', color: '#00838f', borderRadius: '20px', fontSize: '13px', fontWeight: '600' }}>
                  Crop calendar
                </span>
                <span style={{ padding: '6px 14px', background: '#e0f7fa', color: '#00838f', borderRadius: '20px', fontSize: '13px', fontWeight: '600' }}>
                  Timing tips
                </span>
              </div>
              <div style={{ fontSize: '24px', color: '#00BCD4' }}>→</div>
            </Link>
          </div>
        </div>
      </section>

      {/* Additional Info Section */}
      <section style={{ width: '100%', padding: '80px 20px', background: '#f5f5f5' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ fontSize: '36px', color: '#2e7d32', marginBottom: '20px' }}>
            Why Choose CropSuit?
          </h2>
          <p style={{ fontSize: '18px', color: '#666', lineHeight: '1.8', maxWidth: '800px', margin: '0 auto 40px' }}>
            Our platform combines cutting-edge technology with traditional farming
            wisdom to provide you with the most accurate and actionable insights
            for your farm's success.
          </p>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '30px',
            marginTop: '50px'
          }}>
            <div style={{ padding: '30px', background: 'white', borderRadius: '12px', boxShadow: '0 2px 10px rgba(0,0,0,0.08)' }}>
              <div style={{ fontSize: '48px', marginBottom: '15px' }}>📊</div>
              <h3 style={{ fontSize: '22px', color: '#2e7d32', marginBottom: '10px' }}>Data-Driven</h3>
              <p style={{ fontSize: '15px', color: '#666', lineHeight: '1.6' }}>
                Backed by agricultural science and real-time data analysis
              </p>
            </div>

            <div style={{ padding: '30px', background: 'white', borderRadius: '12px', boxShadow: '0 2px 10px rgba(0,0,0,0.08)' }}>
              <div style={{ fontSize: '48px', marginBottom: '15px' }}>🌍</div>
              <h3 style={{ fontSize: '22px', color: '#2e7d32', marginBottom: '10px' }}>India-Specific</h3>
              <p style={{ fontSize: '15px', color: '#666', lineHeight: '1.6' }}>
                Tailored for Indian climate zones and cropping patterns
              </p>
            </div>

            <div style={{ padding: '30px', background: 'white', borderRadius: '12px', boxShadow: '0 2px 10px rgba(0,0,0,0.08)' }}>
              <div style={{ fontSize: '48px', marginBottom: '15px' }}>💰</div>
              <h3 style={{ fontSize: '22px', color: '#2e7d32', marginBottom: '10px' }}>Cost-Effective</h3>
              <p style={{ fontSize: '15px', color: '#666', lineHeight: '1.6' }}>
                Reduce input costs while maximizing your yield and profits
              </p>
            </div>

            <div style={{ padding: '30px', background: 'white', borderRadius: '12px', boxShadow: '0 2px 10px rgba(0,0,0,0.08)' }}>
              <div style={{ fontSize: '48px', marginBottom: '15px' }}>🌱</div>
              <h3 style={{ fontSize: '22px', color: '#2e7d32', marginBottom: '10px' }}>Sustainable</h3>
              <p style={{ fontSize: '15px', color: '#666', lineHeight: '1.6' }}>
                Promote eco-friendly farming practices for long-term success
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Features;