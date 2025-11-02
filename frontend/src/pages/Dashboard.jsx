import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { cropAPI, weatherAPI } from '../services/api';
import Navbar from '../components/Navbar';

function Dashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [crops, setCrops] = useState([]);
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showAddCropModal, setShowAddCropModal] = useState(false);
  const [newCrop, setNewCrop] = useState({
    name: '',
    variety: '',
    category: '',
    area: '',
    season: 'kharif',
    status: 'planning'
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      // Fetch crops
      const cropsResponse = await cropAPI.getAll();
      setCrops(cropsResponse.data.data || []);

      // Fetch weather (Mumbai coordinates as example)
      try {
        const weatherResponse = await weatherAPI.getCurrent(19.0760, 72.8777);
        setWeather(weatherResponse.data.data);
      } catch (weatherError) {
        console.log('Weather API not available yet');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      setError('Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  const handleAddCrop = async (e) => {
    e.preventDefault();
    try {
      await cropAPI.create(newCrop);
      setShowAddCropModal(false);
      setNewCrop({
        name: '',
        variety: '',
        category: '',
        area: '',
        season: 'kharif',
        status: 'planning'
      });
      fetchData(); // Refresh the crops list
    } catch (error) {
      console.error('Error adding crop:', error);
      setError('Failed to add crop');
    }
  };

  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center',
        height: '100vh',
        background: '#f5f5f5'
      }}>
        Loading dashboard...
      </div>
    );
  }

  return (
    <div style={{ 
      width: '100%',
      minHeight: '100vh',
      margin: 0,
      padding: 0,
      background: '#f5f5f5'
    }}>
      {/* Navbar */}
      <Navbar />

      <div style={{ 
        maxWidth: '1400px',
        margin: '0 auto',
        padding: '20px'
      }}>
        {/* Welcome Section */}
        <div style={{ 
          background: 'white',
          padding: '30px',
          borderRadius: '12px',
          marginBottom: '30px',
          boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
        }}>
          <h2 style={{ marginTop: 0, fontSize: '28px', color: '#2e7d32' }}>
            Welcome back, {user?.name}! 👋
          </h2>
          <p style={{ color: '#666', margin: 0, fontSize: '16px' }}>Email: {user?.email}</p>
        </div>

        {/* Error Message */}
        {error && (
          <div style={{
            padding: '15px',
            background: '#fee',
            color: '#c00',
            borderRadius: '8px',
            marginBottom: '20px'
          }}>
            {error}
          </div>
        )}

        {/* Weather Widget */}
        {weather && (
          <div style={{ 
            padding: '30px',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: 'white',
            borderRadius: '12px',
            marginBottom: '30px',
            boxShadow: '0 4px 15px rgba(0,0,0,0.2)'
          }}>
            <h3 style={{ marginTop: 0, fontSize: '24px' }}>
              🌤️ Current Weather - {weather.location?.name || 'Mumbai'}
            </h3>
            <div style={{ 
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
              gap: '20px',
              marginTop: '20px'
            }}>
              <div>
                <div style={{ fontSize: '14px', opacity: 0.9 }}>Temperature</div>
                <div style={{ fontSize: '32px', fontWeight: 'bold' }}>
                  {weather.current?.temperature}°C
                </div>
              </div>
              <div>
                <div style={{ fontSize: '14px', opacity: 0.9 }}>Humidity</div>
                <div style={{ fontSize: '32px', fontWeight: 'bold' }}>
                  {weather.current?.humidity}%
                </div>
              </div>
              <div>
                <div style={{ fontSize: '14px', opacity: 0.9 }}>Condition</div>
                <div style={{ fontSize: '20px', fontWeight: 'bold' }}>
                  {weather.current?.description}
                </div>
              </div>
            </div>
            
            {weather.agriculturalAdvice && (
              <div style={{ 
                marginTop: '20px',
                padding: '20px',
                background: 'rgba(255,255,255,0.2)',
                borderRadius: '8px'
              }}>
                <strong>💧 Agricultural Advice:</strong>
                <p style={{ margin: '10px 0 0 0' }}>
                  {weather.agriculturalAdvice.irrigation}
                </p>
              </div>
            )}
          </div>
        )}

        {/* Quick Stats */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '20px',
          marginBottom: '30px'
        }}>
          <div style={{
            background: 'white',
            padding: '25px',
            borderRadius: '12px',
            boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
          }}>
            <div style={{ fontSize: '14px', color: '#666' }}>Total Crops</div>
            <div style={{ fontSize: '36px', fontWeight: 'bold', color: '#4CAF50' }}>
              {crops.length}
            </div>
          </div>
          
          <div style={{
            background: 'white',
            padding: '25px',
            borderRadius: '12px',
            boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
          }}>
            <div style={{ fontSize: '14px', color: '#666' }}>Active Crops</div>
            <div style={{ fontSize: '36px', fontWeight: 'bold', color: '#2196F3' }}>
              {crops.filter(c => c.status === 'growing').length}
            </div>
          </div>
        </div>

        {/* Crops List */}
        <div style={{
          background: 'white',
          padding: '30px',
          borderRadius: '12px',
          boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px' }}>
            <h3 style={{ margin: 0, fontSize: '24px', color: '#2e7d32' }}>Your Crops</h3>
            <button 
              onClick={() => setShowAddCropModal(true)}
              style={{
                padding: '12px 25px',
                background: '#4CAF50',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                fontSize: '16px',
                fontWeight: 'bold'
              }}
            >
              + Add Crop
            </button>
          </div>
          
          {crops.length === 0 ? (
            <div style={{ 
              textAlign: 'center',
              padding: '60px',
              color: '#666'
            }}>
              <p style={{ fontSize: '20px', marginBottom: '10px' }}>No crops yet!</p>
              <p>Start by adding your first crop to track.</p>
            </div>
          ) : (
            <div style={{ 
              display: 'grid', 
              gap: '20px',
              gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))'
            }}>
              {crops.map((crop) => (
                <div 
                  key={crop._id}
                  style={{
                    padding: '20px',
                    border: '2px solid #e0e0e0',
                    borderRadius: '12px',
                    background: '#fafafa',
                    transition: 'transform 0.2s, box-shadow 0.2s',
                    cursor: 'pointer'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-3px)';
                    e.currentTarget.style.boxShadow = '0 8px 20px rgba(0,0,0,0.15)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  <h4 style={{ margin: '0 0 15px 0', fontSize: '20px', color: '#2e7d32' }}>
                    {crop.name} {crop.variety && `- ${crop.variety}`}
                  </h4>
                  <div style={{ fontSize: '14px', color: '#666' }}>
                    <p style={{ margin: '8px 0' }}>
                      <strong>Category:</strong> {crop.category}
                    </p>
                    <p style={{ margin: '8px 0' }}>
                      <strong>Area:</strong> {crop.area} acres
                    </p>
                    <p style={{ margin: '8px 0' }}>
                      <strong>Season:</strong> {crop.season}
                    </p>
                    <p style={{ margin: '8px 0' }}>
                      <strong>Status:</strong>{' '}
                      <span style={{
                        padding: '4px 12px',
                        background: crop.status === 'growing' ? '#4caf50' : 
                                   crop.status === 'harvested' ? '#2196F3' : '#ff9800',
                        color: 'white',
                        borderRadius: '6px',
                        fontSize: '12px',
                        fontWeight: 'bold'
                      }}>
                        {crop.status}
                      </span>
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Add Crop Modal */}
      {showAddCropModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0,0,0,0.6)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 1000,
          padding: '20px'
        }}>
          <div style={{
            background: 'white',
            padding: '40px',
            borderRadius: '12px',
            maxWidth: '550px',
            width: '100%',
            maxHeight: '90vh',
            overflow: 'auto'
          }}>
            <h2 style={{ marginTop: 0, color: '#2e7d32' }}>Add New Crop</h2>
            <form onSubmit={handleAddCrop}>
              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#333' }}>
                  Crop Name *
                </label>
                <input
                  type="text"
                  required
                  value={newCrop.name}
                  onChange={(e) => setNewCrop({ ...newCrop, name: e.target.value })}
                  placeholder="e.g., Rice, Wheat, Cotton"
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '2px solid #ddd',
                    borderRadius: '6px',
                    fontSize: '14px',
                    boxSizing: 'border-box'
                  }}
                />
              </div>

              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#333' }}>
                  Variety
                </label>
                <input
                  type="text"
                  value={newCrop.variety}
                  onChange={(e) => setNewCrop({ ...newCrop, variety: e.target.value })}
                  placeholder="e.g., Basmati, Durum"
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '2px solid #ddd',
                    borderRadius: '6px',
                    fontSize: '14px',
                    boxSizing: 'border-box'
                  }}
                />
              </div>

              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#333' }}>
                  Category *
                </label>
                <select
                  required
                  value={newCrop.category}
                  onChange={(e) => setNewCrop({ ...newCrop, category: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '2px solid #ddd',
                    borderRadius: '6px',
                    fontSize: '14px',
                    boxSizing: 'border-box'
                  }}
                >
                  <option value="">Select Category</option>
                  <option value="cereal">Cereal</option>
                  <option value="pulse">Pulse</option>
                  <option value="oilseed">Oilseed</option>
                  <option value="vegetable">Vegetable</option>
                  <option value="fruit">Fruit</option>
                  <option value="cash">Cash Crop</option>
                  <option value="fiber">Fiber</option>
                </select>
              </div>

              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#333' }}>
                  Area (acres) *
                </label>
                <input
                  type="number"
                  required
                  min="0.1"
                  step="0.1"
                  value={newCrop.area}
                  onChange={(e) => setNewCrop({ ...newCrop, area: e.target.value })}
                  placeholder="e.g., 2.5"
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '2px solid #ddd',
                    borderRadius: '6px',
                    fontSize: '14px',
                    boxSizing: 'border-box'
                  }}
                />
              </div>

              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#333' }}>
                  Season *
                </label>
                <select
                  required
                  value={newCrop.season}
                  onChange={(e) => setNewCrop({ ...newCrop, season: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '2px solid #ddd',
                    borderRadius: '6px',
                    fontSize: '14px',
                    boxSizing: 'border-box'
                  }}
                >
                  <option value="kharif">Kharif (June-October)</option>
                  <option value="rabi">Rabi (November-April)</option>
                  <option value="zaid">Zaid (April-June)</option>
                </select>
              </div>

              <div style={{ marginBottom: '30px' }}>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#333' }}>
                  Status *
                </label>
                <select
                  required
                  value={newCrop.status}
                  onChange={(e) => setNewCrop({ ...newCrop, status: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '2px solid #ddd',
                    borderRadius: '6px',
                    fontSize: '14px',
                    boxSizing: 'border-box'
                  }}
                >
                  <option value="planning">Planning</option>
                  <option value="growing">Growing</option>
                  <option value="harvested">Harvested</option>
                </select>
              </div>

              <div style={{ display: 'flex', gap: '15px', justifyContent: 'flex-end' }}>
                <button
                  type="button"
                  onClick={() => setShowAddCropModal(false)}
                  style={{
                    padding: '12px 25px',
                    background: '#666',
                    color: 'white',
                    border: 'none',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    fontSize: '14px',
                    fontWeight: 'bold'
                  }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  style={{
                    padding: '12px 25px',
                    background: '#4CAF50',
                    color: 'white',
                    border: 'none',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    fontSize: '14px',
                    fontWeight: 'bold'
                  }}
                >
                  Add Crop
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Dashboard;