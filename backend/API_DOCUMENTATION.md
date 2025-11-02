# 📚 Cropsuit API - Complete Documentation

## Base URL
```
http://localhost:5000/api
```

## Authentication

All authenticated endpoints require a Bearer token in the Authorization header:
```
Authorization: Bearer YOUR_JWT_TOKEN
```

---

## 🔐 Authentication Endpoints

### 1. Register User (Local)

**Endpoint**: `POST /auth/register`

**Request Body**:
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

**Response** (201 Created):
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "farmer"
  }
}
```

### 2. Login User (Local)

**Endpoint**: `POST /auth/login`

**Request Body**:
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response** (200 OK):
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "farmer",
    "farmDetails": { ... }
  }
}
```

### 3. Google OAuth

**Endpoint**: `GET /auth/google`

Redirects to Google OAuth consent screen.

### 4. Get Current User

**Endpoint**: `GET /auth/me`

**Headers**: `Authorization: Bearer TOKEN`

**Response** (200 OK):
```json
{
  "success": true,
  "data": {
    "id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com",
    "avatar": "https://...",
    "role": "farmer",
    "farmDetails": {
      "location": { ... },
      "farmSize": 10,
      "soilType": "loamy"
    }
  }
}
```

### 5. Update User Details

**Endpoint**: `PUT /auth/updatedetails`

**Headers**: `Authorization: Bearer TOKEN`

**Request Body**:
```json
{
  "name": "John Smith",
  "farmDetails": {
    "farmSize": 15,
    "soilType": "clay",
    "location": {
      "address": "123 Farm Road",
      "city": "Mumbai",
      "state": "Maharashtra"
    }
  }
}
```

### 6. Logout

**Endpoint**: `GET /auth/logout`

**Headers**: `Authorization: Bearer TOKEN`

---

## 🌾 Crop Management

### 1. Get All Crops

**Endpoint**: `GET /crops`

**Query Parameters**:
- `status` (optional): growing, harvested, planned, failed
- `season` (optional): kharif, rabi, zaid
- `category` (optional): cereals, pulses, vegetables, fruits
- `page` (optional): Page number (default: 1)
- `limit` (optional): Results per page (default: 10)

**Example**: `GET /crops?status=growing&season=kharif&page=1&limit=10`

**Response** (200 OK):
```json
{
  "success": true,
  "count": 5,
  "total": 12,
  "pages": 2,
  "data": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "name": "Rice",
      "variety": "Basmati",
      "category": "cereals",
      "plantingDate": "2024-06-15T00:00:00.000Z",
      "expectedHarvestDate": "2024-10-15T00:00:00.000Z",
      "area": 5,
      "season": "kharif",
      "status": "growing",
      "growthStage": "vegetative",
      "health": {
        "status": "good",
        "issues": []
      },
      "yield": {
        "expected": 50,
        "unit": "quintals"
      },
      "createdAt": "2024-06-01T00:00:00.000Z"
    }
  ]
}
```

### 2. Get Single Crop

**Endpoint**: `GET /crops/:id`

**Response** (200 OK):
```json
{
  "success": true,
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "name": "Rice",
    "variety": "Basmati",
    "category": "cereals",
    "plantingDate": "2024-06-15T00:00:00.000Z",
    "expectedHarvestDate": "2024-10-15T00:00:00.000Z",
    "area": 5,
    "season": "kharif",
    "soilType": "loamy",
    "irrigationMethod": "flood",
    "status": "growing",
    "growthStage": "vegetative",
    "health": {
      "status": "good",
      "issues": []
    },
    "yield": {
      "expected": 50,
      "unit": "quintals"
    },
    "costTracking": {
      "seeds": 5000,
      "fertilizers": 8000,
      "pesticides": 3000,
      "labor": 10000,
      "total": 26000
    },
    "notes": []
  }
}
```

### 3. Create Crop

**Endpoint**: `POST /crops`

