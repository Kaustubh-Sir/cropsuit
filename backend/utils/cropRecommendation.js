// Crop recommendation logic based on soil type, season, and climate

const cropDatabase = {
  Rice: {
    soilTypes: ['Clay', 'Loamy'],
    seasons: ['Kharif'],
    minRainfall: 1000, // mm
    tempRange: { min: 20, max: 35 },
    waterRequirement: 'High',
    profitability: 'Medium',
  },
  Wheat: {
    soilTypes: ['Loamy', 'Clay'],
    seasons: ['Rabi'],
    minRainfall: 400,
    tempRange: { min: 10, max: 25 },
    waterRequirement: 'Medium',
    profitability: 'High',
  },
  Cotton: {
    soilTypes: ['Clay', 'Loamy'],
    seasons: ['Kharif'],
    minRainfall: 600,
    tempRange: { min: 21, max: 35 },
    waterRequirement: 'Medium',
    profitability: 'High',
  },
  Maize: {
    soilTypes: ['Loamy', 'Sandy'],
    seasons: ['Kharif', 'Rabi'],
    minRainfall: 500,
    tempRange: { min: 20, max: 30 },
    waterRequirement: 'Medium',
    profitability: 'Medium',
  },
  Sugarcane: {
    soilTypes: ['Loamy', 'Clay'],
    seasons: ['Year-round'],
    minRainfall: 1500,
    tempRange: { min: 20, max: 35 },
    waterRequirement: 'Very High',
    profitability: 'High',
  },
  Soybean: {
    soilTypes: ['Loamy', 'Clay'],
    seasons: ['Kharif'],
    minRainfall: 600,
    tempRange: { min: 20, max: 32 },
    waterRequirement: 'Medium',
    profitability: 'Medium',
  },
  Chickpea: {
    soilTypes: ['Loamy', 'Clay'],
    seasons: ['Rabi'],
    minRainfall: 400,
    tempRange: { min: 15, max: 30 },
    waterRequirement: 'Low',
    profitability: 'High',
  },
  Groundnut: {
    soilTypes: ['Sandy', 'Loamy'],
    seasons: ['Kharif', 'Rabi'],
    minRainfall: 500,
    tempRange: { min: 20, max: 30 },
    waterRequirement: 'Medium',
    profitability: 'High',
  },
  Potato: {
    soilTypes: ['Loamy', 'Sandy'],
    seasons: ['Rabi'],
    minRainfall: 500,
    tempRange: { min: 15, max: 25 },
    waterRequirement: 'High',
    profitability: 'High',
  },
  Tomato: {
    soilTypes: ['Loamy', 'Sandy'],
    seasons: ['Year-round'],
    minRainfall: 600,
    tempRange: { min: 20, max: 30 },
    waterRequirement: 'High',
    profitability: 'High',
  },
};

function generateCropRecommendations(params) {
  const { soilType, season, climate, farmSize, budget } = params;
  
  const recommendations = [];
  
  for (const [cropName, cropData] of Object.entries(cropDatabase)) {
    let score = 0;
    const reasons = [];
    
    // Check soil compatibility
    if (cropData.soilTypes.includes(soilType)) {
      score += 30;
      reasons.push(`Suitable for ${soilType} soil`);
    }
    
    // Check season compatibility
    if (cropData.seasons.includes(season) || cropData.seasons.includes('Year-round')) {
      score += 30;
      reasons.push(`Ideal for ${season} season`);
    }
    
    // Add profitability score
    const profitScores = { 'Low': 5, 'Medium': 10, 'High': 20 };
    score += profitScores[cropData.profitability] || 0;
    
    // Add water requirement consideration
    if (cropData.waterRequirement === 'Low') {
      score += 10;
      reasons.push('Low water requirement');
    } else if (cropData.waterRequirement === 'Medium') {
      score += 5;
    }
    
    // Only recommend crops with score > 40
    if (score > 40) {
      recommendations.push({
        cropName,
        score,
        suitabilityPercentage: Math.min(score, 100),
        reasons,
        details: {
          soilTypes: cropData.soilTypes,
          seasons: cropData.seasons,
          waterRequirement: cropData.waterRequirement,
          profitability: cropData.profitability,
          temperatureRange: cropData.tempRange,
        },
        estimatedYield: getEstimatedYield(cropName, soilType, season),
        estimatedCostPerAcre: getEstimatedCost(cropName),
        estimatedRevenuePerAcre: getEstimatedRevenue(cropName),
      });
    }
  }
  
  // Sort by score (descending)
  recommendations.sort((a, b) => b.score - a.score);
  
  return {
    totalRecommendations: recommendations.length,
    recommendations: recommendations.slice(0, 10), // Top 10
    parameters: { soilType, season, climate, farmSize, budget },
  };
}

function getEstimatedYield(cropName, soilType, season) {
  // Simplified yield estimation - in production, use ML model
  const baseYields = {
    Rice: 25, Wheat: 20, Cotton: 8, Maize: 30,
    Sugarcane: 350, Soybean: 12, Chickpea: 10,
    Groundnut: 15, Potato: 200, Tomato: 250,
  };
  
  return {
    value: baseYields[cropName] || 20,
    unit: 'quintals/acre',
  };
}

function getEstimatedCost(cropName) {
  // Simplified cost estimation - in production, use real market data
  const baseCosts = {
    Rice: 25000, Wheat: 20000, Cotton: 30000, Maize: 18000,
    Sugarcane: 60000, Soybean: 20000, Chickpea: 15000,
    Groundnut: 22000, Potato: 40000, Tomato: 50000,
  };
  
  return baseCosts[cropName] || 20000; // INR
}

function getEstimatedRevenue(cropName) {
  // Simplified revenue estimation
  const baseRevenue = {
    Rice: 45000, Wheat: 35000, Cotton: 55000, Maize: 35000,
    Sugarcane: 120000, Soybean: 40000, Chickpea: 35000,
    Groundnut: 45000, Potato: 80000, Tomato: 100000,
  };
  
  return baseRevenue[cropName] || 35000; // INR
}

module.exports = { generateCropRecommendations };
