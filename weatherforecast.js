var popup_box = document.getElementById("popup");
var btn = document.getElementById("btnforecast");
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal
btn.onclick = function() {
  forecast();
  popup_box.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  popup_box.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == popup) {
    popup_box.style.display = "none";
  }
}

MODE = "json";
APPID = "efb37b9787edd737e3dcfd9e3b47c747";

function forecast() {
  var info_message = document.getElementById("wforecast");
  info_message.innerHTML = '<div id="fheader"><div id="ftitle">24 hr forecast</div><div id="flocation">Please Wait</div></div></div>';
  var request = new XMLHttpRequest();
  fcity = document.getElementById("location").innerHTML;
  fcity = fcity.substring(0, fcity.length - 5);

  url = 'https://api.openweathermap.org/data/2.5/forecast?q=' + fcity + '&appid=' + APPID + '&mode=' + MODE + '&units=metric';

  request.open('GET', url, true);

  request.onload = function() {
    // Begin accessing JSON data here
    resp = JSON.parse(this.response);
    if(resp["cod"] == 200) {
      var time = [];
      var temp = [];
      var forecast = [];
      var weather_forecast_DOM = '<div id="fheader"><div id="ftitle">24 hr forecast</div><div id="flocation">' + fcity + '</div></div>';
      weather_forecast_DOM += '<div id="fcontent">'
      for (var i = 0; i < 8; i++) {
        time[i] = new Date(resp["list"][i]["dt"] * 1000).toLocaleString();
        temp[i] = resp["list"][i]["main"]["temp"];
        forecast[i] = resp["list"][i]["weather"][0]["main"] + "<span id='narrow'> (" + resp["list"][i]["weather"][0]["description"];
        if (resp["list"][i].hasOwnProperty("rain")) {
          if (resp["list"][i]["rain"].hasOwnProperty("1h")) {
            forecast[i] += ", " + resp["list"][i]["rain"]["1h"] + " mm";
          }
          else if (resp["list"][i]["rain"].hasOwnProperty("3h")) {
            forecast[i] += ", " + resp["list"][i]["rain"]["3h"] + " mm";
          }
        }

        if (resp["list"][i].hasOwnProperty("snow")) {
          if (resp["list"][i]["snow"].hasOwnProperty("1h")) {
            forecast[i] += ", " + resp["list"][i]["snow"]["1h"] + " mm";
          }
          else if (resp["list"][i]["snow"].hasOwnProperty("3h")) {
            forecast[i] += ", " + resp["list"][i]["snow"]["3h"] + " mm";
          }
        }
        forecast[i] += ")</span>";

        let compassSector = ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW", "N"];
        var wind_direction = "calm";
        if((resp["list"][i]["wind"]["deg"] / 22.5).toFixed(0) == 0)
          wind_direction = compassSector[0];
        else
          wind_direction = compassSector[(resp["list"][i]["wind"]["deg"] / 22.5).toFixed(0) - 1];

        forecast[i] += '<span id="fwind_show"> - Wind: ' + resp["list"][i]["wind"]["speed"] + ' m/s (' + wind_direction + ')</span>';
        forecast[i] += '<span id="fhumidity_show"> - Humidity: ' + resp["list"][0]["main"]["humidity"] + ' %</span>';
        forecast[i] += '<span id="fpressure_show"> - Pressure: ' + resp["list"][0]["main"]["pressure"] + ' hpa</span>';

        weather_forecast_DOM += '<div id="forecast_data_' + i + '"><img src="https://openweathermap.org/img/wn/' + resp["list"][i]["weather"][0]["icon"] + '@2x.png"></img>';
        weather_forecast_DOM += '<div class="ftime">';
        weather_forecast_DOM += '<span class="fwidth_240">' + time[i].substring(0, 11) + '</span>' + time[i].substring(11, time[i].length);
        weather_forecast_DOM += '</div><div class="fdata">' + temp[i] + ' &deg;C - ' + forecast[i] + '</div></div><hr />';
      }
      weather_forecast_DOM += '<div id="credit"><a href="https://openweathermap.org/">OpenWeather</a></div></div>';
      document.getElementById("wforecast").innerHTML = weather_forecast_DOM;
    }
    else {
      info_message.innerHTML += "<div class='ftime'>Error Occurred</div><div class='fdata'>" + resp["cod"] + " (" + resp["message"] + ")</div>";
    }
  }

  request.onerror = function(e) {
    document.getElementById("flocation").innerHTML = "Network Error";
  };

  // Send request
  request.send();
}
