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

var lunar_json_loaded = false;
var national_json_loaded = false;
var international_json_loaded = false;
var other_event_json_loaded = false;
var solar_event_json_loaded = false;
var public_holidays_json_loaded = false;
var sunrise_json = false;
var sunset_json = false;
var sunrisesunset_json_loaded = false;

nat_event_req.open('GET', nat_event_url, false);
nat_event_req.onload = function () {
    nevents = JSON.parse(this.response);
    national_json_loaded = true;
    console.info("National Events: Loaded.");
}
nat_event_req.onerror = function () {
    national_json_loaded = false;
    console.error("National Events: Loading Failed.");
}
try {
    nat_event_req.send();
}
catch (error) {
    national_json_loaded = false;
}

int_event_req.open('GET', int_event_url, false);
int_event_req.onload = function () {
    ievents = JSON.parse(this.response);
    console.info("International Events: Loaded.");
}
int_event_req.onerror = function () {
    international_json_loaded = false;
    console.error("International Events: Loading Failed.");
}
try {
    int_event_req.send();
}
catch (error) {
    international_json_loaded = false;
}

solar_event_req.open('GET', solar_event_url, false);
solar_event_req.onload = function () {
    snsevents = JSON.parse(this.response);
    console.info("Solar Nepal Sambat Events: Loaded.");
}
solar_event_req.onerror = function () {
    solar_event_json_loaded = false;
    console.error("Solar Nepal Sambat Events: Loading Failed.");
}
try {
    solar_event_req.send();
}
catch (error) {
    solar_event_json_loaded = false;
}

other_event_req.open('GET', other_event_url, false);
other_event_req.onload = function () {
    oevents = JSON.parse(this.response);
    other_event_json_loaded = true;
    console.info("Other Events: Loaded.");
}
other_event_req.onerror = function () {
    other_event_json_loaded = false;
    console.error("Other Events: Loading Failed.");
}
try {
    other_event_req.send();
}
catch (error) {
    other_event_json_loaded = false;
}

public_holiday_req.open('GET', public_holiday_url, false);
public_holiday_req.onload = function () {
    public_holidays = JSON.parse(this.response);
    public_holidays_json_loaded = true;
    console.info("Public Holidays JSON: Loaded.");
}
public_holiday_req.onerror = function () {
    public_holidays_json_loaded = false;
    console.error("Public Holidays JSON: Loading Failed.");
}
try {
    public_holiday_req.send();
}
catch (error) {
    public_holidays_json_loaded = false;
}

let ad_date_today = new Date()
let ad_year = ad_date_today.getFullYear();
let ad_month = ad_date_today.getMonth() + 1;
let ad_date = ad_date_today.getDate();
let ad_day = ad_date_today.getDay();

var current_ad_year = ad_year;

var sunrise_url = 'https://raw.githubusercontent.com/brihat-rb/brihat_calendar/main/data/sunrise_sunset_json/sunrise_' + ad_year + '.json';
var sunset_url = 'https://raw.githubusercontent.com/brihat-rb/brihat_calendar/main/data/sunrise_sunset_json/sunset_' + ad_year + '.json';

var sunrise_req = new XMLHttpRequest();
var sunset_req = new XMLHttpRequest();

var sunrises = "";
var sunsets = "";

sunrise_req.open('GET', sunrise_url, false);
sunrise_req.onload = function () {
    sunrises = JSON.parse(this.response);
    sunrise_json = true;
    console.info("Sunrise Times (for", ad_year, "AD): Loaded.");
}
sunrise_req.onerror = function () {
    sunrise_json = false;
    console.error("Lunar Events (for", bs_year, "BS): Loading Failed.");
}
try {
    sunrise_req.send();
}
catch (error) {
    sunrise_json = false;
}

sunset_req.open('GET', sunset_url, false);
sunset_req.onload = function () {
    sunsets = JSON.parse(this.response);
    sunset_json = true;
    console.info("Sunset Times (for", ad_year, "AD): Loaded.");
}
sunset_req.onerror = function () {
    sunset_json = false;
    console.error("Lunar Events (for", bs_year, "BS): Loading Failed.");
}
try {
    sunset_req.send();
}
catch (error) {
    sunset_json = false;
}

if (sunrise_json && sunset_json)
    sunrisesunset_json_loaded = true;

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
    lunar_json_loaded = true;
    console.info("Lunar Events (for", bs_year, "BS): Loaded.");
}
lunar_event_req.onerror = function () {
    lunar_json_loaded = false;
    console.error("Lunar Events (for", bs_year, "BS): Loading Failed.");
}
try {
    lunar_event_req.send();
}
catch (error) {
    lunar_json_loaded = false;
}

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

