/* * REQUIRES: AD_BS.js * */

// CALENDAR HELPER FUNCTIONS
function ad_string_from_date(date) {
    // return ad date string in form of 'date month(str) year'
    let date_string = date.toLocaleDateString().split("/");
    return date_string[0] + " " + AD_MONTHS[parseInt(date_string[1]) - 1] + " " + date_string[2];
}

function get_bs_month(month) {
    // return number equiv of BS month i.e. Baisakh = 1
    return BS_MONTHS.indexOf(month) + 1;
}

function get_bs_date_from_date_object(date) {
    // convert date object to BS date string
    return convert_ad_to_bs(date.getFullYear(), date.getMonth() + 1, date.getDate());
}

function get_nep_bs_date_from_date_object(date) {
    // convert date object to BS date string in nepali
    let bs_date_eng = get_bs_date_from_date_object(date);
    return date_string_nep(bs_date_eng);
}

function date_string_nep(bs_date_eng) {
    let bs_date_eng_list = bs_date_eng.split(" ");
    let result = "";
    result += arabic_number_to_nepali(bs_date_eng_list[0]) + " ";
    result += BS_MONTHS_NEP[get_bs_month(bs_date_eng_list[1]) - 1] + " ";
    result += arabic_number_to_nepali(bs_date_eng_list[2]);
    return result;
}

function get_ad_date_string(ad_date_result) {
    let ad_date_list = ad_date_result.split(" ");
    let ad_month = AD_MONTHS.indexOf(ad_date_list[1]) + 1;
    if (ad_month < 10) {
        ad_month = "0" + ad_month;
    }

    if (ad_date_list[0] < 10) {
        ad_date_list[0] = "0" + ad_date_list[0];
    }
    return ad_date_list[2] + "-" + ad_month + "-" + ad_date_list[0];
}

function get_nepali_day_from_bs_date(bs_year, bs_month, bs_date) {
    // returns nepali day in nepali font from given nepali date
    let ad_date_string = convert_bs_to_ad(bs_year, bs_month, bs_date, "another message");
    let ad_date_list = ad_date_string.split(" ");
    let ad_date = new Date(ad_date_list[2] + "-" + (AD_MONTHS.indexOf(ad_date_list[1]) + 1) + "-" + ad_date_list[0]);
    return NEPALI_DAYS[ad_date.getDay()];
}

function arabic_number_to_nepali(number) {
    number = number.toString();
    let nepali_number = "";
    for (let i = 0; i < number.length; i++) {
        nepali_number += NEPALI_DIGITS[parseInt(number.charAt(i))];
    }
    return nepali_number;
}

function get_bs_date_detail(bs_year, bs_month, bs_date) {
    var json_url = "";
    var date_detail = '{}';

    if (bs_year >= 2076 && bs_year <= 2080) {
        json_url = 'https://raw.githubusercontent.com/brihat-rb/brihat-rb.github.io/master/calendar/data/' + bs_year + '_detailed.json';
    }
    else if (bs_year >= 2070 && bs_year <= 2075) {
        json_url = 'https://raw.githubusercontent.com/brihat-rb/brihat-rb.github.io/master/calendar/data/' + bs_year + '.json';
    }
    else {
        return '{}';
    }

    var nepal_event_req = new XMLHttpRequest();
    nepal_event_req.open('GET', json_url, false);
    nepal_event_req.onload = function () {
        var events = JSON.parse(this.response);
        date_detail = JSON.stringify(events.data[parseInt(bs_month) - 1][parseInt(bs_date) - 1]);
    }
    nepal_event_req.send();

    return date_detail;
}

// fill up the fields
let select_list_ids = ["_", "_birthdate_", "_asof_", "_event_", "_date_calc_"];

for (let elem = 0; elem < select_list_ids.length; elem++) {
    for (let year = 1975; year <= 2100; year++) {
        if (select_list_ids[elem] == "_event_") {
            if (year < 2070 || year > 2080) {
                continue;
            }
        }
        let select = document.getElementById("select" + select_list_ids[elem] + "year");
        let option = document.createElement("option");
        select.options.add(option);
        option.text = arabic_number_to_nepali(year);
        option.value = year;
    }

    for (let month = 1; month <= 12; month++) {
        let select = document.getElementById("select" + select_list_ids[elem] + "month");
        let option = document.createElement("option");
        select.options.add(option);
        option.text = BS_MONTHS_NEP[month - 1];
        option.value = month;
    }

    for (let date = 1; date <= 32; date++) {
        let select = document.getElementById("select" + select_list_ids[elem] + "date");
        let option = document.createElement("option");
        select.options.add(option);
        option.text = arabic_number_to_nepali(date);
        option.value = date;
    }
}

// main functions
function to_bs() {
    // shows converted BS date
    let ad_date = document.getElementById("ad_date").value;
    let ad_date_list = ad_date.split("-");
    let result = convert_ad_to_bs(ad_date_list[0], ad_date_list[1], ad_date_list[2]);
    document.getElementById("bs_result").innerHTML = date_string_nep(result) + " " + NEPALI_DAYS[new Date(ad_date).getDay()];
}

function to_ad() {
    // shows converted AD date
    let bs_year = document.getElementById("select_year").value;
    let bs_month = document.getElementById("select_month").value;
    let bs_date = document.getElementById("select_date").value;
    let result = convert_bs_to_ad(bs_year, bs_month, bs_date, "");
    document.getElementById("ad_result").innerHTML = result + " " + ENGLISH_DAYS[new Date(get_ad_date_string(result)).getDay()];
}

// default settings on page load
let bs_today = get_bs_date_from_date_object(new Date()).split(" ");
document.getElementById("select_year").value = bs_today[0];
document.getElementById("select_month").value = get_bs_month(bs_today[1]);
document.getElementById("select_date").value = bs_today[2];

document.getElementById("select_asof_year").value = bs_today[0];
document.getElementById("select_asof_month").value = get_bs_month(bs_today[1]);
document.getElementById("select_asof_date").value = bs_today[2];

document.getElementById("ad_date").value = new Date().toISOString().substring(0, 10);
document.getElementById('date2').value = new Date().toISOString().substr(0, 10);

document.getElementById("select_event_year").value = bs_today[0];
document.getElementById("select_event_month").value = get_bs_month(bs_today[1]);
document.getElementById("select_event_date").value = bs_today[2];
