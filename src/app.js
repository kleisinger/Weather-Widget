const apiKey = `d0c30f3e5d9786155757451de2759d9c`
let lat;
let lon;
const currentEl = document.querySelector('.current-conditions')
const forecastEl = document.querySelector('.forecast')
let allHighs = [];
let allLows = [];
let x = 0;


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

    const getLows = (listItem) => {
      let dailyLows1 = [];
      let dailyLows2 = [];
      let dailyLows3 = [];
      let dailyLows4 = [];
      let dailyLows5 = [];

      for (i = 0; i < 8; i++) {
        dailyLows1.push(listItem[i].main.temp_min)
      };
      for (i = 8; i < 16; i++) {
        dailyLows2.push(listItem[i].main.temp_min)
      };
      for (i = 16; i < 24; i++) {
        dailyLows3.push(listItem[i].main.temp_min)
      };
      for (i = 24; i < 32; i++) {
        dailyLows4.push(listItem[i].main.temp_min)
      };
      for (i = 32; i < 40; i++) {
        dailyLows5.push(listItem[i].main.temp_min)
      };

      allLows.push(Math.min(...dailyLows1));
      allLows.push(Math.min(...dailyLows2));
      allLows.push(Math.min(...dailyLows3));
      allLows.push(Math.min(...dailyLows4));
      allLows.push(Math.min(...dailyLows5));
    };

    const getHighs = (listItem) => {
      let fullDay1 = [];
      let fullDay2 = [];
      let fullDay3 = [];
      let fullDay4 = [];
      let fullDay5 = [];

      for (i = 0; i < 8; i++) {
        fullDay1.push(listItem[i].main.temp_max)
      };
      for (i = 8; i < 16; i++) {
        fullDay2.push(listItem[i].main.temp_max)
      };
      for (i = 16; i < 24; i++) {
        fullDay3.push(listItem[i].main.temp_max)
      };
      for (i = 24; i < 32; i++) {
        fullDay4.push(listItem[i].main.temp_max)
      };
      for (i = 32; i < 40; i++) {
        fullDay5.push(listItem[i].main.temp_max)
      };

      allHighs.push(Math.max(...fullDay1));
      allHighs.push(Math.max(...fullDay2));
      allHighs.push(Math.max(...fullDay3));
      allHighs.push(Math.max(...fullDay4));
      allHighs.push(Math.max(...fullDay5));
    };

    const getForecastWeather = (lat, lon) => {
      fetch(`http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`
      )
      .then((response) => response.json())
      .then((data) => {
        listItem = data.list;
        getHighs(listItem);
        getLows(listItem);
        listItem.forEach(fullDay => {
          if (fullDay.dt_txt.includes('09:00:00')) {
            renderForecastWeather(fullDay);
            x++;
          };   
        });
      })
      .catch((err) => alert('Something went wrong, please double-check your URL'));
    };

    const renderForecastWeather = (fullDay) => {  
      const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
      let date = new Date(fullDay.dt_txt);
      let day = weekday[date.getDay()]; 
      forecastEl.insertAdjacentHTML(
        `beforeend`,
        `
        <div class="day">
          <h3>${day}</h3>
          <img src="http://openweathermap.org/img/wn/${fullDay.weather[0].icon}@2x.png" />
          <div class="description">${fullDay.weather[0].description}</div>
          <div class="temp">
            <span class="high">${allHighs[x].toFixed(0)}℃</span>/<span class="low">${allLows[x].toFixed(0)}℃</span>
          </div>
        </div>
        `
      );
    };

    getCurrentWeather(lat, lon);
    getForecastWeather(lat, lon);
  });
};



