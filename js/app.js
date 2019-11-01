const weatherRequestUrl = "https://api.darksky.net/forecast/3343a0f3b0a46dab840ee06daf9c36d9/";

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js')
    .then((reg) => console.log("service worker registered", reg))
    .catch((err) => console.log("service worker not registered", err));
}

const startWeatherForecasting = () => {
  if ('geolocation' in navigator) {
    console.log("Getting geolocation");
    navigator.geolocation.getCurrentPosition( position => {
      console.log("lat: " + position.coords.latitude + " | long: " + position.coords.longitude);
      queryWeatherForecast(position.coords.latitude, position.coords.longitude);
    });
  } else {
    console.log("Does not support geolocation");
    queryWeatherForecast(37.8267,-122.4233);
  }
}

const queryWeatherForecast = (lat, long) => {
  const xhr = new XMLHttpRequest();
  const url = weatherRequestUrl + lat + "," + long + "?exclude=hourly,flags";
  
  fetch("https://cors-anywhere.herokuapp.com/"+url, {
    method: 'GET'
  }).then(response => {
    return response.json();
  }).then(data => {
    console.log(data);
    renderLocation(data.timezone);

    data.daily.data.forEach(item => {
      //console.log(item);
      renderForecast(item);
    });
  }).catch(e => {
    caches.match(url)
      .then((response) => {
        if (response) {
          var data = response.json();
          renderLocation(data.timezone);

          data.daily.data.forEach(item => {
            console.log(item);
            renderForecast(item);
          });
        }
      })
      .catch(err => {
        console.error('Error getting data from cache', err);
      });
  });
}

document.addEventListener('DOMContentLoaded', function() {
  startWeatherForecasting();
});
