import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import Login from './pages/Login';
import Register from './pages/Register';
import AuthSuccess from './pages/AuthSuccess';
import Dashboard from './pages/Dashboard';
import Home from './pages/Home';
import About from './pages/About';
import Features from './pages/Features';
import CropRecommendations from './pages/CropRecommendations';
import FertilizerGuidance from './pages/FertilizerGuidance';
import SeasonalPlanning from './pages/SeasonalPlanning';
import WeatherIntegration from './pages/WeatherIntegration';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh',
        fontSize: '18px',
        background: '#f5f5f5'
      }}>
        Loading Cropsuit...
      </div>
    );
  }

  return (
    <Routes>
      {/* Default Route - Login page for unauthenticated, Dashboard for authenticated */}
      <Route 
        path="/" 
        element={
          isAuthenticated ? <Navigate to="/home" /> : <Navigate to="/login" />
        } 
      />

      {/* Public Routes */}
      <Route path="/home" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/features" element={<Features />} />
      
      {/* Auth Routes - Redirect to home if already authenticated */}
      <Route 
        path="/login" 
        element={isAuthenticated ? <Navigate to="/home" /> : <Login />} 
      />
      <Route 
        path="/register" 
        element={isAuthenticated ? <Navigate to="/home" /> : <Register />} 
      />
      <Route path="/auth/success" element={<AuthSuccess />} />

      {/* Protected Routes - Require authentication */}
      <Route 
        path="/dashboard" 
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } 
      />
      
      <Route 
        path="/crop-recommendations" 
        element={
          <ProtectedRoute>
            <CropRecommendations />
          </ProtectedRoute>
        } 
      />
      
      <Route 
        path="/fertilizer-guidance" 
        element={
          <ProtectedRoute>
            <FertilizerGuidance />
          </ProtectedRoute>
        } 
      />
      
      <Route 
        path="/seasonal-planning" 
        element={
          <ProtectedRoute>
            <SeasonalPlanning />
          </ProtectedRoute>
        } 
      />
      
      <Route 
        path="/weather-integration" 
        element={
          <ProtectedRoute>
            <WeatherIntegration />
          </ProtectedRoute>
        } 
      />

      {/* 404 - Catch all */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default App;