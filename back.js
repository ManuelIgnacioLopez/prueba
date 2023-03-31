import * as tf from '@tensorflow/tfjs';

const API_URL = 'http://localhost:5000/predict_demand';

const demandForm = document.getElementById('demand-form');
const demandResults = document.getElementById('demand-results');

demandForm.addEventListener('submit', async event => {
  event.preventDefault();

  const previousMonthSales = Number(document.getElementById('previous-month-sales').value);
  const conversionRate = Number(document.getElementById('conversion-rate').value);
  const marketFactor = Number(document.getElementById('market-factor').value);

  const input = tf.tensor2d([[previousMonthSales, conversionRate, marketFactor]]);

  const prediction = await fetch(API_URL, {
    method: 'POST',
    body: JSON.stringify(input.arraySync()),
    headers: {
      'Content-Type': 'application/json'
    }
  });

  const demand = await prediction.json();

  demandResults.innerHTML = `La demanda estimada es: ${demand}`;
  
  demandForm.reset();
});
