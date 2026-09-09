import { ADVERTISING_DATA, AdvertisingRecord } from '@/data/advertising-data';

// Polynomial Regression Model Parameters (Degree = 2, trained on advertising.csv split)
// Features order: ['TV', 'Radio', 'Newspaper', 'TV^2', 'TV*Radio', 'TV*Newspaper', 'Radio^2', 'Radio*Newspaper', 'Newspaper^2']
export const MODEL_INTERCEPT = 5.15094346192868;

export const MODEL_COEFFICIENTS = {
  tv: 0.0762164938449837,
  radio: -0.03198383190123614,
  newspaper: -0.0019202454090269507,
  tv_sq: -0.00010580787687798632,
  tv_radio: 0.0004185397070934848,
  tv_news: -0.000025541550730072676,
  radio_sq: 0.0014482031076616902,
  radio_news: 0.00016469149749429908,
  news_sq: 0.00008526841253749146,
};

export const MODEL_METRICS = {
  r2: 0.9533,
  r2Percentage: 95.33,
  mae: 0.9034,
  mse: 1.4425,
  rmse: 1.2011,
  degree: 2,
  trainRatio: 0.8,
  testRatio: 0.2,
  totalSamples: 200,
  featuresCount: 9,
  targetVariable: 'Sales (in $1,000s)',
  features: ['TV', 'Radio', 'Newspaper', 'TV²', 'TV × Radio', 'TV × Newspaper', 'Radio²', 'Radio × Newspaper', 'Newspaper²'],
};

export interface PredictionResult {
  tv: number;
  radio: number;
  newspaper: number;
  predictedSales: number;
  predictedRevenue: number; // in $
  totalBudget: number;
  roiPercentage: number;
  efficiencyScore: number;
  channelImpact: {
    tvContribution: number;
    radioContribution: number;
    newspaperContribution: number;
    tvShare: number;
    radioShare: number;
    newspaperShare: number;
  };
  recommendations: string[];
}

/**
 * Predicts sales based on TV, Radio, and Newspaper advertising budgets.
 * Budgets are provided in $1,000s (e.g. 150 = $150,000).
 */