**Request Body**:
```json
{
  "name": "Wheat",
  "variety": "HD 2967",
  "category": "cereals",
  "plantingDate": "2024-11-01",
  "expectedHarvestDate": "2025-03-15",
  "area": 8,
  "season": "rabi",
  "soilType": "loamy",
  "irrigationMethod": "drip",
  "status": "planned",
  "yield": {
    "expected": 60
  }
}
```

**Response** (201 Created):
```json
{
  "success": true,
  "data": { ... }
}
```

### 4. Update Crop

**Endpoint**: `PUT /crops/:id`

**Request Body**:
```json
{
  "status": "growing",
  "growthStage": "flowering",
  "health": {
    "status": "good"
  }
}
```

### 5. Delete Crop

**Endpoint**: `DELETE /crops/:id`

**Response** (200 OK):
```json
{
  "success": true,
  "message": "Crop deleted successfully"
}
```

### 6. Add Note to Crop

**Endpoint**: `POST /crops/:id/notes`

**Request Body**:
```json
{
  "content": "Applied NPK fertilizer today"
}
```

### 7. Add Health Issue

**Endpoint**: `POST /crops/:id/health-issues`

**Request Body**:
```json
{
  "type": "pest",
  "description": "Aphid infestation observed",
  "severity": "medium"
}
```

### 8. Get Crop Statistics

**Endpoint**: `GET /crops/stats`

**Response**:
```json
{
  "success": true,
  "data": {
    "byStatus": [
      { "_id": "growing", "count": 5, "totalArea": 25 },
      { "_id": "planned", "count": 3, "totalArea": 15 }
    ],
    "byCategory": [
      { "_id": "cereals", "count": 4 },
      { "_id": "vegetables", "count": 3 }
    ]
  }
}
```

---

## 🌡️ Weather Integration

### 1. Get Current Weather by Coordinates

**Endpoint**: `GET /weather/current`

**Query Parameters**:
- `lat`: Latitude (required)
- `lon`: Longitude (required)

**Example**: `GET /weather/current?lat=28.6139&lon=77.2090`

**Response**:
```json
{
  "success": true,
  "data": {
    "location": {
      "name": "Delhi",
      "country": "IN",
      "coordinates": [77.2090, 28.6139]
    },
    "current": {
      "temperature": 32,
      "feelsLike": 35,
      "humidity": 60,
      "windSpeed": 3.5,
      "rainfall": 0,
      "description": "clear sky"
    },
    "agriculturalAdvice": {
      "irrigation": "High temperature. Increase irrigation frequency.",
      "pestControl": "Regular monitoring recommended.",
      "harvesting": "Good conditions for harvesting.",
      "general": "Weather conditions are favorable."
    }
  }
}
```

### 2. Get Weather Forecast

**Endpoint**: `GET /weather/forecast`

**Query Parameters**:
- `lat`: Latitude (required)
- `lon`: Longitude (required)
- `days`: Number of days (default: 7)

**Response**:
```json
{
  "success": true,
  "data": {
    "location": { ... },
    "daily": [
      {
        "date": "2024-06-20T00:00:00.000Z",
        "temperature": {
          "min": 25,
          "max": 35
        },
        "humidity": 65,
        "rainfall": 5,
        "description": "light rain"
      }
    ]
  }
}
```

### 3. Get Weather by City

**Endpoint**: `GET /weather/city/:cityName`

**Query Parameters**:
- `country`: Country code (optional)

**Example**: `GET /weather/city/Mumbai?country=IN`

---

## 🌱 Fertilizer Recommendations

### 1. Get Recommendations

**Endpoint**: `GET /fertilizer-recommendations`

**Query Parameters**:
- `status`: pending, applied, completed
- `page`, `limit`

### 2. Create Recommendation

**Endpoint**: `POST /fertilizer-recommendations`

**Request Body**:
```json
{
  "cropName": "Rice",
  "soilType": "loamy",
  "soilNutrients": {
    "nitrogen": 250,
    "phosphorus": 10,
    "potassium": 100,
    "pH": 6.5
  },
  "season": "kharif",
  "climateConditions": {
    "temperature": 28,
    "rainfall": 800
  }
}
```

