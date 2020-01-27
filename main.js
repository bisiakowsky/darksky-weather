
let latitude = 51.735347;
let longitude = 19.457369


fetch(`https://api.darksky.net/forecast/d51c87afbfc2967eda2d65dc56b4ec48/${latitude},${longitude}?units=si`)
.then(response => response.json())
.then(function(parsedJson) {
  const currentTime = document.getElementById('current-time');
  const currentSummary = document.getElementById('current-summary');
  const currentTemperature = document.getElementById('current-temperature');
  const currentWind = document.getElementById('current-wind');
    
    //today
    const timeConverter = new Date(parsedJson.currently.time*1000);   // get real time for current location
    currentTime.innerHTML = `${timeConverter.getHours()}:${timeConverter.getMinutes()}`;
    currentSummary.className += parsedJson.currently.icon;
    currentTemperature.innerHTML = `${Math.round(parsedJson.currently.temperature*2)/2} °C`;
    currentWind.innerHTML = `${Math.round(parsedJson.currently.windSpeed)} km/h`;
    console.log(parsedJson)

    //daily
    let dailyWeather = parsedJson.daily.data
    dailyWeather = dailyWeather.slice(1);
    //console.log(dailyWeather);


    for (let i of dailyWeather) {
      const getDay = new Date(i.time*1000).toString().slice(0, 4);
      //console.log(getDay);
      var p = document.createElement("div");
      p.innerHTML = `
        <div class="day">${getDay}</div>
          <div class="icon">${i.icon}</div>
          <div class="max-temp">${Math.round(i.temperatureHigh)}</div>
          <div class="min-temp">${Math.round(i.temperatureMin)}</div>

      `;
      document.getElementById('daily-weather').appendChild(p)
      //console.log(i)

    }
  })


.catch(err => {
	console.log(err);
});

