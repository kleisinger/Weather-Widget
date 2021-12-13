const apiKey = `d0c30f3e5d9786155757451de2759d9c`
let lat;
let lon;

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
       console.log(data)
      })
      .catch((err) => alert('Something went wrong, please double-check your URL')) 
    };


    getCurrentWeather(lat, lon);
  });
};



