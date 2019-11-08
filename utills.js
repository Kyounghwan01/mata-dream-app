_getWeather = (lat, long) => {
  fetch(
    //literal 은 ''가 아니고 ``임!
      `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&APPID=${API_KEY}`
    )
    .then(response => response.json())
    .then(json => {
      this.setState({
        temperature: json.main.temp,
        humidity : json.main.humidity,
        name: json.weather[0].main,
        isLoaded: true
      });
    });
};