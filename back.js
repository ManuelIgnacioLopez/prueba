// Cargar el modelo de machine learning
const model = await tf.loadLayersModel('http://localhost:8000/model.json');

// Obtener referencias a los elementos HTML relevantes
const form = document.getElementById('demand-form');
const previousDemandInput = document.getElementById('previous-demand');
const previousPriceInput = document.getElementById('previous-price');
const priceInput = document.getElementById('price');
const conversionRateInput = document.getElementById('conversion-rate');
const resultsContainer = document.getElementById('demand-results');

// Agregar evento "submit" al formulario
form.addEventListener('submit', async (event) => {
  // Prevenir la acción predeterminada del formulario
  event.preventDefault();

  // Obtener los valores de entrada del formulario
  const previousDemand = Number(previousDemandInput.value);
  const previousPrice = Number(previousPriceInput.value);
  const price = Number(priceInput.value);
  const conversionRate = Number(conversionRateInput.value);

  // Hacer una predicción con el modelo
  const inputs = tf.tensor2d([[previousDemand, previousPrice, price, conversionRate]]);
  const prediction = model.predict(inputs);
  const demand = prediction.dataSync()[0];

  // Mostrar el resultado de la predicción en la página
  resultsContainer.innerHTML = `<p>La demanda proyectada es de ${demand.toFixed(2)} unidades.</p>`;
});
