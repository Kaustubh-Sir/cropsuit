// pages/CropRecommendations.jsx
import React, { useState } from "react";
import Navbar from "../components/Navbar";
import "../App.css";

function CropRecommendations() {
  const [formData, setFormData] = useState({
    state: "",
    season: "",
    soilType: "",
    soilPH: "",
  });

  const [recommendations, setRecommendations] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Sample recommendations based on season
    const cropData = {
      kharif: [
        { name: "Rice", yield: "25-30 quintals/acre", profit: "₹40,000-₹50,000", duration: "120-150 days" },
        { name: "Cotton", yield: "15-20 quintals/acre", profit: "₹60,000-₹80,000", duration: "150-180 days" },
        { name: "Maize", yield: "30-35 quintals/acre", profit: "₹35,000-₹45,000", duration: "90-110 days" },
        { name: "Soybean", yield: "20-25 quintals/acre", profit: "₹45,000-₹60,000", duration: "90-120 days" },
      ],
      rabi: [
        { name: "Wheat", yield: "35-40 quintals/acre", profit: "₹50,000-₹65,000", duration: "120-150 days" },
        { name: "Barley", yield: "25-30 quintals/acre", profit: "₹30,000-₹40,000", duration: "110-130 days" },
        { name: "Gram", yield: "15-20 quintals/acre", profit: "₹45,000-₹55,000", duration: "100-120 days" },
        { name: "Mustard", yield: "12-15 quintals/acre", profit: "₹40,000-₹50,000", duration: "110-140 days" },
      ],
      zaid: [
        { name: "Watermelon", yield: "200-250 quintals/acre", profit: "₹70,000-₹90,000", duration: "80-100 days" },
        { name: "Cucumber", yield: "100-120 quintals/acre", profit: "₹50,000-₹60,000", duration: "50-70 days" },
        { name: "Muskmelon", yield: "150-180 quintals/acre", profit: "₹60,000-₹75,000", duration: "70-90 days" },
        { name: "Fodder", yield: "300-350 quintals/acre", profit: "₹25,000-₹35,000", duration: "60-80 days" },
      ],
    };

    setRecommendations(cropData[formData.season.toLowerCase()] || []);
  };

  return (
    <div style={{ width: '100vw', minHeight: '100vh', margin: 0, padding: 0, background: '#f5f5f5', overflowX: 'hidden' }}>
      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <section style={{
        width: '100%',
        background: 'linear-gradient(135deg, #4CAF50 0%, #66BB6A 100%)',
        padding: '60px 20px',
        color: 'white'
      }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto', textAlign: 'center' }}>
          <h1 style={{ fontSize: '42px', marginBottom: '20px' }}>🌾 Crop Recommendations</h1>
          <p style={{ fontSize: '18px', opacity: 0.9 }}>
            Get personalized crop suggestions based on your location, season, and soil conditions
          </p>
        </div>
      </section>

      {/* Input Form */}
      <section style={{ width: '100%', padding: '60px 20px' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <div style={{
            background: 'white',
            padding: '40px',
            borderRadius: '12px',
            boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
          }}>
            <h2 style={{ 
              color: '#2e7d32', 
              fontSize: '28px', 
              marginBottom: '30px',
              textAlign: 'center'
            }}>
              Enter Your Farm Details
            </h2>
            
            <form onSubmit={handleSubmit}>
              <div style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                gap: '20px',
                marginBottom: '20px'
              }}>
                <div>
                  <label style={{ 
                    display: 'block', 
                    marginBottom: '8px', 
                    fontWeight: '600',
                    color: '#333'
                  }}>
                    State / Region
                  </label>
                  <select 
                    name="state" 
                    value={formData.state} 
                    onChange={handleChange} 
                    required
                    style={{
                      width: '100%',
                      padding: '12px',
                      border: '2px solid #ddd',
                      borderRadius: '6px',
                      fontSize: '14px',
                      background: 'white',
                      color: '#333',
                      cursor: 'pointer'
                    }}
                  >
                    <option value="">Select State</option>
                    <option value="punjab">Punjab</option>
                    <option value="maharashtra">Maharashtra</option>
                    <option value="gujarat">Gujarat</option>
                    <option value="karnataka">Karnataka</option>
                    <option value="up">Uttar Pradesh</option>
                    <option value="rajasthan">Rajasthan</option>
                  </select>
                </div>

                <div>
                  <label style={{ 
                    display: 'block', 
                    marginBottom: '8px', 
                    fontWeight: '600',
                    color: '#333'
                  }}>
                    Season
                  </label>
                  <select 
                    name="season" 
                    value={formData.season} 
                    onChange={handleChange} 
                    required
                    style={{
                      width: '100%',
                      padding: '12px',
                      border: '2px solid #ddd',
                      borderRadius: '6px',
                      fontSize: '14px',
                      background: 'white',
                      color: '#333',
                      cursor: 'pointer'
                    }}
                  >
                    <option value="">Select Season</option>
                    <option value="kharif">Kharif (June-October)</option>
                    <option value="rabi">Rabi (November-April)</option>
                    <option value="zaid">Zaid (April-June)</option>
                  </select>
                </div>
              </div>

              <div style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                gap: '20px',
                marginBottom: '30px'
              }}>
                <div>
                  <label style={{ 
                    display: 'block', 
                    marginBottom: '8px', 
                    fontWeight: '600',
                    color: '#333'
                  }}>
                    Soil Type
                  </label>
                  <select 
                    name="soilType" 
                    value={formData.soilType} 
                    onChange={handleChange} 
                    required
                    style={{
                      width: '100%',
                      padding: '12px',
                      border: '2px solid #ddd',
                      borderRadius: '6px',
                      fontSize: '14px',
                      background: 'white',
                      color: '#333',
                      cursor: 'pointer'
                    }}
                  >
                    <option value="">Select Soil Type</option>
                    <option value="clay">Clay</option>
                    <option value="loamy">Loamy</option>
                    <option value="sandy">Sandy</option>
                    <option value="black">Black Cotton</option>
                    <option value="red">Red Soil</option>
                  </select>
                </div>

                <div>
                  <label style={{ 
                    display: 'block', 
                    marginBottom: '8px', 
                    fontWeight: '600',
                    color: '#333'
                  }}>
                    Soil pH Level
                  </label>
                  <input
                    type="text"
                    name="soilPH"
                    placeholder="e.g., 6.5"
                    value={formData.soilPH}
                    onChange={handleChange}
                    style={{
                      width: '100%',
                      padding: '12px',
                      border: '2px solid #ddd',
                      borderRadius: '6px',
                      fontSize: '14px',
                      background: 'white',
                      color: '#333'
                    }}
                  />
                </div>
              </div>

              <button
                type="submit"
                style={{
                  width: '100%',
                  padding: '15px',
                  background: 'linear-gradient(135deg, #4CAF50 0%, #66BB6A 100%)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: '16px',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  transition: 'transform 0.2s'
                }}
                onMouseEnter={(e) => e.target.style.transform = 'scale(1.02)'}
                onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
              >
                Get Recommendations
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Recommendations Results */}
      {recommendations && recommendations.length > 0 && (
        <section style={{ width: '100%', padding: '60px 20px', background: 'white' }}>
          <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
            <h2 style={{ 
              textAlign: 'center', 
              color: '#2e7d32', 
              fontSize: '32px',
              marginBottom: '40px'
            }}>
              Recommended Crops for {formData.season.charAt(0).toUpperCase() + formData.season.slice(1)} Season
            </h2>
            
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '25px'
            }}>
              {recommendations.map((crop, index) => (
                <div
                  key={index}
                  style={{
                    background: '#fff',
                    border: '2px solid #e0e0e0',
                    borderRadius: '12px',
                    padding: '25px',
                    boxShadow: '0 2px 10px rgba(0,0,0,0.08)',
                    transition: 'transform 0.3s, box-shadow 0.3s'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-5px)';
                    e.currentTarget.style.boxShadow = '0 8px 20px rgba(0,0,0,0.15)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 2px 10px rgba(0,0,0,0.08)';
                  }}
                >
                  <h3 style={{ 
                    color: '#4CAF50', 
                    fontSize: '24px', 
                    marginBottom: '15px' 
                  }}>
                    🌱 {crop.name}
                  </h3>
                  <div style={{ fontSize: '14px', lineHeight: '1.8' }}>
                    <p style={{ margin: '8px 0' }}>
                      <strong>Expected Yield:</strong> {crop.yield}
                    </p>
                    <p style={{ margin: '8px 0' }}>
                      <strong>Profit Potential:</strong> {crop.profit}
                    </p>
                    <p style={{ margin: '8px 0' }}>
                      <strong>Growing Period:</strong> {crop.duration}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}

export default CropRecommendations;