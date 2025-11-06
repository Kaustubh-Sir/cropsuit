const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const connectDB = require('./config/database');
const errorHandler = require('./middleware/errorHandler');
const passport = require('./config/passport');

// Load environment variables

// Connect to database
connectDB();

// Initialize express app
const app = express();

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Cookie parser
app.use(cookieParser());

// CORS configuration
const corsOptions = {
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true,
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

// Initialize Passport
app.use(passport.initialize());

// Import routes
const authRoutes = require('./routes/authRoutes');
const cropRoutes = require('./routes/cropRoutes');
const fertilizerRoutes = require('./routes/fertilizerRoutes');
const weatherRoutes = require('./routes/weatherRoutes');
const cropRecommendationRoutes = require('./routes/cropRecommendationRoutes');
const seasonalPlanRoutes = require('./routes/seasonalPlanRoutes');
const farmonautRoutes = require('./routes/farmonautRoutes');

// Mount routes
app.use('/api/auth', authRoutes);
app.use('/api/crops', cropRoutes);
app.use('/api/fertilizer-recommendations', fertilizerRoutes);
app.use('/api/weather', weatherRoutes);
app.use('/api/crop-recommendations', cropRecommendationRoutes);
app.use('/api/seasonal-plans', seasonalPlanRoutes);
app.use('/api/farmonaut', farmonautRoutes);

// Health check route
app.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Cropsuit API is running',
    version: '1.0.0',
  });
});

// API documentation route
app.get('/api', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Cropsuit API',
    version: '1.0.0',
    endpoints: {
      auth: {
        register: 'POST /api/auth/register',
        login: 'POST /api/auth/login',
        googleAuth: 'GET /api/auth/google',
        me: 'GET /api/auth/me',
        updateDetails: 'PUT /api/auth/updatedetails',
        updatePassword: 'PUT /api/auth/updatepassword',
        logout: 'GET /api/auth/logout',
      },
      crops: {
        getAll: 'GET /api/crops',
        getOne: 'GET /api/crops/:id',
        create: 'POST /api/crops',
        update: 'PUT /api/crops/:id',
        delete: 'DELETE /api/crops/:id',
        stats: 'GET /api/crops/stats',
        addNote: 'POST /api/crops/:id/notes',
        addHealthIssue: 'POST /api/crops/:id/health-issues',
      },
      fertilizerRecommendations: {
        getAll: 'GET /api/fertilizer-recommendations',
        getOne: 'GET /api/fertilizer-recommendations/:id',
        create: 'POST /api/fertilizer-recommendations',
        update: 'PUT /api/fertilizer-recommendations/:id',
        delete: 'DELETE /api/fertilizer-recommendations/:id',
      },
      weather: {
        current: 'GET /api/weather/current?lat=&lon=',
        forecast: 'GET /api/weather/forecast?lat=&lon=&days=',
        byCity: 'GET /api/weather/city/:cityName?country=',
        history: 'GET /api/weather/history',
        alerts: 'GET /api/weather/alerts?lat=&lon=',
      },
      cropRecommendations: {
        getAll: 'GET /api/crop-recommendations',
        getOne: 'GET /api/crop-recommendations/:id',
        create: 'POST /api/crop-recommendations',
        update: 'PUT /api/crop-recommendations/:id',
        delete: 'DELETE /api/crop-recommendations/:id',
      },
      seasonalPlans: {
        getAll: 'GET /api/seasonal-plans',
        getOne: 'GET /api/seasonal-plans/:id',
        create: 'POST /api/seasonal-plans',
        update: 'PUT /api/seasonal-plans/:id',
        delete: 'DELETE /api/seasonal-plans/:id',
        stats: 'GET /api/seasonal-plans/stats',
        addMilestone: 'POST /api/seasonal-plans/:id/milestones',
        updateMilestone: 'PUT /api/seasonal-plans/:id/milestones/:milestoneId',
        addNote: 'POST /api/seasonal-plans/:id/notes',
      },
      farmonaut: {
        cropRecommendations: 'GET /api/farmonaut/crop-recommendations',
        weather: 'GET /api/farmonaut/weather',
        fertilizerRecommendations: 'GET /api/farmonaut/fertilizer-recommendations',
        satelliteData: 'GET /api/farmonaut/satellite-data',
        comprehensiveData: 'GET /api/farmonaut/comprehensive-data',
      },
    },
  });
});

// 404 handler
app.use((req, res, next) => {
  res.status(404).json({
    success: false,
    message: 'Route not found',
  });
});

// Error handler middleware (must be last)
app.use(errorHandler);

// Only start server if not in serverless environment (Vercel)
if (process.env.VERCEL !== '1') {
  const PORT = process.env.PORT || 5000;
  const server = app.listen(PORT, () => {
    console.log(`
  ╔═══════════════════════════════════════════════════════╗
  ║                                                       ║
  ║   🌾 CROPSUIT API SERVER                             ║
  ║                                                       ║
  ║   Server running in ${process.env.NODE_ENV || 'development'} mode                    ║
  ║   Port: ${PORT}                                       ║
  ║   URL: http://localhost:${PORT}                       ║
  ║                                                       ║
  ║   📚 API Documentation: http://localhost:${PORT}/api  ║
  ║                                                       ║
  ╚═══════════════════════════════════════════════════════╝
    `);
  });

  // Handle unhandled promise rejections
  process.on('unhandledRejection', (err, promise) => {
    console.log(`❌ Error: ${err.message}`);
    // Close server & exit process
    server.close(() => process.exit(1));
  });
}

// Export app for Vercel serverless functions
module.exports = app;