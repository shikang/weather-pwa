const forecasts = document.querySelector('.forecasts');

// render location
const renderLocation = (location) => {
  const html = `
    <h4 class="center">${location}</h4>
  `;

  forecasts.innerHTML += html;
};

// render forecast
const renderForecast = (data) => {
  var date = new Date(data.time * 1000);
  var day = 'Sun';
  switch (date.getDay()) {
    case 1:
      day = 'Mon';
      break;
    case 2:
      day = 'Tue';
      break;
    case 3:
      day = 'Wed';
      break;
    case 4:
      day = 'Thu';
      break;
    case 5:
      day = 'Fri';
      break;
    case 6:
      day = 'Sat';
      break;
    default:
      break;
  }

  var icon = 'Sun';
  switch (data.icon) {
    case 'clear-day':
    case 'clear-night':
      icon = 'sunny';
      break;
      
    case 'rain':
      icon = 'rain';
      break;

    case 'snow':
    case 'sleet':
      icon = 'snow';
      break;

    case 'wind':
    case 'fog':
    case 'cloudy':
      icon = 'cloudy';
      break;

    case 'partly-cloudy-day':
      icon = 'partly-cloudy-sun';
      break;

    case 'partly-cloudy-night':
      icon = 'partly-cloudy-night';
      break;
  }
  console.log(date);
  const html = `
    <div class="card-panel forecast white row" style="display: flex">
      <img src="/img/${icon}.png" alt="forecast thumb">
      <div class="forecast-details">
        <div class="forecast-day">${day}</div>
        <div class="forecast-date">${date.getMonth() + 1}/${date.getDate()}</div>
        <div class="forecast-desc">${data.summary}</div>
      </div>
    </div>
  `;

  forecasts.innerHTML += html;
};