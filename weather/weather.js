let TIMEZONE = "20700";
let current_lat = 27.6833;
let current_lon = 85.4167;

function update_weather() {
  document.getElementById("weather_icon").src = "./loading.svg";
  let fields = ["location", "weather_main", "temp", "feels_like", "min_temp", "max_temp", "rain", "snow", "pressure", "humidity", "sunrise", "sunset", "wind", "last_update"];
  fields.forEach(item => document.getElementById(item).innerHTML = "<i class='load fa fa-refresh' aria-hidden='true'></i>");

  let saved_city = localStorage.getItem("saved_city");
  if(!saved_city) {
    document.getElementById("city").value = "Bhaktapur";
  }
  else {
    document.getElementById("city").value = saved_city;
  }
  get_weather();
  document.getElementById("city").value = "";
}

function get_weather() {
  document.getElementById("weather_icon").src = "./loading.svg";
  let fields = ["location", "weather_main", "temp", "feels_like", "min_temp", "max_temp", "rain", "snow", "pressure", "humidity", "sunrise", "sunset", "wind", "last_update"];
  fields.forEach(item => document.getElementById(item).innerHTML = "<i class='load fa fa-refresh' aria-hidden='true'></i>");

  document.getElementById("info").innerHTML = "loading ...";
  document.getElementById("info").style = "display: block;";
  let city_name = document.getElementById("city").value;
  if(!city_name) {
    city_name = "Bhaktapur";
  }

  // Create a request variable and assign a new XMLHttpRequest object to it.
  let request = new XMLHttpRequest();

  // Open a new connection, using the GET request on the URL endpoint
  let url = 'https://api.openweathermap.org/data/2.5/weather?q=' + city_name + '&appid=' + APPID + '&mode=' + MODE + '&units=metric';
  request.open('GET', url, true);

  request.onload = function() {
    // Begin accessing JSON data here
    let weather_data = JSON.parse(this.response);
    if(weather_data.cod == 200) {
      current_lat = weather_data.coord.lat;
      current_lon = weather_data.coord.lon;
      document.getElementById("info").style = "display: none;";
      document.getElementById("location").innerHTML = weather_data.name + " (" + weather_data.sys.country + ")";
      document.getElementById("weather_icon").src = "https://openweathermap.org/img/wn/" + weather_data.weather[0].icon + "@2x.png";
      document.getElementById("favicon").href = document.getElementById("weather_icon").src;
      document.getElementById("weather_main").innerHTML = weather_data.weather[0].main + "<span id='narrow_width'> (" + weather_data.weather[0].description + ")</span>";
      document.getElementById("weather_main").innerHTML += " <a onclick='update_weather()'><i id='refresh' class='fa fa-refresh' aria-hidden='true'></i></a>";
      document.getElementById("temp").innerHTML = weather_data.main.temp;
      document.getElementById("feels_like").innerHTML = weather_data.main.feels_like;

      let frequest = new XMLHttpRequest();
      let furl = 'https://api.openweathermap.org/data/2.5/forecast?q=' + city_name + '&appid=' + APPID + '&mode=' + MODE + '&units=metric';
      frequest.open('GET', furl, true);
      frequest.onload = function() {
        let fresponse = JSON.parse(this.response);
        let data_min = [];
        let data_max = [];
        for(let i = 0; i < 8; i++) {
          data_min[i] = fresponse.list[i].main.temp_min;
          data_max[i] = fresponse.list[i].main.temp_max;
        }
        document.getElementById("min_temp").innerHTML = Math.min(...data_min);
        document.getElementById("max_temp").innerHTML = Math.max(...data_max);
      };

      frequest.send();

      if(weather_data.hasOwnProperty("rain")) {
        if(weather_data.rain.hasOwnProperty("1h"))
          document.getElementById("rain").innerHTML = weather_data.rain["1h"];
        else if (weather_data.rain.hasOwnProperty("3h"))
          document.getElementById("rain").innerHTML = weather_data.rain["3h"];
        else
          document.getElementById("rain").innerHTML = "n/a";
        document.getElementById("rain_parent").style = "display: block;";
      }
      else {
        document.getElementById("rain_parent").style = "display: none;";
      }

      if (weather_data.hasOwnProperty("snow")) {
        if (weather_data.snow.hasOwnProperty("1h"))
          document.getElementById("snow").innerHTML = weather_data.snow["1h"];
        else if (weather_data.snow.hasOwnProperty("3h"))
          document.getElementById("snow").innerHTML = weather_data.snow["3h"];
        else
          document.getElementById("snow").innerHTML = "n/a";
        document.getElementById("snow_parent").style = "display: inline;";
        document.getElementById("optbr").style = "display: block;";
      }
      else {
        document.getElementById("snow_parent").style = "display: none;";
        document.getElementById("optbr").style = "display: none;";
      }

      document.getElementById("pressure").innerHTML = weather_data.main.pressure;
      document.getElementById("humidity").innerHTML = weather_data.main.humidity;
      let sunrise = new Date((weather_data.sys.sunrise + weather_data.timezone + new Date().getTimezoneOffset() * 60) * 1000);
      let sunset = new Date((weather_data.sys.sunset + weather_data.timezone + new Date().getTimezoneOffset() * 60) * 1000);
      document.getElementById("sunrise").innerHTML = '<span class="width_240_data">' + sunrise.toLocaleDateString() + " </span>" + sunrise.toLocaleTimeString();
      document.getElementById("sunset").innerHTML = '<span class="width_240_data">' + sunset.toLocaleDateString() + " </span>" + sunset.toLocaleTimeString();

      let compassSector = ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW", "N"];
      let wind_direction = "calm";
      if((weather_data.wind.deg / 22.5).toFixed(0) === 0)
        wind_direction = compassSector[0];
      else
        wind_direction = compassSector[(weather_data.wind.deg / 22.5).toFixed(0)];
      document.getElementById("wind").innerHTML = weather_data.wind.speed + " m/s (" + wind_direction + ")";
      let updated_on = new Date((weather_data.dt + weather_data.timezone + new Date().getTimezoneOffset() * 60) * 1000);
      document.getElementById("last_update").innerHTML = '<span class="width_240_data">' + updated_on.toLocaleDateString() + " </span>" + updated_on.toLocaleTimeString();
      document.getElementById("info").innerHTML = "";
      TIMEZONE = weather_data.timezone;
      console.log("Updated Successfully on " + new Date());
    }

    else if (weather_data.cod == 404) {
      document.getElementById("info").style = "display: block;";
      document.getElementById("info").innerHTML = weather_data.message;
      console.log("Update Failed on " + new Date());
    }

    else {
      alert("Unexpected Error");
      console.log("Update Error on " + new Date());
    }
  };

  request.onerror = function() {
    document.getElementById("info").innerHTML = "network error";
    console.log("No Update due to N/W Error on " + new Date());
  };

  // Send request
  request.send();
  localStorage.saved_city = city_name;
  localStorage.saved_lat = current_lat;
  localStorage.saved_lon = current_lon;
}

