/* REQUIRES: NS.js, NS_BS.js, NS_AD.js */

let today = new Date();
let AD_TODAY_YEAR = today.getFullYear();
let AD_TODAY_MONTH = today.getMonth();
let AD_TODAY_DATE = today.getDate();

let ns_today = convert_ad_to_ns(AD_TODAY_YEAR, AD_TODAY_MONTH + 1, AD_TODAY_DATE);
let ns_today_list = ns_today.split(" ");
let ns_today_year = ns_today_list[0];
let ns_today_month = ns_today_list[1];
let ns_today_date = ns_today_list[2];

let currentMonth = parseInt(ns_today_month);
let currentYear = parseInt(ns_today_year);
const select_year = document.getElementById("year");
const select_month = document.getElementById("month");
const monthAndYear = document.getElementById("monthAndYear");

// create options for select year (1100-1199 NS) and select current year
for (let ns_year = 1100; ns_year < 1200; ns_year++) {
  let option = document.createElement("option");
  select_year.options.add(option);
  option.text = arabic_number_to_nepali(ns_year);
  option.value = ns_year;
}
select_year.value = ns_today_year;


showCalendar(currentMonth, currentYear);

function previous() {
    // go to previous month
    currentYear = (currentMonth == 1) ? currentYear - 1 : currentYear;
    currentMonth = (currentMonth == 1) ? 12 : currentMonth - 1;
    showCalendar(currentMonth, currentYear);
}

function next() {
    // go to next month
    currentYear = (currentMonth == 12) ? currentYear + 1 : currentYear;
    currentMonth = (currentMonth == 12) ? 1 : currentMonth + 1;
    showCalendar(currentMonth, currentYear);
}

function jump() {
    // go to specific month of specific year
    currentYear = parseInt(select_year.value);
    currentMonth = parseInt(select_month.value);
    showCalendar(currentMonth, currentYear);
}

