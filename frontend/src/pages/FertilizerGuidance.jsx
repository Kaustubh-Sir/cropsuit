// pages/FertilizerGuidance.jsx
import React, { useState } from "react";
import Navbar from "../components/Navbar";
import "../App.css";

function FertilizerGuidance() {
  const [cropData, setCropData] = useState({
    cropType: "",
    soilType: "",
    area: "",
    nutrientDeficiency: ""
  });

  const [recommendation, setRecommendation] = useState(null);

  const handleChange = (e) => {
    setCropData({ ...cropData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Sample fertilizer recommendation
    const sampleRecommendation = {
      primary: {
        name: "NPK (19:19:19)",
        quantity: "50 kg per acre",
        timing: "Apply at the time of sowing",
        cost: "₹1,200 - ₹1,500"
      },
      secondary: {
        name: "Urea",
        quantity: "30 kg per acre",
        timing: "Apply 30 days after sowing",
        cost: "₹600 - ₹800"
      },
      organic: {
        name: "Vermicompost",
        quantity: "2 tons per acre",
        timing: "Mix with soil before sowing",
        cost: "₹4,000 - ₹5,000"
      },
      biochar: {
        name: "Agricultural Biochar",
        quantity: "1 ton per acre",
        timing: "Apply once before sowing season",
        cost: "₹3,000 - ₹4,000"
      },
      tips: [
        "Apply fertilizers during early morning or evening hours",
        "Ensure adequate soil moisture before application",
        "Split nitrogen applications for better efficiency",
        "Test soil pH before applying any fertilizers"
      ]
    };
    
    setRecommendation(sampleRecommendation);
  };

  return (
    <div style={{ width: '100%', minHeight: '100vh', margin: 0, padding: 0, background: '#f5f5f5' }}>
      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <section style={{
        width: '100%',
        background: 'linear-gradient(135deg, #FF9800 0%, #FFB74D 100%)',
        padding: '60px 20px',
        color: 'white'
      }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto', textAlign: 'center' }}>
          <h1 style={{ fontSize: '42px', marginBottom: '20px' }}>🧪 Fertilizer Guidance</h1>
          <p style={{ fontSize: '18px', opacity: 0.9 }}>
            Get scientific recommendations for optimal fertilizer usage and soil health management
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
              color: '#e65100', 
              fontSize: '28px', 
              marginBottom: '30px',
              textAlign: 'center'
            }}>
              Enter Crop and Soil Information
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
                    Crop Type
                  </label>
                  <select 
                    name="cropType" 
                    value={cropData.cropType} 
                    onChange={handleChange} 
                    required
                    style={{
                      width: '100%',
                      padding: '12px',
                      border: '2px solid #ddd',
                      borderRadius: '6px',
                      fontSize: '14px',
                      background: 'white'
                    }}
                  >
                    <option value="">Select Crop</option>
                    <option value="rice">Rice</option>
                    <option value="wheat">Wheat</option>
                    <option value="cotton">Cotton</option>
                    <option value="sugarcane">Sugarcane</option>
                    <option value="maize">Maize</option>
                    <option value="soybean">Soybean</option>
                    <option value="vegetables">Vegetables</option>
                  </select>
                </div>

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
                    value={cropData.soilType} 
                    onChange={handleChange} 
                    required
                    style={{
                      width: '100%',
                      padding: '12px',
                      border: '2px solid #ddd',
                      borderRadius: '6px',
                      fontSize: '14px',
                      background: 'white'
                    }}
                  >
                    <option value="">Select Soil Type</option>
                    <option value="clay">Clay</option>
                    <option value="loamy">Loamy</option>
                    <option value="sandy">Sandy</option>
                    <option value="black">Black Cotton</option>
                    <option value="red">Red Soil</option>
                    <option value="alluvial">Alluvial</option>
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
                    Farm Area (in acres)
                  </label>
                  <input
                    type="number"
                    name="area"
                    placeholder="e.g., 5"
                    value={cropData.area}
                    onChange={handleChange}
                    required
                    style={{
                      width: '100%',
                      padding: '12px',
                      border: '2px solid #ddd',
                      borderRadius: '6px',
                      fontSize: '14px'
                    }}
                  />
                </div>

                <div>
                  <label style={{ 
                    display: 'block', 
                    marginBottom: '8px', 
                    fontWeight: '600',
                    color: '#333'
                  }}>
                    Known Nutrient Deficiency (Optional)
                  </label>
                  <select 
                    name="nutrientDeficiency" 
                    value={cropData.nutrientDeficiency} 
                    onChange={handleChange}
                    style={{
                      width: '100%',
                      padding: '12px',
                      border: '2px solid #ddd',
                      borderRadius: '6px',
                      fontSize: '14px',
                      background: 'white'
                    }}
                  >
                    <option value="">None / Not Sure</option>
                    <option value="nitrogen">Nitrogen (N)</option>
                    <option value="phosphorus">Phosphorus (P)</option>
                    <option value="potassium">Potassium (K)</option>
                    <option value="zinc">Zinc</option>
                    <option value="iron">Iron</option>
                  </select>
                </div>
              </div>

              <button
                type="submit"
                style={{
                  width: '100%',
                  padding: '15px',
                  background: 'linear-gradient(135deg, #FF9800 0%, #FFB74D 100%)',
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
                Get Fertilizer Recommendations
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Recommendations Results */}
      {recommendation && (
        <section style={{ width: '100%', padding: '60px 20px', background: 'white' }}>
          <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
            <h2 style={{ 
              textAlign: 'center', 
              color: '#e65100', 
              fontSize: '32px',
              marginBottom: '40px'
            }}>
              Recommended Fertilizer Plan
            </h2>
            
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '25px',
              marginBottom: '40px'
            }}>
              <div style={{
                background: 'linear-gradient(135deg, #4CAF50 0%, #66BB6A 100%)',
                borderRadius: '12px',
                padding: '25px',
                color: 'white',
                boxShadow: '0 4px 15px rgba(0,0,0,0.1)'
              }}>
                <h3 style={{ fontSize: '22px', marginBottom: '15px' }}>
                  🌱 Primary Fertilizer
                </h3>
                <p style={{ margin: '8px 0' }}><strong>Type:</strong> {recommendation.primary.name}</p>
                <p style={{ margin: '8px 0' }}><strong>Quantity:</strong> {recommendation.primary.quantity}</p>
                <p style={{ margin: '8px 0' }}><strong>Timing:</strong> {recommendation.primary.timing}</p>
                <p style={{ margin: '8px 0' }}><strong>Cost:</strong> {recommendation.primary.cost}</p>
              </div>

              <div style={{
                background: 'linear-gradient(135deg, #2196F3 0%, #42A5F5 100%)',
                borderRadius: '12px',
                padding: '25px',
                color: 'white',
                boxShadow: '0 4px 15px rgba(0,0,0,0.1)'
              }}>
                <h3 style={{ fontSize: '22px', marginBottom: '15px' }}>
                  💧 Secondary Fertilizer
                </h3>
                <p style={{ margin: '8px 0' }}><strong>Type:</strong> {recommendation.secondary.name}</p>
                <p style={{ margin: '8px 0' }}><strong>Quantity:</strong> {recommendation.secondary.quantity}</p>
                <p style={{ margin: '8px 0' }}><strong>Timing:</strong> {recommendation.secondary.timing}</p>
                <p style={{ margin: '8px 0' }}><strong>Cost:</strong> {recommendation.secondary.cost}</p>
              </div>

              <div style={{
                background: 'linear-gradient(135deg, #8BC34A 0%, #9CCC65 100%)',
                borderRadius: '12px',
                padding: '25px',
                color: 'white',
                boxShadow: '0 4px 15px rgba(0,0,0,0.1)'
              }}>
                <h3 style={{ fontSize: '22px', marginBottom: '15px' }}>
                  🍃 Organic Option
                </h3>
                <p style={{ margin: '8px 0' }}><strong>Type:</strong> {recommendation.organic.name}</p>
                <p style={{ margin: '8px 0' }}><strong>Quantity:</strong> {recommendation.organic.quantity}</p>
                <p style={{ margin: '8px 0' }}><strong>Timing:</strong> {recommendation.organic.timing}</p>
                <p style={{ margin: '8px 0' }}><strong>Cost:</strong> {recommendation.organic.cost}</p>
              </div>

              <div style={{
                background: 'linear-gradient(135deg, #795548 0%, #8D6E63 100%)',
                borderRadius: '12px',
                padding: '25px',
                color: 'white',
                boxShadow: '0 4px 15px rgba(0,0,0,0.1)'
              }}>
                <h3 style={{ fontSize: '22px', marginBottom: '15px' }}>
                  🌿 Biochar Solution
                </h3>
                <p style={{ margin: '8px 0' }}><strong>Type:</strong> {recommendation.biochar.name}</p>
                <p style={{ margin: '8px 0' }}><strong>Quantity:</strong> {recommendation.biochar.quantity}</p>
                <p style={{ margin: '8px 0' }}><strong>Timing:</strong> {recommendation.biochar.timing}</p>
                <p style={{ margin: '8px 0' }}><strong>Cost:</strong> {recommendation.biochar.cost}</p>
              </div>
            </div>

            {/* Tips Section */}
            <div style={{
              background: '#fff3e0',
              borderLeft: '5px solid #FF9800',
              padding: '30px',
              borderRadius: '8px'
            }}>
              <h3 style={{ 
                color: '#e65100', 
                fontSize: '24px', 
                marginBottom: '20px' 
              }}>
                💡 Best Practices & Tips
              </h3>
              <ul style={{ 
                listStyle: 'none', 
                padding: 0, 
                margin: 0 
              }}>
                {recommendation.tips.map((tip, index) => (
                  <li key={index} style={{
                    padding: '12px 0',
                    borderBottom: index < recommendation.tips.length - 1 ? '1px solid #ffe0b2' : 'none',
                    fontSize: '16px',
                    color: '#333'
                  }}>
                    ✓ {tip}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}

export default FertilizerGuidance;