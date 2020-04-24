function get_weather() {
  city = document.getElementById("city").value;
  if(!city) {
    city = "Bhaktapur";
  }

  // Create a request variable and assign a new XMLHttpRequest object to it.
  var request = new XMLHttpRequest();

  // Open a new connection, using the GET request on the URL endpoint
  url = 'https://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=' + APPID + '&mode=' + MODE + '&units=metric';
  request.open('GET', url, true);

  request.onload = function() {
    // Begin accessing JSON data here
    weather_data = JSON.parse(this.response);
    if(weather_data["cod"] == 200) {
      document.getElementById("info").style = "display: none;";
      document.getElementById("location").innerHTML = weather_data["name"] + " (" + weather_data["sys"]["country"] +")";
      document.getElementById("weather_icon").src = "http://openweathermap.org/img/wn/" + weather_data["weather"][0]["icon"] + "@2x.png";
      document.getElementById("weather_main").innerHTML = weather_data["weather"][0]["main"] + " (" + weather_data["weather"][0]["description"] + ")";
      document.getElementById("temp").innerHTML = weather_data["main"]["temp"];
      document.getElementById("feels_like").innerHTML = weather_data["main"]["feels_like"];
      document.getElementById("min_temp").innerHTML = weather_data["main"]["temp_min"];
      document.getElementById("max_temp").innerHTML = weather_data["main"]["temp_max"];

      if (weather_data.hasOwnProperty("rain")) {
        document.getElementById("rain").innerHTML = weather_data["rain"]["1h"];
        document.getElementById("rain_parent").style = "display: block;";
        document.getElementById("rain_parent").insertAfter("<br />");
      }
      else {
        document.getElementById("rain_parent").style = "display: none;";
      }

      if (weather_data.hasOwnProperty("snow")) {
        document.getElementById("snow").innerHTML = weather_data["snow"]["1h"];
        document.getElementById("snow_parent").style = "display: block;";
        document.getElementById("snow_parent").insertAfter("<br />");
      }
      else {
        document.getElementById("snow_parent").style = "display: none;";
      }

      document.getElementById("pressure").innerHTML = weather_data["main"]["pressure"];
      document.getElementById("humidity").innerHTML = weather_data["main"]["humidity"];
      document.getElementById("sunrise").innerHTML =  new Date(weather_data["sys"]["sunrise"]*1000).toLocaleString();
      document.getElementById("sunset").innerHTML = new Date(weather_data["sys"]["sunset"]*1000).toLocaleString();

      let compassSector = ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW", "N"];
      wind_direction = compassSector[(weather_data["wind"]["deg"] / 22.5).toFixed(0) - 1];

      document.getElementById("wind").innerHTML = weather_data["wind"]["speed"] + " m/s (" + wind_direction + ")";
      document.getElementById("last_update").innerHTML = new Date(weather_data["dt"]*1000).toLocaleString();
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
}

MODE = "json";
APPID = "efb37b9787edd737e3dcfd9e3b47c747";

document.getElementById("city").value = "Bhaktapur";
get_weather();
document.getElementById("city").value = "";

// ENTER triggers 'Go' button
var city = document.getElementById("city");
city.addEventListener("keyup", function(event) {
    event.preventDefault();
    if (event.keyCode === 13) {
        document.getElementById("btn").click();
    }
});