// for topmost date display
function showtime() {
  let dt = new Date(Date.now() + new Date().getTimezoneOffset() * 60 * 1000 + TIMEZONE * 1000)
  let current_time_city = document.getElementById("location").innerHTML;
  let datetime_div_content = document.getElementById("datetime");
  datetime_div_content.innerHTML = "";
  datetime_div_content.innerHTML += dt.toLocaleTimeString();
  datetime_div_content.innerHTML += "<div id='local_city'>" + current_time_city.substring(0, current_time_city.length - 5) + "</div>";
  setTimeout("showtime()", 500);
}
showtime();

const MODE = "json";
const APPID = "efb37b9787edd737e3dcfd9e3b47c747";

let saved_city = localStorage.getItem("saved_city");
if(!saved_city) {
  document.getElementById("city").value = "Bhaktapur";
}
else {
  document.getElementById("city").value = saved_city;
}
get_weather();
document.getElementById("city").value = "";

// ENTER triggers 'Go' button
let city = document.getElementById("city");
city.addEventListener("keyup", function(event) {
  event.preventDefault();
  if(event.keyCode === 13) {
    document.getElementById("btn").click();
  }
});

function show_weather_notification() {
  let nrequest = new XMLHttpRequest();
  let ncity_name = document.getElementById("location").innerHTML;
  ncity_name = ncity_name.substring(0, ncity_name.length - 5);

  let url = 'https://api.openweathermap.org/data/2.5/weather?q=' + ncity_name + '&appid=' + APPID + '&mode=' + MODE + '&units=metric';
  nrequest.open('GET', url, true);

  nrequest.onload = function() {
    let notify_data = JSON.parse(this.response);

    if (notify_data.cod == 200) {
      let body = notify_data.name + " (" + notify_data.sys.country + ")";
      body += '\n' + notify_data.weather[0].main + " (" + notify_data.weather[0].description + ")";
      if (notify_data.hasOwnProperty("rain")) {
        if (notify_data.rain.hasOwnProperty("1h"))
          body += "\tRain: " + notify_data.rain["1h"] + " mm";
        else if (notify_data.rain.hasOwnProperty("3h"))
          body += "\tRain: " + notify_data.rain["3h"] + " mm";
      }
      body += '\nTemp: ' + notify_data.main.temp + " C (feels like " + notify_data.main.feels_like + " C)";
      body += '\nHumidity: ' + notify_data.main.humidity + '% \tPressure: ' + notify_data.main.pressure + " hpa";
      let notify = new Notification('Weather Update', {
        body: body,
        icon: "https://openweathermap.org/img/wn/" + notify_data.weather[0].icon + "@2x.png",
      });

      notify.onclick = function(event) {
        get_weather();
      }
    }
  }
  nrequest.send();
}

function notifyMe() {
  if (!window.Notification) {
    console.log('This browser does not support notifications.');
  }
  else {
    if (Notification.permission === 'granted') {
      if (new Date().getMinutes() % 15 == 0) {
        show_weather_notification();
      }
    }
    else {
      Notification.requestPermission().then(function(p) {
        if (p === 'granted') {
          if (new Date().getMinutes() % 15 == 0) {
            show_weather_notification();
          }
        }
        else {
          console.log('User blocked notifications.');
        }
      }).catch(function(err) {
        console.error(err);
      });
    }
  }

  // UPDATE THE WEATHER ON EVERY MINUTE DIVISIBLE BY 5
  if (new Date().getMinutes() % 5 == 0) {
    update_weather();
  }

  // check every minute, receive notification on every quarter of hour
  setTimeout("notifyMe()", 60000);
}
notifyMe();
