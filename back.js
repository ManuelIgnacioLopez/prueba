import * as tf from '@tensorflow/tfjs';
const modelUrl = 'modelo/model.json';

const form = document.getElementById('demand-form');
const resultsDiv = document.getElementById('demand-results');

form.addEventListener('submit', async (event) => {
	event.preventDefault();
	
	const previousPrice = Number(document.getElementById('previous-price').value);
	const previousDemand = Number(document.getElementById('previous-demand').value);
	const price = Number(document.getElementById('price').value);
	const conversionRate = Number(document.getElementById('conversion-rate').value);
	const marketFactor = Number(document.getElementById('market-factor').value);

	const input = tf.tensor2d([[previousPrice, previousDemand, price, conversionRate, marketFactor]]);
	const model = await tf.loadLayersModel(modelUrl);
	const prediction = model.predict(input);
	const demand = prediction.dataSync()[0];
  // Cargar el modelo de machine learning
const model = await tf.loadLayersModel('http://localhost:8000/model.json');

// Función para predecir la demanda
function predictDemand(price) {
  // Convertir los valores a tensores de TensorFlow
  const inputs = tf.tensor2d([[previousPrice, previousDemand, price, conversionRate]]);
  
  // Normalizar los valores de entrada
  const inputMax = inputs.max();
  const inputMin = inputs.min();  
  const normalizedInputs = inputs.sub(inputMin).div(inputMax.sub(inputMin));

  // Predecir la demanda normalizada
  const normalizedOutput = model.predict(normalizedInputs);
  
  // Desnormalizar la demanda
  const output = normalizedOutput.mul(outputMax.sub(outputMin)).add(outputMin);
  
  // Obtener la demanda como un número
  const demand = output.dataSync()[0];

  return demand;
}
// Función para manejar el evento submit del formulario
function handleFormSubmit(event) {
  event.preventDefault();

  // Obtener los valores del formulario
  const previousPrice = Number(document.getElementById('previous-price-input').value);
  const previousDemand = Number(document.getElementById('previous-demand-input').value);
  const price = Number(document.getElementById('price-input').value);
  const conversionRate = Number(document.getElementById('conversion-rate-input').value);
  const marketFactor = Number(document.getElementById('market-factor-input').value);

  // Calcular la demanda utilizando el modelo de machine learning
  const demand = predictDemand(price) * marketFactor;

  // Mostrar el resultado en la página
  const resultElement = document.getElementById('demand-results');
  resultElement.innerHTML = `La demanda proyectada para este mes es: ${demand.toFixed(2)}`;
}
  
