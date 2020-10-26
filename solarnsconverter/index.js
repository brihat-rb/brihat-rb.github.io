// DOM Element Selectors
let select_year_nsad = document.getElementById('select_year_ns_to_ad');
let select_month_nsad = document.getElementById('select_month_ns_to_ad');
let select_date_nsad = document.getElementById('select_date_ns_to_ad');

let select_full_date_adns = document.getElementById('ad_date_to_ns');

let select_year_nsbs = document.getElementById('select_year_ns_to_bs');
let select_month_nsbs = document.getElementById('select_month_ns_to_bs');
let select_date_nsbs = document.getElementById('select_date_ns_to_bs');

let select_year_bsns = document.getElementById('select_year_bs_to_ns');
let select_month_bsns = document.getElementById('select_month_bs_to_ns');
let select_date_bsns = document.getElementById('select_date_bs_to_ns');

let nsad_result = document.getElementById('ns_to_ad_result');
let adns_result = document.getElementById('ad_to_ns_result');
let nsbs_result = document.getElementById('ns_to_bs_result');
let bsns_result = document.getElementById('bs_to_ns_result');

// Filling years in NS - AD year dropdown
for (let year = 1100; year < 1150; year++) {
  let option = document.createElement("option");
  select_year_nsad.options.add(option);
  option.text = arabic_number_to_nepali(year);
  option.value = year;
}

// Filling years in NS - BS year dropdown
for (let year = 1100; year < 1150; year++) {
  let option = document.createElement("option");
  select_year_nsbs.options.add(option);
  option.text = arabic_number_to_nepali(year);
  option.value = year;
}

// Filling years in BS - NS year dropdown
for (let year = 2036; year < 2086; year++) {
  let option = document.createElement("option");
  select_year_bsns.options.add(option);
  option.text = arabic_number_to_nepali(year);
  option.value = year;
}

// Filling months in NS - AD, NS - BS, BS - NS month dropdown
for (let month = 0; month < 12; month++) {
  let option1 = document.createElement("option");
  select_month_nsad.options.add(option1);
  option1.text = NS_NEP[month];
  option1.value = month + 1;

  let option2 = document.createElement("option");
  select_month_nsbs.options.add(option2);
  option2.text = NS_NEP[month];
  option2.value = month + 1;

  let option3 = document.createElement("option");
  select_month_bsns.options.add(option3);
  option3.text = BS_MONTHS_NEP[month];
  option3.value = month + 1;
}

function fill_ns_date() {
  // fills exact no of days in NS - AD date dropdown and NS - BS date dropdown
  select_date_nsad.innerHTML = "";
  let year1 = parseInt(document.getElementById("select_year_ns_to_ad").value);
  let month1 = parseInt(document.getElementById("select_month_ns_to_ad").value);

  let max_date1 = NS_DAYS_IN_MONTH[month1 - 1];
  if (is_leap_year(year1 + NS_AD_OFFSET)) {
    max_date1 = NS_DAYS_IN_MONTH_LEAP[month1 - 1];
  }

  for (let date = 1; date <= max_date1; date++) {
    let option1 = document.createElement("option");
    select_date_nsad.options.add(option1);
    option1.text = arabic_number_to_nepali(date);
    option1.value = date;
  }

  // ---------------------------------------------------------------------------
  select_date_nsbs.innerHTML = "";
  let year2 = parseInt(document.getElementById("select_year_ns_to_bs").value);
  let month2 = parseInt(document.getElementById("select_month_ns_to_bs").value);

  let max_date2 = NS_DAYS_IN_MONTH[month2 - 1];
  if (is_leap_year(year2 + NS_AD_OFFSET)) {
    max_date2 = NS_DAYS_IN_MONTH_LEAP[month2 - 1];
  }

  for (let date = 1; date <= max_date2; date++) {
    let option2 = document.createElement("option");
    select_date_nsbs.options.add(option2);
    option2.text = arabic_number_to_nepali(date);
    option2.value = date;
  }
}

function fill_bs_date() {
  // fills exact no of days in BS - NS date dropdown
  select_date_bsns.innerHTML = "";
  let bs_year = parseInt(document.getElementById("select_year_bs_to_ns").value);
  let bs_month = parseInt(document.getElementById("select_month_bs_to_ns").value);

  let max_date = BS_CALENDAR_DATA[bs_year.toString()][bs_month - 1];

  for (let date = 1; date <= max_date; date++) {
    let option = document.createElement("option");
    select_date_bsns.options.add(option);
    option.text = arabic_number_to_nepali(date);
    option.value = date;
  }
}

