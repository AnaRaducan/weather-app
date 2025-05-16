import API_KEY from './key.js'; // importarea default
import fetchWeatherData from './fetchWeatherData.js';

const selectElement = (element) => document.querySelector(element);

const elements = {
  app: selectElement('.weather-app'),
  temp: selectElement('.temp'),
  dateOutput: selectElement('.date'),
  timeOutput: selectElement('.time'),
  conditionOutput: selectElement('.condition'),
  nameOutput: selectElement('.name'),
  icon: selectElement('.icon'),
  cloudOutput: selectElement('.cloud'),
  humidityOutput: selectElement('.humidity'),
  windOutput: selectElement('.wind'),
  form: selectElement('#location-input'),
  search: selectElement('.search'),
  submit: selectElement('.submit'),
  cities: selectElement('.cities'),
};

let cityInput = 'Chisinau';

const modifyWeatherElements = () =>
  fetchWeatherData({ API_KEY, cityInput }, elements);

modifyWeatherElements();

elements.cities.addEventListener('click', (e) => {
  const city = e.target.closest('.city');

  if (!city) return;

  cityInput = city.textContent;

  modifyWeatherElements();
});

elements.form.addEventListener('submit', (e) => {
  e.preventDefault();

  if (elements.search.value.length === 0) {
    return alert('Please type in a city name');
  }

  cityInput = elements.search.value;

  modifyWeatherElements();

  elements.search.value = '';
});
