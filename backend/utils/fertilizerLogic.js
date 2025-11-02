// Fertilizer recommendation logic based on crop and soil nutrient levels

const fertilizerDatabase = {
  Rice: {
    optimalNPK: { N: 120, P: 60, K: 40 },
    stages: [
      { stage: 'Basal', days: 0, npk: '20-20-0', quantity: 100 },
      { stage: 'Tillering', days: 25, npk: '46-0-0', quantity: 50 },
      { stage: 'Panicle Initiation', days: 45, npk: '46-0-0', quantity: 50 },
    ],
  },
  Wheat: {
    optimalNPK: { N: 100, P: 50, K: 30 },
    stages: [
      { stage: 'Basal', days: 0, npk: '12-32-16', quantity: 150 },
      { stage: 'Crown Root', days: 21, npk: '46-0-0', quantity: 70 },
      { stage: 'Flowering', days: 60, npk: '46-0-0', quantity: 30 },
    ],
  },
  Cotton: {
    optimalNPK: { N: 120, P: 60, K: 60 },
    stages: [
      { stage: 'Basal', days: 0, npk: '12-32-16', quantity: 125 },
      { stage: 'Squaring', days: 30, npk: '46-0-0', quantity: 75 },
      { stage: 'Flowering', days: 60, npk: '0-0-60', quantity: 50 },
    ],
  },
  Maize: {
    optimalNPK: { N: 150, P: 75, K: 50 },
    stages: [
      { stage: 'Basal', days: 0, npk: '12-32-16', quantity: 140 },
      { stage: 'Knee High', days: 30, npk: '46-0-0', quantity: 100 },
      { stage: 'Tasseling', days: 50, npk: '46-0-0', quantity: 60 },
    ],
  },
  Sugarcane: {
    optimalNPK: { N: 250, P: 115, K: 115 },
    stages: [
      { stage: 'Planting', days: 0, npk: '12-32-16', quantity: 300 },
      { stage: 'Tillering', days: 45, npk: '46-0-0', quantity: 150 },
      { stage: 'Grand Growth', days: 90, npk: '46-0-0', quantity: 150 },
    ],
  },
  Potato: {
    optimalNPK: { N: 180, P: 80, K: 100 },
    stages: [
      { stage: 'Basal', days: 0, npk: '19-19-19', quantity: 200 },
      { stage: 'Tuber Initiation', days: 30, npk: '0-0-60', quantity: 100 },
    ],
  },
  Tomato: {
    optimalNPK: { N: 150, P: 100, K: 100 },
    stages: [
      { stage: 'Basal', days: 0, npk: '19-19-19', quantity: 180 },
      { stage: 'Flowering', days: 25, npk: '13-0-45', quantity: 100 },
      { stage: 'Fruiting', days: 45, npk: '13-0-45', quantity: 100 },
    ],
  },
};

function generateFertilizerRecommendation(cropName, soilData) {
  const { nitrogen, phosphorus, potassium, pH } = soilData;
  
  const cropRequirements = fertilizerDatabase[cropName] || fertilizerDatabase.Wheat;
  
  // Calculate deficiencies
  const nDeficiency = Math.max(0, cropRequirements.optimalNPK.N - nitrogen);
  const pDeficiency = Math.max(0, cropRequirements.optimalNPK.P - phosphorus);
  const kDeficiency = Math.max(0, cropRequirements.optimalNPK.K - potassium);
  
  // Generate recommendations
  const recommendations = [];
  let totalCost = 0;
  
  // Basal fertilizer
  if (nDeficiency > 0 || pDeficiency > 0 || kDeficiency > 0) {
    recommendations.push({
      fertilizerName: 'NPK Complex',
      type: 'Inorganic',
      quantity: calculateNPKQuantity(nDeficiency, pDeficiency, kDeficiency),
      unit: 'kg',
      npkRatio: '12-32-16',
      applicationMethod: 'Broadcasting',
      applicationTiming: 'At the time of sowing/planting',
      frequency: 'One time',
      estimatedCost: 1200,
    });
    totalCost += 1200;
  }
  
  // Nitrogen top dressing
  if (nDeficiency > 50) {
    recommendations.push({
      fertilizerName: 'Urea',
      type: 'Inorganic',
      quantity: Math.round((nDeficiency * 0.46) / 0.46), // Urea contains 46% N
      unit: 'kg',
      npkRatio: '46-0-0',
      applicationMethod: 'Side-dressing',
      applicationTiming: '25-30 days after sowing',
      frequency: '1-2 times',
      estimatedCost: 600,
    });
    totalCost += 600;
  }
  
  // Potassium supplementation
  if (kDeficiency > 30) {
    recommendations.push({
      fertilizerName: 'Muriate of Potash',
      type: 'Inorganic',
      quantity: Math.round((kDeficiency * 1.67)), // MOP contains 60% K2O
      unit: 'kg',
      npkRatio: '0-0-60',
      applicationMethod: 'Broadcasting',
      applicationTiming: 'Before flowering',
      frequency: 'One time',
      estimatedCost: 800,
    });
    totalCost += 800;
  }
  
  // Organic matter recommendation
  recommendations.push({
    fertilizerName: 'Farm Yard Manure (FYM)',
    type: 'Organic',
    quantity: 5,
    unit: 'tons',
    npkRatio: 'Variable',
    applicationMethod: 'Broadcasting',
    applicationTiming: '2-3 weeks before sowing',
    frequency: 'One time',
    estimatedCost: 2000,
  });
  totalCost += 2000;
  
  // pH correction if needed
  let customAdvice = '';
  if (pH < 5.5) {
    customAdvice = 'Soil is acidic. Apply 2-3 tons of lime per acre to raise pH. ';
    recommendations.push({
      fertilizerName: 'Agricultural Lime',
      type: 'Organic',
      quantity: 2.5,
      unit: 'tons',
      npkRatio: 'N/A',
      applicationMethod: 'Broadcasting',
      applicationTiming: '1 month before sowing',
      frequency: 'One time',
      estimatedCost: 1500,
    });
    totalCost += 1500;
  } else if (pH > 8) {
    customAdvice = 'Soil is alkaline. Apply gypsum or sulfur to lower pH. ';
    recommendations.push({
      fertilizerName: 'Gypsum',
      type: 'Organic',
      quantity: 2,
      unit: 'tons',
      npkRatio: 'N/A',
      applicationMethod: 'Broadcasting',
      applicationTiming: '1 month before sowing',
      frequency: 'One time',
      estimatedCost: 1200,
    });
    totalCost += 1200;
  }
  
  // Generate application schedule
  const applicationSchedule = cropRequirements.stages.map((stage, index) => ({
    stage: stage.stage,
    days: stage.days,
    fertilizers: `${stage.npk} @ ${stage.quantity} kg/acre`,
    notes: index === 0 ? 'Apply with soil preparation' : 'Apply as top dressing',
  }));
  
  customAdvice += `For ${cropName}, maintain adequate moisture during fertilizer application. `;
  customAdvice += `Current soil nutrients - N: ${nitrogen} kg/ha, P: ${phosphorus} kg/ha, K: ${potassium} kg/ha. `;
  
  return {
    recommendations,
    customAdvice,
    applicationSchedule,
    totalEstimatedCost: totalCost,
  };
}

function calculateNPKQuantity(nDef, pDef, kDef) {
  // Simplified calculation - assumes 12-32-16 NPK
  const n = nDef / 0.12;
  const p = pDef / 0.32;
  const k = kDef / 0.16;
  
  return Math.round(Math.max(n, p, k));
}

module.exports = { generateFertilizerRecommendation };
