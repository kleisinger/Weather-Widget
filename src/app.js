const apiKey = `d0c30f3e5d9786155757451de2759d9c`
let lat;
let lon;
const currentEl = document.querySelector('.current-conditions')

if (!navigator.geolocation) {
  console.log(`Geolocation is not supported by your browser`);
} else {
  navigator.geolocation.getCurrentPosition((position) => {
    lat = position.coords.latitude;
    lon = position.coords.longitude;
    console.log(lat, lon)

    const getCurrentWeather = (lat, lon) => {
      fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`
      )
      .then((response) => response.json())
      .then((data) => {
        renderCurrentWeather(data);
      })
      .catch((err) => alert('Something went wrong, please double-check your URL')) 
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
       `);
     };


    getCurrentWeather(lat, lon);
  });
};