**Response**:
```json
{
  "success": true,
  "data": {
    "_id": "...",
    "recommendations": [
      {
        "fertilizer": {
          "name": "Urea",
          "type": "inorganic",
          "npkRatio": "46-0-0"
        },
        "quantity": {
          "value": 130,
          "unit": "kg/acre"
        },
        "applicationMethod": "broadcasting",
        "applicationStage": "At sowing and 30 days after",
        "estimatedCost": 1500,
        "benefits": [
          "Promotes vegetative growth",
          "Increases protein content"
        ]
      }
    ],
    "totalEstimatedCost": 5000
  }
}
```

---

## 🎯 Crop Recommendations

### 1. Create Recommendation

**Endpoint**: `POST /crop-recommendations`

**Request Body**:
```json
{
  "season": "kharif",
  "soilType": "loamy",
  "soilNutrients": {
    "nitrogen": 280,
    "phosphorus": 12,
    "potassium": 120,
    "pH": 6.8
  },
  "availableArea": 10,
  "irrigationAvailable": true,
  "climateData": {
    "averageTemperature": 28,
    "rainfall": 800,
    "humidity": 70
  }
}
```

**Response**:
```json
{
  "success": true,
  "data": {
    "_id": "...",
    "recommendations": [
      {
        "cropName": "Rice",
        "variety": "Basmati",
        "category": "cereals",
        "suitabilityScore": 85,
        "reasoning": "Well-suited for kharif in loamy soil",
        "advantages": [
          "High market demand",
          "Suitable for loamy soil"
        ],
        "estimatedYield": {
          "value": 45,
          "unit": "quintals/acre"
        },
        "estimatedIncome": 75000,
        "growthDuration": {
          "value": 120,
          "unit": "days"
        },
        "waterRequirement": "high",
        "marketDemand": "high",
        "riskLevel": "low"
      }
    ]
  }
}
```

---

## 📅 Seasonal Planning

### 1. Get All Plans

**Endpoint**: `GET /seasonal-plans`

**Query Parameters**:
- `status`: draft, active, completed
- `season`: kharif, rabi, zaid
- `year`: 2024

### 2. Create Plan

**Endpoint**: `POST /seasonal-plans`

**Request Body**:
```json
{
  "year": 2024,
  "season": "kharif",
  "planName": "Kharif 2024 Plan",
  "description": "Complete planning for kharif season",
  "startDate": "2024-06-01",
  "endDate": "2024-11-30",
  "totalArea": 15,
  "crops": [
    {
      "cropName": "Rice",
      "allocatedArea": 10,
      "expectedYield": 50,
      "estimatedCost": 50000,
      "expectedRevenue": 100000,
      "priority": "high"
    }
  ],
  "financials": {
    "totalBudget": 75000
  },
  "milestones": [
    {
      "title": "Complete Land Preparation",
      "targetDate": "2024-06-15"
    }
  ]
}
```

### 3. Add Milestone

**Endpoint**: `POST /seasonal-plans/:id/milestones`

**Request Body**:
```json
{
  "title": "Complete Sowing",
  "description": "Finish sowing all crops",
  "targetDate": "2024-07-15"
}
```

### 4. Add Note

**Endpoint**: `POST /seasonal-plans/:id/notes`

**Request Body**:
```json
{
  "content": "Weather looking favorable for next week"
}
```

---

## 🚫 Error Responses

### 400 Bad Request
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    {
      "field": "email",
      "message": "Please provide a valid email"
    }
  ]
}
```

### 401 Unauthorized
```json
{
  "success": false,
  "message": "Not authorized to access this route. Please login."
}
```

### 404 Not Found
```json
{
  "success": false,
  "message": "Resource not found"
}
```

### 500 Server Error
```json
{
  "success": false,
  "message": "Server Error"
}
```

---

For more details, visit the running API at `http://localhost:5000/api`