export function predictSales(tv: number, radio: number, newspaper: number): PredictionResult {
  const safeTV = Math.max(0, tv);
  const safeRadio = Math.max(0, radio);
  const safeNews = Math.max(0, newspaper);

  const tv_sq = safeTV * safeTV;
  const tv_radio = safeTV * safeRadio;
  const tv_news = safeTV * safeNews;
  const radio_sq = safeRadio * safeRadio;
  const radio_news = safeRadio * safeNews;
  const news_sq = safeNews * safeNews;

  let rawPrediction =
    MODEL_INTERCEPT +
    MODEL_COEFFICIENTS.tv * safeTV +
    MODEL_COEFFICIENTS.radio * safeRadio +
    MODEL_COEFFICIENTS.newspaper * safeNews +
    MODEL_COEFFICIENTS.tv_sq * tv_sq +
    MODEL_COEFFICIENTS.tv_radio * tv_radio +
    MODEL_COEFFICIENTS.tv_news * tv_news +
    MODEL_COEFFICIENTS.radio_sq * radio_sq +
    MODEL_COEFFICIENTS.radio_news * radio_news +
    MODEL_COEFFICIENTS.news_sq * news_sq;

  // Sales cannot be negative
  const predictedSales = Math.max(0, Math.round(rawPrediction * 100) / 100);
  const totalBudget = Math.round((safeTV + safeRadio + safeNews) * 100) / 100;
  
  // Sales in thousands -> e.g. 15.91 = 15,910 units or $159,100 revenue (assuming $10/unit avg)
  const estimatedRevenue = predictedSales * 10000;
  const totalBudgetDollars = totalBudget * 1000;
  const roiPercentage = totalBudgetDollars > 0 
    ? Math.round(((estimatedRevenue - totalBudgetDollars) / totalBudgetDollars) * 100)
    : 0;

  // Calculate marginal channel contributions
  const tvContrib = Math.max(0, MODEL_COEFFICIENTS.tv * safeTV + MODEL_COEFFICIENTS.tv_sq * tv_sq + 0.5 * MODEL_COEFFICIENTS.tv_radio * tv_radio);
  const radioContrib = Math.max(0, MODEL_COEFFICIENTS.radio * safeRadio + MODEL_COEFFICIENTS.radio_sq * radio_sq + 0.5 * MODEL_COEFFICIENTS.tv_radio * tv_radio);
  const newsContrib = Math.max(0, MODEL_COEFFICIENTS.newspaper * safeNews + MODEL_COEFFICIENTS.news_sq * news_sq);
  
  const sumContrib = (tvContrib + radioContrib + newsContrib) || 1;
  const tvShare = Math.round((tvContrib / sumContrib) * 100);
  const radioShare = Math.round((radioContrib / sumContrib) * 100);
  const newspaperShare = Math.round((newsContrib / sumContrib) * 100);

  // Recommendations based on polynomial marginal return rates
  const recommendations: string[] = [];
  if (safeTV > 220) {
    recommendations.push('TV budget shows signs of diminishing returns at current high spending (> $220k). Consider reallocating $20k-$30k to Radio for higher synergy.');
  } else if (safeTV < 80) {
    recommendations.push('TV is the primary driver of sales volume. Increasing TV spend will yield strong linear growth.');
  }

  if (safeRadio > 0 && safeTV > 0) {
    recommendations.push('High interaction detected between TV and Radio campaigns (Synergy Coefficient: +0.00042). Combining both channels maximizes total conversion.');
  }

  if (safeNews > 40) {
    recommendations.push('Newspaper advertising exhibits minimal marginal impact. Shifting budget to Radio/TV is recommended for higher ROI.');
  }

  const efficiencyScore = Math.min(99, Math.max(45, Math.round(75 + (tv_radio > 0 ? 12 : 0) - (safeTV > 240 ? 8 : 0) - (safeNews > 50 ? 10 : 0))));

  return {
    tv: safeTV,
    radio: safeRadio,
    newspaper: safeNews,
    predictedSales,
    predictedRevenue: estimatedRevenue,
    totalBudget,
    roiPercentage,
    efficiencyScore,
    channelImpact: {
      tvContribution: Math.round(tvContrib * 10) / 10,
      radioContribution: Math.round(radioContrib * 10) / 10,
      newspaperContribution: Math.round(newsContrib * 10) / 10,
      tvShare,
      radioShare,
      newspaperShare,
    },
    recommendations,
  };
}

/**
 * Returns TV vs Sales polynomial regression curve data points
 * while keeping Radio and Newspaper fixed at their dataset mean values.
 */
export function getTVRegressionCurvePoints() {
  const radioMean = 23.26; // dataset average Radio spend
  const newsMean = 30.55;  // dataset average Newspaper spend

  const points = [];
  const minTV = 0;
  const maxTV = 300;
  const step = 6;

  for (let tv = minTV; tv <= maxTV; tv += step) {
    const res = predictSales(tv, radioMean, newsMean);
    points.push({
      tv: tv,
      predictedSales: res.predictedSales,
    });
  }

  return points;
}

/**
 * Returns all 200 dataset points combined with their Polynomial Regression predictions
 * for the Actual vs. Predicted scatter & residual analysis charts.
 */
export function getActualVsPredictedDataset() {
  return ADVERTISING_DATA.map((item: AdvertisingRecord) => {
    const pred = predictSales(item.TV, item.Radio, item.Newspaper).predictedSales;
    const residual = Math.round((item.Sales - pred) * 100) / 100;
    return {
      id: item.id,
      tv: item.TV,
      radio: item.Radio,
      newspaper: item.Newspaper,
      actualSales: item.Sales,
      predictedSales: pred,
      residual: residual,
      absResidual: Math.abs(residual),
    };
  });
}
