let latitude = 1.735347;
let longitude = 1.457369;
const currentCity = document.getElementById('current-city');




function getLocation() {

  if (navigator.geolocation) {

    // timeout at 60000 milliseconds (60 seconds)
    var options = {
      timeout: 60000
    };
    navigator.geolocation.getCurrentPosition(showLocation, errorHandler, options);
  } else {
    alert("Sorry, browser does not support geolocation!");
  }
}


function getWeather() {
  fetch(`https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/d51c87afbfc2967eda2d65dc56b4ec48/${latitude},${longitude}?units=si`, {
      mode: 'cors',
      headers: {
        'Access-Control-Allow-Origin': '*'
      }
    })
    .then(response => response.json())
    .then(function (parsedJson) {
      const currentTime = document.getElementById('current-time');
      const currentSummary = document.getElementById('current-summary');
      const currentTemperature = document.getElementById('current-temperature');
      const currentWind = document.getElementById('current-wind');
      const dailyWeatherDiv = document.getElementById('daily-weather');


      //today
      const timeConverter = new Date(parsedJson.currently.time * 1000).toLocaleTimeString("en-US", {
        timeZone: parsedJson.timezone,
        hour12: false
      }).slice(0, -3);
      currentTime.innerHTML = timeConverter;
      currentSummary.style.backgroundImage = `url("/icons/${parsedJson.currently.icon}.png")`;
      currentTemperature.innerHTML = `${Math.round(parsedJson.currently.temperature*2)/2} °C`;
      currentWind.innerHTML = `${Math.round(parsedJson.currently.windSpeed)} km/h`;
      //daily
      let dailyWeather = parsedJson.daily.data
      dailyWeather = dailyWeather.slice(1);
      //console.log(dailyWeather);

      dailyWeatherDiv.innerHTML = ''; //remove content from daily-weather
      for (let i of dailyWeather) {
        const getDay = new Date(i.time * 1000).toString().slice(0, 4);
        //console.log(getDay);
        var p = document.createElement("div");
        p.classList.add("everyday-weather");
        p.innerHTML = `
        <div class="day">${getDay}</div>
          <div class="icon" style="background-image:url('/icons/${i.icon}.png') "></div>
          <div class="max-temp">${Math.round(i.temperatureHigh)} °C</div>
          <div class="min-temp">${Math.round(i.temperatureMin)} °C</div>

      `;
        dailyWeatherDiv.appendChild(p)
        //console.log(i)

      }
    })


    .catch(err => {
      console.log(err);
    });
}


//google autocomplete


function initialize() {
  const input = document.getElementById('searchTextField');
  const autocomplete = new google.maps.places.Autocomplete(input);
  google.maps.event.addListener(autocomplete, 'place_changed', function () {
    const place = autocomplete.getPlace();

    latitude = place.geometry.location.lat()
    longitude = place.geometry.location.lng()
    currentCity.innerHTML = place.name;
    getWeather();
    input.value = '';
  });
}
google.maps.event.addDomListener(window, 'load', initialize);

// geoloaction
function showLocation(position) {
  latitude = position.coords.latitude;
  longitude = position.coords.longitude;
  currentCity.innerHTML = 'Current Location'
  getWeather()
}

function errorHandler(err) {
  if (err.code == 1) {
    alert("Error: Access is denied!");
  } else if (err.code == 2) {
    alert("Error: Position is unavailable, please choose city in the input");
  }
}