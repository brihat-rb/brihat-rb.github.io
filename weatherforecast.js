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
  var request = new XMLHttpRequest();
  fcity = document.getElementById("location").innerHTML;
  fcity = fcity.substring(0, fcity.length - 5);

  url = 'https://api.openweathermap.org/data/2.5/forecast?q=' + fcity + '&appid=' + APPID + '&mode=' + MODE + '&units=metric';

  request.open('GET', url, true);

  request.onload = function() {
    // Begin accessing JSON data here
    resp = JSON.parse(this.response);
    var time = [];
    var temp = [];
    var forecast = [];
    var weather_forecast_DOM = '<div id="ftitle">24 hr forecast</div><div id="flocation">' + fcity + '</div>';
    for (var i = 0; i < 8; i++) {
      time[i] = resp["list"][i]["dt_txt"];
      temp[i] = resp["list"][i]["main"]["temp"];
      forecast[i] = resp["list"][i]["weather"][0]["main"] + " (" + resp["list"][i]["weather"][0]["description"] + ")";
      weather_forecast_DOM += '<div id="forecas_data_' + i + '"><img src="https://openweathermap.org/img/wn/' + resp["list"][i]["weather"][0]["icon"] + '@2x.png"></img>';
      weather_forecast_DOM += '<div class="ftime">' + time[i] + '</div><div class="fdata">' + temp[i] + " &deg;C - " + forecast[i] + "</div></div><hr />";
    }
    weather_forecast_DOM += '<div id="credit"><a href="https://openweathermap.org/">OpenWeather</a></div>';
    document.getElementById("wforecast").innerHTML = weather_forecast_DOM;
  }
  // Send request
  request.send();
}