function fill_lunar_data() {
    // ONLY FOR 2077 BS
    const lunar_data_url = "https://raw.githubusercontent.com/brihat-rb/brihat-rb.github.io/master/solarnscalendar/data/2077_lunar_data.json";

    var lunar_data_req = new XMLHttpRequest();
    var LUNAR_EVENTS = "";

    lunar_data_req.open('GET', lunar_data_url, true);
    lunar_data_req.onload = function() {
        LUNAR_EVENTS = JSON.parse(this.response);
        let lunar_span = document.getElementsByClassName('for_lunar');

        let prev_span_element = "";
        let prev_lunar_month = "";

        let lunar_month_list = [];
        let lunar_year_list = [];

        for (let i = 0; i < lunar_span.length; i++) {
            let span_element = lunar_span[i];
            let span_id = span_element.id;
            let span_event = "n/a";
            if (LUNAR_EVENTS.hasOwnProperty(span_id)) {
              span_event = LUNAR_EVENTS[span_id][2];
              if (i == 0) {
                span_element.classList.add("pstart");
                lunar_month_list.push(LUNAR_EVENTS[span_id][0]);
                lunar_year_list.push(LUNAR_EVENTS[span_id][3]);
              }
              if (i > 0) {
                if (prev_lunar_month != LUNAR_EVENTS[span_id][0]) {
                  lunar_month_list.push(LUNAR_EVENTS[span_id][0]);
                  if (lunar_year_list.indexOf(LUNAR_EVENTS[span_id][3]) == -1) {
                    lunar_year_list.push(LUNAR_EVENTS[span_id][3]);
                  }

                  if (prev_span_element.classList.contains("pstart")) {
                    span_element.classList.remove("pstart");
                    span_element.classList.add("pmid1");
                  }
                  else if (prev_span_element.classList.contains("pmid1")) {
                    span_element.classList.remove("pmid1");
                    span_element.classList.add("pmid2");
                  }
                  else if (prev_span_element.classList.contains("pmid2")) {
                    span_element.classList.remove("pmid2");
                    span_element.classList.add("pend");
                  }
                }
                else {
                  if (prev_span_element.classList.contains("pstart")) {
                    span_element.classList.add("pstart");
                  }
                  else if (prev_span_element.classList.contains("pmid1")) {
                    span_element.classList.add("pmid1");
                  }
                  else if (prev_span_element.classList.contains("pmid2")) {
                    span_element.classList.add("pmid2");
                  }
                  else if (prev_span_element.classList.contains("pend")) {
                    span_element.classList.add("pend");
                  }
                }
              }
              prev_span_element = span_element;
              prev_lunar_month = LUNAR_EVENTS[span_id][0];
            }
            span_element.innerHTML = span_event;
        }

        let pakshya_details = document.getElementById("lunar_details");
        if (lunar_month_list.length == 0 || lunar_year_list.length == 0) {
          pakshya_details.innerHTML = "";
        }
        else {
          if (lunar_year_list.length == 1) {
            pakshya_details.innerHTML = "<span class='pstart'>" + lunar_month_list[0] + "</span>" + " / ";
            pakshya_details.innerHTML += "<span class='pmid1'>" + lunar_month_list[1] + "</span>" + " / ";
            pakshya_details.innerHTML += "<span class='pmid2'>" + lunar_month_list[2] + "</span>";
            if (lunar_month_list.length == 4) {
              pakshya_details.innerHTML += " / " + "<span class='pend'>" + lunar_month_list[2] + "</span>";
            }
            pakshya_details.innerHTML += " " + arabic_number_to_nepali(lunar_year_list[0]);
          }
          else {
            pakshya_details.innerHTML = "<span class='pstart'>" + lunar_month_list[0] + "</span>" + ", ";
            pakshya_details.innerHTML += "<span class='pmid1'>" + lunar_month_list[1] + "</span>";
            if (lunar_month_list.length == 3) {
              pakshya_details.innerHTML += " " + arabic_number_to_nepali(lunar_year_list[0]) + " <b>/</b> ";
              pakshya_details.innerHTML += "<span class='pmid2'>" + lunar_month_list[2] + "</span>" + " ";
              pakshya_details.innerHTML += arabic_number_to_nepali(lunar_year_list[1]);
            }
            else if (lunar_month_list.length == 4) {
              // not tested yet
              pakshya_details.innerHTML += ", <span class='pmid2'>" + lunar_month_list[2] + "</span>" + " ";
              pakshya_details.innerHTML += arabic_number_to_nepali(lunar_year_list[0]) + " <b>/</b> ";
              pakshya_details.innerHTML += "<span class='pend'>" + lunar_month_list[3] + "</span>" + " ";
              pakshya_details.innerHTML += arabic_number_to_nepali(lunar_year_list[1]);
            }
          }
        }
    }
    lunar_data_req.onerror = function() {
        console.log("Error fetching Lunar Data.")
        LUNAR_EVENTS = "";
    }
    lunar_data_req.send();
}