fill_ns_date();
fill_bs_date();

function ns_to_ad() {
  // converts NS to AD and shows the result below
  let ad_date = convert_ns_to_ad(select_year_nsad.value, select_month_nsad.value, select_date_nsad.value);
  let ad_date_list = ad_date.split(" ");
  let ad_date_day = (new Date(ad_date)).getDay();
  let ad_result = ad_date_list[2] + " " + AD_MONTHS[ad_date_list[1] - 1] + " " + ad_date_list[0] + ", " + ENGLISH_DAYS[ad_date_day];
  nsad_result.innerHTML = ad_result;
}

function ad_to_ns() {
  // converts AD to NS and shows the result below
  let ad_date = select_full_date_adns.value;
  let ad_date_list = ad_date.split("-");
  let ns_date = convert_ad_to_ns(ad_date_list[0], ad_date_list[1], ad_date_list[2]);
  let ns_date_list = ns_date.split(" ");
  let ad_date_day = (new Date(ad_date)).getDay();
  let ns_result = arabic_number_to_nepali(ns_date_list[0]) + " " + NS_NEP[ns_date_list[1] - 1] + " " + arabic_number_to_nepali(ns_date_list[2]) + ", " + NS_DAYS[ad_date_day];
  adns_result.innerHTML = ns_result;
}

function ns_to_bs() {
  // converts NS to BS and shows the result below
  let bs_date = convert_ns_to_bs(select_year_nsbs.value, select_month_nsbs.value, select_date_nsbs.value);
  let bs_date_list = bs_date.split(" ");
  let bs_date_in_ad = convert_ns_to_ad(select_year_nsbs.value, select_month_nsbs.value, select_date_nsbs.value);
  let bs_date_day = NEPALI_DAYS[(new Date(bs_date_in_ad)).getDay()];
  let bs_result = arabic_number_to_nepali(bs_date_list[0]) + " " + BS_MONTHS_NEP[bs_date_list[1] - 1] + " " + arabic_number_to_nepali(bs_date_list[2]) + ", " + bs_date_day;
  nsbs_result.innerHTML = bs_result;
}

function bs_to_ns() {
  // converts BS to NS and shows the result below
  let ns_date = convert_bs_to_ns(select_year_bsns.value, select_month_bsns.value, select_date_bsns.value);
  let ns_date_list = ns_date.split(" ");
  let ns_date_in_ad = convert_ns_to_ad(ns_date_list[0], ns_date_list[1], ns_date_list[2]);
  let ns_date_day = NS_DAYS[(new Date(ns_date_in_ad)).getDay()];
  let ns_result = arabic_number_to_nepali(ns_date_list[0]) + " " + NS_NEP[ns_date_list[1] - 1] + " " + arabic_number_to_nepali(ns_date_list[2]) + ", " + ns_date_day;
  bsns_result.innerHTML = ns_result;
}

// today value
let today = new Date();
let today_year_ad = today.getFullYear();
let today_month_ad = today.getMonth() + 1;
let today_date_ad = today.getDate();

let today_date_ns = convert_ad_to_ns(today_year_ad, today_month_ad, today_date_ad);
let today_date_ns_list = today_date_ns.split(" ");
let today_date_bs = convert_ns_to_bs(today_date_ns_list[0], today_date_ns_list[1], today_date_ns_list[2]);
let today_date_bs_list = today_date_bs.split(" ");

// fills default values (today value)
select_year_nsad.value = today_date_ns_list[0];
select_month_nsad.value = today_date_ns_list[1];
select_date_nsad.value = today_date_ns_list[2];

select_full_date_adns.value = new Date().toISOString().substring(0,10);

select_year_nsbs.value = today_date_ns_list[0];
select_month_nsbs.value = today_date_ns_list[1];
select_date_nsbs.value = today_date_ns_list[2];

select_year_bsns.value = today_date_bs_list[0];
select_month_bsns.value = today_date_bs_list[1];
select_date_bsns.value = today_date_bs_list[2];
