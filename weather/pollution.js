let pollution_popup_box = document.getElementById("pollution_popup");
let pollution_div = document.getElementById("pollution");
let pollution_span = document.getElementsByClassName("pollution_close")[0];

// When the user clicks the button, open the modal
pollution_div.onclick = function() {
  get_pollution_info();
  pollution_popup_box.style.display = "block";
};

// When the user clicks on <span> (x), close the modal
pollution_span.onclick = function() {
  pollution_popup_box.style.display = "none";
};

// When the user clicks anywhere outside of the modal within parent, close it
window.addEventListener('click', function(event) {
  if (event.target == pollution_popup_box) {
    pollution_popup_box.style.display = "none";
  }
});

const KID = "e0ff03479e";

function get_pollution_info() {
  let pollution_api_request = new XMLHttpRequest();
  let pollution_api_url = 'https://api.openweathermap.org/data/2.5/air_pollution?lat=' + current_lat + '&lon=' + current_lon + '&appid=' + YID + KID + SID;

  let pollution_info_msg = document.getElementById("pollution_main");
  pollution_info_msg.innerHTML = '<div id="pheader"><div id="ptitle">CURRENT AIR INFO</div><div id="plocation">Please Wait</div></div></div><div id="pcontent"><div id="forcasting"><i class="load fa fa-refresh" aria-hidden="true"></i></div></div>';

  pollution_api_request.open('GET', pollution_api_url, true);
  pollution_api_request.onload = function() {
    // Begin accessing JSON data here
    let resp = JSON.parse(this.response);
    if(!resp.hasOwnProperty("cod")) {
      let pollution_content_DOM = '<div id="fheader"><div id="ptitle"><span class="ptitle_275">CURRENT </span>AIR INFO</div><div id="plocation">' + document.getElementById('local_city').innerText + '</div></div>';
      pollution_content_DOM += '<div id="pcontent">';
      let aqi_description = ["N/A", "Good", "Fair", "Moderate", "Poor", "Very Poor"];
      let aqi = resp.list[0].main.aqi;
      let p_content = "<br />A<span class='pwidth_350'>ir </span>Q<span class='pwidth_350'>uality </span>I<span class='pwidth_350'>ndex</span>: ";
      p_content += "<span id='air_aqi'>" + aqi + " (<span id='aqi_" + aqi + "'>" + aqi_description[aqi] + "</span>)</span><br /><br />";
      p_content += "<span class='pwidth_350'>Сoncentration of </span>CO: <span id='air_co'>" + resp.list[0].components.co + "</span> &mu;g/m<sup>3</sup><br /><br />";
      p_content += "<span class='pwidth_350'>Сoncentration of </span>NH<sub>3</sub>: <span id='air_nh3'>" + resp.list[0].components.nh3 + "</span> &mu;g/m<sup>3</sup><br /><br />";
      p_content += "<span class='pwidth_350'>Сoncentration of </span>NO: <span id='air_no'>" + resp.list[0].components.no + "</span> &mu;g/m<sup>3</sup><br /><br />";
      p_content += "<span class='pwidth_350'>Сoncentration of </span>NO<sub>2</sub>: <span id='air_no2'>" + resp.list[0].components.no2 + "</span> &mu;g/m<sup>3</sup><br /><br />";
      p_content += "<span class='pwidth_350'>Сoncentration of </span>O<sub>3</sub>: <span id='air_o3'>" + resp.list[0].components.o3 + "</span> &mu;g/m<sup>3</sup><br /><br />";
      p_content += "<span class='pwidth_350'>Сoncentration of </span>PM<sub>10</sub>: <span id='air_pm10'>" + resp.list[0].components.pm10 + "</span> &mu;g/m<sup>3</sup><br /><br />";
      p_content += "<span class='pwidth_350'>Сoncentration of </span>PM<sub>2.5</sub>: <span id='air_pm2_5'>" + resp.list[0].components.pm2_5 + "</span> &mu;g/m<sup>3</sup><br /><br />";
      p_content += "<span class='pwidth_350'>Сoncentration of </span>SO<sub>2</sub>: <span id='air_so2'>" + resp.list[0].components.so2 + "</span> &mu;g/m<sup>3</sup><br /><br />";

      pollution_content_DOM += p_content;

      let pollution_upd_datetime = new Date((resp.list[0].dt + TIMEZONE + new Date().getTimezoneOffset() * 60) * 1000);
      pollution_content_DOM += "<div id='pupdate'>As of: ";
      pollution_content_DOM += "<span class='pdate_250'>" + pollution_upd_datetime.toLocaleDateString() + " </span>" + pollution_upd_datetime.toLocaleTimeString() + "</div>";

      pollution_content_DOM += '<div id="credit"><a href="https://openweathermap.org/">OpenWeather</a></div>';
      document.getElementById("pollution_main").innerHTML = pollution_content_DOM;
    }
    else {
      document.getElementById("plocation").innerHTML = "Error";
      document.getElementById("pcontent").innerHTML = "<div class='perror'>An Error Occurred</div><div class='perrdesc'>" + resp.cod + " - " + resp.message.substring(0, 16) + "</div>";
    }
  };

  pollution_api_request.onerror = function(e) {
    document.getElementById("plocation").innerHTML = "Network Error";
    document.getElementById("pcontent").innerHTML = "";
  };

  pollution_api_request.send();
}
