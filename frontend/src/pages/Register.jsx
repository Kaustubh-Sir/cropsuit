import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setLoading(true);

    const result = await register(
      formData.name, 
      formData.email, 
      formData.password
    );
    
    if (result.success) {
      navigate('/home');
    } else {
      setError(result.error);
    }
    
    setLoading(false);
  };

  return (
    <div style={{ 
      width: '100vw',
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #1a8e01ff 0%, #008f0cff 100%)',
      margin: 0,
      padding: '20px',
      boxSizing: 'border-box',
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0
    }}>
      <div style={{ 
        maxWidth: '500px',
        width: '100%',
        padding: '50px 40px',
        background: 'white',
        borderRadius: '16px',
        boxShadow: '0 20px 60px rgba(0,0,0,0.3)'
      }}>
        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
          <h2 style={{ 
            margin: 0,
            marginBottom: '10px',
            fontSize: '32px',
            color: '#19d225ff'
          }}>
            🌾 Join CropSuit
          </h2>
          <p style={{ 
            margin: 0,
            color: '#666',
            fontSize: '16px'
          }}>
            Create your account to get started
          </p>
        </div>
        
        {error && (
          <div style={{ 
            padding: '15px', 
            background: '#fee', 
            color: '#c00',
            borderRadius: '8px',
            marginBottom: '25px',
            fontSize: '14px',
            border: '1px solid #fcc'
          }}>
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '20px' }}>
            <label style={{ 
              display: 'block',
              marginBottom: '8px',
              color: '#333',
              fontSize: '14px',
              fontWeight: '600'
            }}>
              Full Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              style={{
                width: '100%',
                padding: '14px',
                border: '2px solid #ddd',
                borderRadius: '8px',
                fontSize: '15px',
                boxSizing: 'border-box',
                transition: 'border 0.3s',
                background: 'white',
                color: '#333'
              }}
              onFocus={(e) => e.target.style.borderColor = '#21f344ff'}
              onBlur={(e) => e.target.style.borderColor = '#ddd'}
              placeholder="Enter your full name"
            />
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={{ 
              display: 'block',
              marginBottom: '8px',
              color: '#333',
              fontSize: '14px',
              fontWeight: '600'
            }}>
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              style={{
                width: '100%',
                padding: '14px',
                border: '2px solid #ddd',
                borderRadius: '8px',
                fontSize: '15px',
                boxSizing: 'border-box',
                transition: 'border 0.3s',
                background: 'white',
                color: '#333'
              }}
              onFocus={(e) => e.target.style.borderColor = '#21f360ff'}
              onBlur={(e) => e.target.style.borderColor = '#ddd'}
              placeholder="Enter your email"
            />
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={{ 
              display: 'block',
              marginBottom: '8px',
              color: '#333',
              fontSize: '14px',
              fontWeight: '600'
            }}>
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              minLength="6"
              style={{
                width: '100%',
                padding: '14px',
                border: '2px solid #ddd',
                borderRadius: '8px',
                fontSize: '15px',
                boxSizing: 'border-box',
                transition: 'border 0.3s',
                background: 'white',
                color: '#333'
              }}
              onFocus={(e) => e.target.style.borderColor = '#21f34fff'}
              onBlur={(e) => e.target.style.borderColor = '#ddd'}
              placeholder="At least 6 characters"
            />
          </div>

          <div style={{ marginBottom: '25px' }}>
            <label style={{ 
              display: 'block',
              marginBottom: '8px',
              color: '#333',
              fontSize: '14px',
              fontWeight: '600'
            }}>
              Confirm Password
            </label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              style={{
                width: '100%',
                padding: '14px',
                border: '2px solid #ddd',
                borderRadius: '8px',
                fontSize: '15px',
                boxSizing: 'border-box',
                transition: 'border 0.3s',
                background: 'white',
                color: '#333'
              }}
              onFocus={(e) => e.target.style.borderColor = '#21f36bff'}
              onBlur={(e) => e.target.style.borderColor = '#ddd'}
              placeholder="Re-enter your password"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%',
              padding: '15px',
              background: loading ? '#ccc' : 'linear-gradient(135deg, #00aa0bff 0%, #0fdd46ff 100%)',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              fontSize: '16px',
              fontWeight: 'bold',
              cursor: loading ? 'not-allowed' : 'pointer',
              transition: 'transform 0.2s'
            }}
            onMouseEnter={(e) => {
              if (!loading) e.target.style.transform = 'scale(1.02)';
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'scale(1)';
            }}
          >
            {loading ? 'Creating Account...' : 'Create Account'}
          </button>
        </form>

        <div style={{ 
          marginTop: '30px',
          textAlign: 'center',
          fontSize: '14px',
          color: '#666'
        }}>
          Already have an account?{' '}
          <Link 
            to="/login" 
            style={{ 
              color: 'green',
              textDecoration: 'none',
              fontWeight: 'bold'
            }}
          >
            Login here
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Register;