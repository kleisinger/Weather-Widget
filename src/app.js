const apiKey = `d0c30f3e5d9786155757451de2759d9c`
let lat;
let lon;
const currentEl = document.querySelector('.current-conditions')
const forecastEl = document.querySelector('.forecast')


if (!navigator.geolocation) {
  console.log(`Geolocation is not supported by your browser`);
} else {
  navigator.geolocation.getCurrentPosition((position) => {
    lat = position.coords.latitude;
    lon = position.coords.longitude;

    const getCurrentWeather = (lat, lon) => {
      fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`
      )
      .then((response) => response.json())
      .then((data) => {
        renderCurrentWeather(data);
      })
      .catch((err) => alert('Something went wrong, please double-check your URL'));
    };

    const renderCurrentWeather = (data) => {
      currentEl.insertAdjacentHTML(
        `beforeend`,
        `
        <h2>Current Conditions</h2>
        <img src="http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" />
        <div class="current">
          <div class="temp">${((data.main.temp).toFixed(0))}℃</div>
          <div class="condition">${data.weather[0].description}</div>
        </div>
       `
      );
    };

    const getForecastWeather = (lat, lon) => {
      fetch(`http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`
      )
      .then((response) => response.json())
      .then((data) => {
        listItem = data.list;
        listItem.forEach(fullDay => {
          if (fullDay.dt_txt.includes('09:00:00')) {
            renderForecastWeather(fullDay)
          };   
        });
      })
      .catch((err) => alert('Something went wrong, please double-check your URL'));
    };

    const renderForecastWeather = (fullDay) => {      
      forecastEl.insertAdjacentHTML(
        `beforeend`,
        `
        <div class="day">
          <h3>Date Goes Here</h3>
          <img src="http://openweathermap.org/img/wn/${fullDay.weather[0].icon}@2x.png" />
          <div class="description">${fullDay.weather[0].description}</div>
          <div class="temp">
            <span class="high">123℃</span>/<span class="low">123℃</span>
          </div>
        </div>
        `
      )
    };

    


    getCurrentWeather(lat, lon);
    getForecastWeather(lat, lon);
  });
};



