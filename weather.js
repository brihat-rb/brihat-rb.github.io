TIMEZONE = "20700";

function get_weather() {
  city_name = document.getElementById("city").value;
  if(!city_name) {
    city_name = "Bhaktapur";
  }

  // Create a request variable and assign a new XMLHttpRequest object to it.
  var request = new XMLHttpRequest();

  // Open a new connection, using the GET request on the URL endpoint
  url = 'https://api.openweathermap.org/data/2.5/weather?q=' + city_name + '&appid=' + APPID + '&mode=' + MODE + '&units=metric';
  request.open('GET', url, true);

  request.onload = function() {
    // Begin accessing JSON data here
    weather_data = JSON.parse(this.response);
    if(weather_data["cod"] == 200) {
      document.getElementById("info").style = "display: none;";
      document.getElementById("location").innerHTML = weather_data["name"] + " (" + weather_data["sys"]["country"] + ")";
      document.getElementById("weather_icon").src = "https://openweathermap.org/img/wn/" + weather_data["weather"][0]["icon"] + "@2x.png";
      document.getElementById("weather_main").innerHTML = weather_data["weather"][0]["main"] + " (" + weather_data["weather"][0]["description"] + ")";
      document.getElementById("temp").innerHTML = weather_data["main"]["temp"];
      document.getElementById("feels_like").innerHTML = weather_data["main"]["feels_like"];

      var frequest = new XMLHttpRequest();
      furl = 'https://api.openweathermap.org/data/2.5/forecast?q=' + city_name + '&appid=' + APPID + '&mode=' + MODE + '&units=metric';
      frequest.open('GET', furl, true);
      frequest.onload = function() {
        fresponse = JSON.parse(this.response);
        var data_min = [];
        var data_max = [];
        for(var i = 0; i < 8; i++) {
          data_min[i] = fresponse["list"][i]["main"]["temp_min"];
          data_max[i] = fresponse["list"][i]["main"]["temp_max"];
        }
        document.getElementById("min_temp").innerHTML = Math.min(...data_min);
        document.getElementById("max_temp").innerHTML = Math.max(...data_max);
      }
      frequest.send();

      if(weather_data.hasOwnProperty("rain")) {
        if(weather_data["rain"].hasOwnProperty("1h"))
          document.getElementById("rain").innerHTML = weather_data["rain"]["1h"];
        else if (weather_data["rain"].hasOwnProperty("3h"))
          document.getElementById("rain").innerHTML = weather_data["rain"]["3h"];
        else
          document.getElementById("rain").innerHTML = "n/a";
        document.getElementById("rain_parent").style = "display: block;";
      }
      else {
        document.getElementById("rain_parent").style = "display: none;";
      }

      if (weather_data.hasOwnProperty("snow")) {
        if (weather_data["snow"].hasOwnProperty("1h"))
          document.getElementById("snow").innerHTML = weather_data["snow"]["1h"];
        else if (weather_data["snow"].hasOwnProperty("3h"))
          document.getElementById("snow").innerHTML = weather_data["snow"]["3h"];
        else
          document.getElementById("snow").innerHTML = "n/a";
        document.getElementById("snow_parent").style = "display: block;";
        document.getElementById("optbr").style = "display: block;";
      }
      else {
        document.getElementById("snow_parent").style = "display: none;";
        document.getElementById("optbr").style = "display: none;";
      }

      document.getElementById("pressure").innerHTML = weather_data["main"]["pressure"];
      document.getElementById("humidity").innerHTML = weather_data["main"]["humidity"];
      document.getElementById("sunrise").innerHTML = new Date((weather_data["sys"]["sunrise"] + weather_data["timezone"] + new Date().getTimezoneOffset() * 60) * 1000).toLocaleString();
      document.getElementById("sunset").innerHTML = new Date((weather_data["sys"]["sunset"] + weather_data["timezone"] + new Date().getTimezoneOffset() * 60) * 1000).toLocaleString();

      let compassSector = ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW", "N"];
      if((weather_data["wind"]["deg"] / 22.5).toFixed(0) == 0)
        wind_direction = compassSector[0];
      else
        wind_direction = compassSector[(weather_data["wind"]["deg"] / 22.5).toFixed(0) - 1];
      document.getElementById("wind").innerHTML = weather_data["wind"]["speed"] + " m/s (" + wind_direction + ")";
      document.getElementById("last_update").innerHTML = new Date((weather_data["dt"] + weather_data["timezone"] + new Date().getTimezoneOffset() * 60) * 1000).toLocaleString();
      TIMEZONE = weather_data["timezone"];
    }

    else if (weather_data["cod"] == 404) {
      document.getElementById("info").style = "display: block;";
      document.getElementById("info").innerHTML = weather_data["message"];
    }

    else {
      alert("Error.");
    }
  }

  // Send request
  request.send();
  localStorage.saved_city = city_name;
}

// for topmost date display
function showtime() {
  var dt = new Date(Date.now() + new Date().getTimezoneOffset() * 60 * 1000 + TIMEZONE * 1000)
  current_time_city = document.getElementById("location").innerHTML;
  datetime_div_content = document.getElementById("datetime");
  datetime_div_content.innerHTML = "";
  datetime_div_content.innerHTML += dt.toLocaleTimeString();
  datetime_div_content.innerHTML += "<div id='local_city'>" + current_time_city.substring(0, current_time_city.length - 5) + "</div>";
  setTimeout("showtime()", 500);
}
showtime();

MODE = "json";
APPID = "efb37b9787edd737e3dcfd9e3b47c747";

saved_city = localStorage.getItem("saved_city");
if(!saved_city) {
  document.getElementById("city").value = "Bhaktapur";
}
else {
  document.getElementById("city").value = saved_city;
}
get_weather();
document.getElementById("city").value = "";

// ENTER triggers 'Go' button
var city = document.getElementById("city");
city.addEventListener("keyup", function(event) {
  event.preventDefault();
  if(event.keyCode === 13) {
    document.getElementById("btn").click();
  }
});