function showCalendar(month, year) {
    // this funciton displays the calendar and all the data inside it
    let equivalent_ad_date = convert_ns_to_ad(year, month, 1);

    let first_day = (new Date(equivalent_ad_date)).getDay();
    let last_date = get_last_date_ns(year, month);

    let tbl = document.getElementById("calendar-body"); // body of the calendar

    // clearing all previous cells
    tbl.innerHTML = "";

    // get BS months and years that lie in this month
    let bs_month_start = convert_ns_to_bs(year, month, 1).split(" ")[1];
    let bs_month_end = convert_ns_to_bs(year, month, last_date).split(" ")[1];
    let bs_year_start = convert_ns_to_bs(year, month, 1).split(" ")[0];
    let bs_year_end = convert_ns_to_bs(year, month, last_date).split(" ")[0];

    let bs_month_year = "";
    if (bs_year_start == bs_year_end) {
      bs_month_year = BS_MONTHS_NEP[bs_month_start - 1] + " / " + BS_MONTHS_NEP[bs_month_end - 1] + " " + arabic_number_to_nepali(bs_year_start);
    }
    else{
      bs_month_year = BS_MONTHS_NEP[bs_month_start - 1] + " " + arabic_number_to_nepali(bs_year_start) + " / " + BS_MONTHS_NEP[bs_month_end - 1] + " " + arabic_number_to_nepali(bs_year_end);
    }

    // get AD months and years that lie in this month
    let ad_month_start = AD_MONTHS_SHORT[convert_ns_to_ad(year, month, 1).split(" ")[1] - 1];
    let ad_month_end = AD_MONTHS_SHORT[convert_ns_to_ad(year, month, last_date).split(" ")[1] - 1];
    let ad_year_start = convert_ns_to_ad(year, month, 1).split(" ")[0];
    let ad_year_end = convert_ns_to_ad(year, month, last_date).split(" ")[0];

    let ad_month_year = ""
    if (ad_year_start == ad_year_end) {
      ad_month_year = ad_month_start + " / " + ad_month_end + " " + ad_year_start;
    }
    else{
      ad_month_year = ad_month_start + " " + ad_year_start + " / " + ad_month_end + " " + ad_year_end;
    }

    // filing data about month and in the page via DOM.
    monthAndYear.innerHTML = ""
    monthAndYear.innerHTML += "<b>" + NS_NEP[month - 1] + " " + arabic_number_to_nepali(year) + "</b>";
    monthAndYear.innerHTML += "<h6><span style='color: green'>" + bs_month_year + "</span>&emsp;|&emsp;<span style='color: chocolate'>" + ad_month_year + "</span></h6>";
    monthAndYear.innerHTML += "<div id='lunar_details'></div>"
    monthAndYear.innerHTML += "<div id='footer'>brihat (brihatbajracharya@gmail.com)</div>"
    // update Go To section as well
    select_year.value = year;
    select_month.value = month;

    // creating all cells
    let date = 1;
    for (let i = 0; i < 6; i++) {
        // creates a table row
        let row = document.createElement("tr");

        //creating individual cells, filing them up with data.
        for (let j = 0; j < 7; j++) {
            if (i === 0 && j < first_day) {
                let cell = document.createElement("td");
                if (j == 6) {
                  cell.classList.add("saturday");
                }
                let cellText = document.createTextNode("");
                cell.appendChild(cellText);
                row.appendChild(cell);
            }
            else if (date > get_total_days_in_ns_month(month, year)) {
                // filling up the table for all days completed
                break;
            }

            else {
                let cell = document.createElement("td");
                if (j == 6) {
                  cell.classList.add("saturday");
                }
                let bs = convert_ns_to_bs(year, month, date);
                let ad = convert_ns_to_ad(year, month, date);

                let bs_list = bs.split(" ");
                let bs_year = bs_list[0];
                let bs_month = bs_list[1];
                let bs_date = bs_list[2];

                let ad_list = ad.split(" ");
                let ad_year = ad_list[0];
                let ad_month = ad_list[1];
                let ad_date = ad_list[2];

                let result = "<h4 align='center'><b>" + arabic_number_to_nepali(date) + "</b></h4>";
                let bs_date_for_lunar_data = bs_year.toString() + "-" + bs_month.toString().padStart(2, "0") + "-" + bs_date.toString().padStart(2, "0");
                result += "<span class='for_lunar' align='center' id=" + bs_date_for_lunar_data + "></span><br />";
                result += "<span class='bs_date'>" + arabic_number_to_nepali(bs_date) + "</span>";
                result += "<span class='ad_date'>" + ad_date + "</span>";
                let cellText = document.createElement("span");
                cellText.innerHTML = result;
                if (date == ns_today_date && year == ns_today_year && month == ns_today_month) {
                    cell.classList.add("text-primary");
                    cell.classList.add("cell-today");
                    // cell.classList.add("bg-dark");
                } // color today's date
                cell.appendChild(cellText);
                row.appendChild(cell);
                date++;
            }
        }
        tbl.appendChild(row); // appending each row into calendar body.
    }
    // finally fill lunar pakshya (ONLY FOR 2077 BS for now)
    fill_lunar_data();
}
