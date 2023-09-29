var nat_event_url = 'https://raw.githubusercontent.com/brihat-rb/brihat-rb.github.io/master/calendar/data/national_events.json';
var int_event_url = 'https://raw.githubusercontent.com/brihat-rb/brihat-rb.github.io/master/calendar/data/international_events.json';
var solar_event_url = 'https://raw.githubusercontent.com/brihat-rb/brihat-rb.github.io/master/calendar/data/solar_ns_events.json';
var other_event_url = 'https://raw.githubusercontent.com/brihat-rb/brihat-rb.github.io/master/calendar/data/other_calendar_events.json';
var public_holiday_url = 'https://raw.githubusercontent.com/brihat-rb/brihat_calendar/main/data/public_holidays_in_nepal.json';

var nat_event_req = new XMLHttpRequest();
var int_event_req = new XMLHttpRequest();
var solar_event_req = new XMLHttpRequest();
var other_event_req = new XMLHttpRequest();
var public_holiday_req = new XMLHttpRequest();

var nevents = "";
var ievents = "";
var snsevents = "";
var oevents = "";
var public_holidays = "";

nat_event_req.open('GET', nat_event_url, false);
nat_event_req.onload = function () {
    nevents = JSON.parse(this.response);
    console.info("National Events: Loaded.");
}
nat_event_req.send();

int_event_req.open('GET', int_event_url, false);
int_event_req.onload = function () {
    ievents = JSON.parse(this.response);
    console.info("International Events: Loaded.");
}
int_event_req.send();

solar_event_req.open('GET', solar_event_url, false);
solar_event_req.onload = function () {
    snsevents = JSON.parse(this.response);
    console.info("Solar Nepal Sambat Events: Loaded.");
}
solar_event_req.send();

other_event_req.open('GET', other_event_url, false);
other_event_req.onload = function () {
    oevents = JSON.parse(this.response);
    console.info("Other Events: Loaded.");
}
other_event_req.send();

public_holiday_req.open('GET', public_holiday_url, false);
public_holiday_req.onload = function () {
    public_holidays = JSON.parse(this.response);
    console.info("Public Holidays JSON: Loaded.");
}
public_holiday_req.send();

let ad_date_today = new Date()
let ad_year = ad_date_today.getFullYear();
let ad_month = ad_date_today.getMonth() + 1;
let ad_date = ad_date_today.getDate();
let ad_day = ad_date_today.getDay();

let bs_date_today = convert_ad_to_bs(ad_year, ad_month, ad_date).split(" ");
let bs_year = bs_date_today[0];
let bs_month = bs_date_today[1];
let bs_date = bs_date_today[2];

let ns_date_today = convert_ad_to_ns(ad_year, ad_month, ad_date).split(" ");
let ns_month = ns_date_today[1].padStart(2, '0');
let ns_date = ns_date_today[2].padStart(2, '0');

let int_events_key = ad_month.toString().padStart(2, '0') + "-" + ad_date.toString().padStart(2, '0');
let nat_events_key = bs_month.padStart(2, '0') + "-" + bs_date.padStart(2, '0');
let sns_events_key = ns_month.padStart(2, '0') + "-" + ns_date.padStart(2, '0');

var lunar_json_url = 'https://raw.githubusercontent.com/brihat-rb/brihat-rb.github.io/master/calendar/data/' + bs_year + '_detailed.json';

var lunar_event_req = new XMLHttpRequest();
var events = "";

lunar_event_req.open('GET', lunar_json_url, false);
lunar_event_req.onload = function () {
    events = JSON.parse(this.response);
    console.info("Lunar Events (for", bs_year, "BS ): Loaded.");
}
lunar_event_req.send();

var current_year = bs_year;
var current_month = bs_month;
var current_date = bs_date;

function next_day(year, month, day) {
    // Exceptional Case
    if (year == Object.keys(BS_CALENDAR_DATA).sort().pop() && month == 12 && day == BS_CALENDAR_DATA[year][month - 1]) {
        alert("No Next Day Data Available, Sorry!");
        return;
    }

    if (day < BS_CALENDAR_DATA[year][month - 1]) {
        get_event(year, month, day + 1);
    }
    else if (day == BS_CALENDAR_DATA[year][month - 1]) {
        if (month < 12) {
            get_event(year, month + 1, 1);
        }
        else if (month == 12) {
            get_event(year + 1, 1, 1);
        }
    }
    else {
        console.warn("Error getting next day for: ", year, month, date);
    }
}

function previous_day(year, month, day) {
    // Exceptional Case
    if (year == Object.keys(BS_CALENDAR_DATA)[0] && month == 1 && day == 1) {
        alert("No Previous Day Data Available, Sorry!");
        return;
    }

    if (day > 1) {
        get_event(year, month, day - 1);
    }
    else if (day == 1) {
        if (month > 1) {
            get_event(year, month - 1, BS_CALENDAR_DATA[year][month - 2]);
        }
        else if (month == 1) {
            get_event(year - 1, 12, BS_CALENDAR_DATA[year - 1][11]);
        }
    }
    else {
        console.warn("Error getting next day for: ", year, month, date);
    }
}

function next_month(year, month, day) {
    // Exceptional Case
    if (year == Object.keys(BS_CALENDAR_DATA).sort().pop() && month == 12) {
        alert("No Next Month Data Available, Sorry!");
        return;
    }

    if (month < 12) {
        if (day > BS_CALENDAR_DATA[year][month]) {
            get_event(year, month + 1, BS_CALENDAR_DATA[year][month]);
        }
        else {
            get_event(year, month + 1, day);
        }
    }
    else if (month == 12) {
        if (day > BS_CALENDAR_DATA[year + 1][0]) {
            get_event(year + 1, 1, BS_CALENDAR_DATA[year + 1][0]);
        }
        else {
            get_event(year + 1, 1, day);
        }
    }
    else {
        console.warn("Error getting next month for: ", year, month, date);
    }
}

function previous_month(year, month, day) {
    // Exceptional Case
    if (year == Object.keys(BS_CALENDAR_DATA)[0] && month == 1) {
        alert("No Previous Month Data Available, Sorry!");
        return;
    }

    if (month > 1) {
        if (day > BS_CALENDAR_DATA[year][month - 2]) {
            get_event(year, month - 1, BS_CALENDAR_DATA[year][month - 2]);
        }
        else {
            get_event(year, month - 1, day);
        }
    }
    else if (month == 1) {
        if (day > BS_CALENDAR_DATA[year - 1][11]) {
            get_event(year - 1, 12, BS_CALENDAR_DATA[year - 1][11]);
        }
        else {
            get_event(year - 1, 12, day);
        }
    }
    else {
        console.warn("Error getting next month for: ", year, month, date);
    }
}

function next_year(year, month, day) {
    // Exceptional Case
    if (year == Object.keys(BS_CALENDAR_DATA).sort().pop()) {
        alert("No Next Year Data Available, Sorry!");
        return;
    }

    if (day > BS_CALENDAR_DATA[year + 1][month - 1]) {
        get_event(year + 1, month, BS_CALENDAR_DATA[year + 1][month - 1]);
    }
    else {
        get_event(year + 1, month, day);
    }
}

function previous_year(year, month, day) {
    // Exceptional Case
    if (year == Object.keys(BS_CALENDAR_DATA)[0]) {
        alert("No Previous Month Data Available, Sorry!");
        return;
    }

    if (day > BS_CALENDAR_DATA[year - 1][month - 1]) {
        get_event(year - 1, month, BS_CALENDAR_DATA[year - 1][month - 1]);
    }
    else {
        get_event(year - 1, month, day);
    }
}

