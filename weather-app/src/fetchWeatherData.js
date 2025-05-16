const weekday = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday',
];

const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const cloudyCodes = new Set([1003, 1006, 1009]);

const rainyCodes = new Set([
  1063, 1066, 1069, 1072, 1087, 1150, 1153, 1168, 1171, 1180, 1183, 1186, 1189,
  1192, 1195, 1198, 1201, 1204, 1207, 1240, 1243, 1246, 1249, 1252, 1273, 1276,
]);

function getDayOfTheWeek(day, month, year) {
  const weekdayIndex = new Date(`${month}/${day}/${year}`).getDay();

  return weekday[weekdayIndex];
}

function getMonth(month) {
  return months[month - 1];
}
export default async function fetchWeatherData(params, elements) {
  const { API_KEY, cityInput } = params;

  try {
    const response = await fetch(
      `http://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${cityInput}`
    );

    if (!response.ok) throw new Error('City not found');

    const data = await response.json();

    const date = data.location.localtime;
    const iconId = data.current.condition.icon;
    const code = data.current.condition.code;

    const year = date.slice(0, 4);
    const month = date.slice(5, 7);
    const day = date.slice(8, 10);
    const hours = date.slice(11, 13);
    const minutes = date.slice(14);

    let timeOfDay = data.current.is_day ? 'day' : 'night';

    elements.temp.innerHTML = `${Math.round(data.current.temp_c)}&#176;`;
    elements.conditionOutput.innerHTML = data.current.condition.text;
    elements.timeOutput.innerHTML = `${hours}:${minutes}`;
    elements.dateOutput.innerHTML = `${getDayOfTheWeek(
      day,
      month,
      year
    )}, ${getMonth(month)} ${day}`;
    elements.nameOutput.innerHTML = data.location.name;
    elements.icon.src = iconId;
    elements.cloudOutput.innerHTML = data.current.cloud + '%';
    elements.humidityOutput.innerHTML = data.current.humidity + '%';
    elements.windOutput.innerHTML = Math.round(data.current.wind_kph) + 'km/h';

    if (code === 1000) {
      elements.app.style.backgroundImage = `url(./images/${timeOfDay}/clear.avif)`;
      elements.submit.style.background =
        timeOfDay === 'day' ? '#e5ba92' : '#181e27';
    } else if (cloudyCodes.has(code)) {
      elements.app.style.backgroundImage = `url(./images/${timeOfDay}/cloudy.avif)`;
      elements.submit.style.background =
        timeOfDay === 'day' ? '#fa6d1b' : '#181e27';
    } else if (rainyCodes.has(code)) {
      elements.app.style.backgroundImage = `url(./images/${timeOfDay}/rainy.avif)`;
      elements.submit.style.background =
        timeOfDay === 'day' ? '#647d75' : '#325c80';
    } else {
      elements.app.style.backgroundImage = `url(./images/${timeOfDay}/snowy.avif)`;
      elements.submit.style.background =
        timeOfDay === 'day' ? '#4d72aa' : '#1b1b1b';
    }
  } catch (err) {
    console.error(err);
    alert('City not found, please try again');
  } finally {
    elements.app.style.opacity = '1';
  }
}
