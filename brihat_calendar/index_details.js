/* * REQUIRES: index_cal_conv.js * */

function convert_to_nepali(date_string) {
  var date_split = date_string.split("-");
  var result = "";
  result += arabic_number_to_nepali(date_split[0]) + " ";
  result += BS_MONTHS_NEP[date_split[1] - 1] + " ";
  result += arabic_number_to_nepali(date_split[2]) + " ";
  return result;
}

function tdclick(id) {
  // console.log(id);
  var td_element = document.getElementById(id).parentNode.parentNode;
  var title = document.getElementById('modal_title');
  var content = document.getElementById('modal_body');
  content.innerHTML = "Loading Details ...";

  document.getElementById("javascript_form").style.display = "none";
  document.getElementById("js_send").value = 'SEND SUGGESTION';
  document.getElementById("js_send").disabled = false;
  document.getElementById("suggestion_info").innerHTML = "";
  document.getElementById("suggest_subject").value = "";
  document.getElementById("suggest_message").value = "";

  var lunar_classlist = Array.from(document.getElementById(id).classList);
  lunar_classlist.splice(lunar_classlist.indexOf("for_lunar"), 1);
  var lunar_class = lunar_classlist[0];

  var bs_date_split = id.split("-");
  var bs_year = bs_date_split[0];
  var bs_month = bs_date_split[1];
  var bs_date = bs_date_split[2];

  let ns_date_list = convert_bs_to_ns(bs_year, bs_month, bs_date).split(" ");
  // let ad_date = convert_ns_to_ad(ns_date_list[0], ns_date_list[1], ns_date_list[2]);
  let ad_date = convert_bs_to_ad(bs_year, bs_month, bs_date);
  let ad_date_list = ad_date.split(" ");
  let ad_date_sub = "<sup>th</sup>";
  if (ad_date_list[2].split("")[ad_date_list[2].length - 1] == 1) {
    ad_date_sub = "<sup>st</sup>";
  }
  else if (ad_date_list[2].split("")[ad_date_list[2].length - 1] == 2) {
    ad_date_sub = "<sup>nd</sup>";
  }
  else if (ad_date_list[2].split("")[ad_date_list[2].length - 1] == 3) {
    ad_date_sub = "<sup>rd</sup>";
  }
  else {
    ad_date_sub = "<sup>th</sup>";
  }
  let nepali_day = new Date(ad_date).getDay();

  let nepali_date = arabic_number_to_nepali(bs_year) + " ";
  nepali_date += BS_MONTHS_NEP[bs_month-1] + " ";
  nepali_date += arabic_number_to_nepali(bs_date);
  let nepali_date_day = nepali_date + ", " + NEPALI_DAYS[nepali_day];

  let solar_ns_date_list = convert_bs_to_ns(bs_year, bs_month, bs_date).split(" ");
  let solar_ns_date = "सौ. ने. सं. " + arabic_number_to_nepali(solar_ns_date_list[0]) + " ";
  solar_ns_date += NS_NEP[solar_ns_date_list[1] - 1] + " " + arabic_number_to_nepali(solar_ns_date_list[2]);
  // solar_ns_date += ", " + NS_DAYS[nepali_date_day];

  if (CALENDAR_MODE == 2) {
    title.innerHTML = "<b>" + "वि. सं. " + nepali_date_day + "</b>";
  }
  else if (CALENDAR_MODE == 1) {
    title.innerHTML = "<b>" + ad_date_list[2] + ad_date_sub + " " + AD_MONTHS[ad_date_list[1] - 1] + " " + ad_date_list[0] + " AD, " + ENGLISH_DAYS[nepali_day] + "</b>";
  }
  else if (CALENDAR_MODE == 0) {
    title.innerHTML = "<b>" + solar_ns_date + ", " + NS_DAYS[nepali_day] + "</b>";
  }
  else {
    title.innerHTML = "<b>Unknown Error Occured</b>";
  }

  if (td_element.classList.contains("text-primary")) {
    title.classList.add("text-primary");
  }
  else {
    title.classList.remove("text-primary");
  }

  if(nepali_day == 6) {
    title.classList.add('saturday');
  }
  else {
    title.classList.remove('saturday');
  }

  if (bs_year < 2070 || bs_year > 2078) {
    let default_content = "";
    if (CALENDAR_MODE == 2) {
      default_content += "<brihat class='ad_left'>" + ad_date_list[2] + ad_date_sub + " " + AD_MONTHS[ad_date_list[1] - 1] + " " + ad_date_list[0] + " AD</brihat>";
      default_content += "<br /><brihat class='ns_right'>" + solar_ns_date + "</brihat>";
    }
    else if (CALENDAR_MODE == 1) {
      default_content += "<brihat class='ns_left'>" + solar_ns_date + "</brihat>";
      default_content += "<br />" + "<brihat class='bs_right'>वि. सं. " + nepali_date + "</brihat>";
    }
    else if (CALENDAR_MODE == 0) {
      default_content += "<brihat class='bs_left'>वि. सं. " + nepali_date + "</brihat><br />";
      default_content += "<brihat class='ad_choco'>" + ad_date_list[2] + ad_date_sub + " " + AD_MONTHS[ad_date_list[1] - 1] + " " + ad_date_list[0] + " AD</brihat>";
    }
    content.innerHTML = default_content + "<br /><br />";
    content.innerHTML += "<b>Details not available for year '<u>" + arabic_number_to_nepali(bs_year) + "</u>' BS</b>";
    return;
  }

  var nepal_event_req = new XMLHttpRequest();
  // json_url = 'https://raw.githubusercontent.com/brihat-rb/brihat-rb.github.io/master/calendar/data/' + bs_year + '.json';
  if (bs_year >= 2076 && bs_year <= 2078) {
    json_url = 'https://raw.githubusercontent.com/brihat-rb/brihat-rb.github.io/master/calendar/data/' + bs_year + '_detailed.json';
  }
  else {
    json_url = 'https://raw.githubusercontent.com/brihat-rb/brihat-rb.github.io/master/calendar/data/' + bs_year + '.json';
  }

  nepal_event_req.open('GET', json_url, true);
  nepal_event_req.onload = function() {
    let events = JSON.parse(this.response);

    let info_content = '<div id="tithi" class="' + lunar_class + '">';
    if (events.data[bs_month - 1][bs_date - 1].hasOwnProperty("ns_year")) {
      info_content += "ने. सं. " + arabic_number_to_nepali(events.data[bs_month - 1][bs_date - 1].ns_year) + " ";
    }
    if (events.data[bs_month - 1][bs_date - 1].hasOwnProperty("lunar_month")) {
      info_content += events.data[bs_month - 1][bs_date - 1].lunar_month;
    }
    if (events.data[bs_month - 1][bs_date - 1].hasOwnProperty("pakshya")) {
      info_content += " (" + events.data[bs_month - 1][bs_date - 1].pakshya + ") ";
    }
    info_content += events.data[bs_month - 1][bs_date - 1].tithi + '</div>';

    // if (CALENDAR_MODE != 0) {
    //   info_content += "<br />";
    // }
    info_content += "<br />";

    if (CALENDAR_MODE == 2) {
      info_content += "<span class='ad_left'>" + ad_date_list[2] + ad_date_sub + " " + AD_MONTHS[ad_date_list[1] - 1] + " " + ad_date_list[0] + " AD</span>";
      info_content += "<br /><span class='ns_right'>" + solar_ns_date + "</span>";
    }
    else if (CALENDAR_MODE == 1) {
      info_content += "<span class='ns_left'>" + solar_ns_date + "</span><br />";
      info_content += "<span class='bs_right'>वि. सं. " + nepali_date + "</span>";
    }
    else {
      info_content += "<span class='bs_left'>" + "वि. सं. " + nepali_date + "</span><br />";
      info_content += "<span class='ad_choco'>" + ad_date_list[2] + ad_date_sub + " " + AD_MONTHS[ad_date_list[1] - 1] + " " + ad_date_list[0] + " AD</span>";
    }

    info_content += "<br /><br />";
    let has_events = false;
    if (events.data[bs_month - 1][bs_date - 1].event_one) {
      info_content += '<div id="info1">' + events.data[bs_month - 1][bs_date - 1].event_one + '</div>';
      has_events = true;
    }
    if (events.data[bs_month - 1][bs_date - 1].event_two) {
      info_content += '<div id="info2">' + events.data[bs_month - 1][bs_date - 1].event_two + '</div>';
      has_events = true;
    }
    if (events.data[bs_month - 1][bs_date - 1].event_three) {
      info_content += '<div id="info3">' + events.data[bs_month - 1][bs_date - 1].event_three + '</div>';
      has_events = true;
    }
    if (!has_events) {
      info_content += '<div id="no_info"><b>No events today</b></div>';
    }
    content.innerHTML = info_content;
  }
  nepal_event_req.onerror = function() {
    content.innerHTML = "Error Occured";
  }
  nepal_event_req.send();
}
