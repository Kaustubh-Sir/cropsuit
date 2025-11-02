import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout, isAuthenticated } = useAuth();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  // Check if current path is active
  const isActive = (path) => location.pathname === path;

  return (
    <nav style={{
      position: 'sticky',
      top: 0,
      width: '100%',
      background: 'rgba(255, 255, 255, 0.98)',
      boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
      zIndex: 1000,
      padding: '15px 0'
    }}>
      <div style={{
        maxWidth: '1400px',
        margin: '0 auto',
        padding: '0 20px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        {/* Logo/Brand */}
        <div 
          onClick={() => navigate('/home')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            cursor: 'pointer'
          }}
        >
          <span style={{ fontSize: '28px' }}>🌾</span>
          <span style={{ 
            fontSize: '22px', 
            fontWeight: 'bold',
            color: '#2e7d32'
          }}>
            CropSuit
          </span>
        </div>

        {/* Navigation Links */}
        <div style={{
          display: 'flex',
          gap: '10px',
          alignItems: 'center'
        }}>
          <button
            onClick={() => navigate('/home')}
            style={{
              padding: '10px 20px',
              background: isActive('/home') ? '#4CAF50' : 'transparent',
              color: isActive('/home') ? 'white' : '#333',
              border: isActive('/home') ? 'none' : '2px solid #4CAF50',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: '600',
              transition: 'all 0.3s ease'
            }}
          >
            🏠 Home
          </button>

          {isAuthenticated && (
            <>
              <button
                onClick={() => navigate('/dashboard')}
                style={{
                  padding: '10px 20px',
                  background: isActive('/dashboard') ? '#4CAF50' : 'transparent',
                  color: isActive('/dashboard') ? 'white' : '#333',
                  border: isActive('/dashboard') ? 'none' : '2px solid #4CAF50',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontSize: '14px',
                  fontWeight: '600',
                  transition: 'all 0.3s ease'
                }}
              >
                📊 Dashboard
              </button>

              <button
                onClick={() => navigate('/crop-recommendations')}
                style={{
                  padding: '10px 20px',
                  background: isActive('/crop-recommendations') ? '#2196F3' : 'transparent',
                  color: isActive('/crop-recommendations') ? 'white' : '#333',
                  border: isActive('/crop-recommendations') ? 'none' : '2px solid #2196F3',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontSize: '14px',
                  fontWeight: '600',
                  transition: 'all 0.3s ease'
                }}
              >
                🌾 Crops
              </button>

              <button
                onClick={() => navigate('/weather-integration')}
                style={{
                  padding: '10px 20px',
                  background: isActive('/weather-integration') ? '#9C27B0' : 'transparent',
                  color: isActive('/weather-integration') ? 'white' : '#333',
                  border: isActive('/weather-integration') ? 'none' : '2px solid #9C27B0',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontSize: '14px',
                  fontWeight: '600',
                  transition: 'all 0.3s ease'
                }}
              >
                🌤️ Weather
              </button>

              <button
                onClick={() => navigate('/fertilizer-guidance')}
                style={{
                  padding: '10px 20px',
                  background: isActive('/fertilizer-guidance') ? '#FF9800' : 'transparent',
                  color: isActive('/fertilizer-guidance') ? 'white' : '#333',
                  border: isActive('/fertilizer-guidance') ? 'none' : '2px solid #FF9800',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontSize: '14px',
                  fontWeight: '600',
                  transition: 'all 0.3s ease'
                }}
              >
                🧪 Fertilizer
              </button>

              <button
                onClick={() => navigate('/seasonal-planning')}
                style={{
                  padding: '10px 20px',
                  background: isActive('/seasonal-planning') ? '#00BCD4' : 'transparent',
                  color: isActive('/seasonal-planning') ? 'white' : '#333',
                  border: isActive('/seasonal-planning') ? 'none' : '2px solid #00BCD4',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontSize: '14px',
                  fontWeight: '600',
                  transition: 'all 0.3s ease'
                }}
              >
                📅 Planning
              </button>
            </>
          )}

          {isAuthenticated ? (
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '15px',
              marginLeft: '20px',
              paddingLeft: '20px',
              borderLeft: '2px solid #e0e0e0'
            }}>
              <span style={{ 
                fontSize: '14px', 
                color: '#666',
                fontWeight: '500'
              }}>
                👤 {user?.name || 'User'}
              </span>
              <button
                onClick={handleLogout}
                style={{
                  padding: '10px 20px',
                  background: '#f44336',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontSize: '14px',
                  fontWeight: '600',
                  transition: 'all 0.3s ease'
                }}
              >
                Logout
              </button>
            </div>
          ) : (
            <div style={{ display: 'flex', gap: '10px', marginLeft: '20px' }}>
              <button
                onClick={() => navigate('/login')}
                style={{
                  padding: '10px 20px',
                  background: '#4CAF50',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontSize: '14px',
                  fontWeight: '600',
                  transition: 'all 0.3s ease'
                }}
              >
                Login
              </button>
              <button
                onClick={() => navigate('/register')}
                style={{
                  padding: '10px 20px',
                  background: 'transparent',
                  color: '#4CAF50',
                  border: '2px solid #4CAF50',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontSize: '14px',
                  fontWeight: '600',
                  transition: 'all 0.3s ease'
                }}
              >
                Register
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;