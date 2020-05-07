const BS_CALENDAR_DATA = {
    '1978': [ 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30, 365 ],
    '1979': [ 31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30, 365 ],
    '1980': [ 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31, 366 ],
    '1981': [ 31, 31, 31, 32, 31, 31, 29, 30, 30, 29, 30, 30, 365 ],
    '1982': [ 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30, 365 ],
    '1983': [ 31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30, 365 ],
    '1984': [ 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31, 366 ],
    '1985': [ 31, 31, 31, 32, 31, 31, 29, 30, 30, 29, 30, 30, 365 ],
    '1986': [ 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30, 365 ],
    '1987': [ 31, 32, 31, 32, 31, 30, 30, 29, 30, 29, 30, 30, 365 ],
    '1988': [ 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31, 366 ],
    '1989': [ 31, 31, 31, 32, 31, 31, 30, 29, 30, 29, 30, 30, 365 ],
    '1990': [ 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30, 365 ],
    '1991': [ 31, 32, 31, 32, 31, 30, 30, 29, 30, 29, 30, 30, 365 ],
    '1992': [ 31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31, 366 ],
    '1993': [ 31, 31, 31, 32, 31, 31, 30, 29, 30, 29, 30, 30, 365 ],
    '1994': [ 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30, 365 ],
    '1995': [ 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 30, 365 ],
    '1996': [ 31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31, 366 ],
    '1997': [ 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30, 365 ],
    '1998': [ 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30, 365 ],
    '1999': [ 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31, 366 ],
    '2000': [ 30, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31, 365 ],
    '2001': [ 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30, 365 ],
    '2002': [ 31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30, 365 ],
    '2003': [ 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31, 366 ],
    '2004': [ 30, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31, 365 ],
    '2005': [ 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30, 365 ],
    '2006': [ 31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30, 365 ],
    '2007': [ 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31, 366 ],
    '2008': [ 31, 31, 31, 32, 31, 31, 29, 30, 30, 29, 29, 31, 365 ],
    '2009': [ 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30, 365 ],
    '2010': [ 31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30, 365 ],
    '2011': [ 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31, 366 ],
    '2012': [ 31, 31, 31, 32, 31, 31, 29, 30, 30, 29, 30, 30, 365 ],
    '2013': [ 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30, 365 ],
    '2014': [ 31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30, 365 ],
    '2015': [ 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31, 366 ],
    '2016': [ 31, 31, 31, 32, 31, 31, 29, 30, 30, 29, 30, 30, 365 ],
    '2017': [ 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30, 365 ],
    '2018': [ 31, 32, 31, 32, 31, 30, 30, 29, 30, 29, 30, 30, 365 ],
    '2019': [ 31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31, 366 ],
    '2020': [ 31, 31, 31, 32, 31, 31, 30, 29, 30, 29, 30, 30, 365 ],
    '2021': [ 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30, 365 ],
    '2022': [ 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 30, 365 ],
    '2023': [ 31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31, 366 ],
    '2024': [ 31, 31, 31, 32, 31, 31, 30, 29, 30, 29, 30, 30, 365 ],
    '2025': [ 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30, 365 ],
    '2026': [ 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31, 366 ],
    '2027': [ 30, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31, 365 ],
    '2028': [ 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30, 365 ],
    '2029': [ 31, 31, 32, 31, 32, 30, 30, 29, 30, 29, 30, 30, 365 ],
    '2030': [ 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31, 366 ],
    '2031': [ 30, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31, 365 ],
    '2032': [ 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30, 365 ],
    '2033': [ 31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30, 365 ],
    '2034': [ 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31, 366 ],
    '2035': [ 30, 32, 31, 32, 31, 31, 29, 30, 30, 29, 29, 31, 365 ],
    '2036': [ 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30, 365 ],
    '2037': [ 31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30, 365 ],
    '2038': [ 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31, 366 ],
    '2039': [ 31, 31, 31, 32, 31, 31, 29, 30, 30, 29, 30, 30, 365 ],
    '2040': [ 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30, 365 ],
    '2041': [ 31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30, 365 ],
    '2042': [ 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31, 366 ],
    '2043': [ 31, 31, 31, 32, 31, 31, 29, 30, 30, 29, 30, 30, 365 ],
    '2044': [ 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30, 365 ],
    '2045': [ 31, 32, 31, 32, 31, 30, 30, 29, 30, 29, 30, 30, 365 ],
    '2046': [ 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31, 366 ],
    '2047': [ 31, 31, 31, 32, 31, 31, 30, 29, 30, 29, 30, 30, 365 ],
    '2048': [ 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30, 365 ],
    '2049': [ 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 30, 365 ],
    '2050': [ 31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31, 366 ],
    '2051': [ 31, 31, 31, 32, 31, 31, 30, 29, 30, 29, 30, 30, 365 ],
    '2052': [ 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30, 365 ],
    '2053': [ 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 30, 365 ],
    '2054': [ 31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31, 366 ],
    '2055': [ 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30, 365 ],
    '2056': [ 31, 31, 32, 31, 32, 30, 30, 29, 30, 29, 30, 30, 365 ],
    '2057': [ 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31, 366 ],
    '2058': [ 30, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31, 365 ],
    '2059': [ 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30, 365 ],
    '2060': [ 31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30, 365 ],
    '2061': [ 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31, 366 ],
    '2062': [ 30, 32, 31, 32, 31, 31, 29, 30, 29, 30, 29, 31, 365 ],
    '2063': [ 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30, 365 ],
    '2064': [ 31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30, 365 ],
    '2065': [ 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31, 366 ],
    '2066': [ 31, 31, 31, 32, 31, 31, 29, 30, 30, 29, 29, 31, 365 ],
    '2067': [ 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30, 365 ],
    '2068': [ 31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30, 365 ],
    '2069': [ 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31, 366 ],
    '2070': [ 31, 31, 31, 32, 31, 31, 29, 30, 30, 29, 30, 30, 365 ],
    '2071': [ 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30, 365 ],
    '2072': [ 31, 32, 31, 32, 31, 30, 30, 29, 30, 29, 30, 30, 365 ],
    '2073': [ 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31, 366 ],
    '2074': [ 31, 31, 31, 32, 31, 31, 30, 29, 30, 29, 30, 30, 365 ],
    '2075': [ 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30, 365 ],
    '2076': [ 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 30, 365 ],
    '2077': [ 31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31, 366 ],
    '2078': [ 31, 31, 31, 32, 31, 31, 30, 29, 30, 29, 30, 30, 365 ],
    '2079': [ 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30, 365 ],
    '2080': [ 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 30, 365 ],
    '2081': [ 31, 31, 32, 32, 31, 30, 30, 30, 29, 30, 30, 30, 366 ],
    '2082': [ 30, 32, 31, 32, 31, 30, 30, 30, 29, 30, 30, 30, 365 ],
    '2083': [ 31, 31, 32, 31, 31, 30, 30, 30, 29, 30, 30, 30, 365 ],
    '2084': [ 31, 31, 32, 31, 31, 30, 30, 30, 29, 30, 30, 30, 365 ],
    '2085': [ 31, 32, 31, 32, 30, 31, 30, 30, 29, 30, 30, 30, 366 ],
    '2086': [ 30, 32, 31, 32, 31, 30, 30, 30, 29, 30, 30, 30, 365 ],
    '2087': [ 31, 31, 32, 31, 31, 31, 30, 30, 29, 30, 30, 30, 366 ],
    '2088': [ 30, 31, 32, 32, 30, 31, 30, 30, 29, 30, 30, 30, 365 ],
    '2089': [ 30, 32, 31, 32, 31, 30, 30, 30, 29, 30, 30, 30, 365 ],
    '2090': [ 30, 32, 31, 32, 31, 30, 30, 30, 29, 30, 30, 30, 365 ],
    '2091': [ 31, 31, 32, 31, 31, 31, 30, 30, 29, 30, 30, 30, 366 ],
    '2092': [ 31, 31, 32, 32, 31, 30, 30, 30, 29, 30, 30, 30, 366 ]
}

const LEAP_DAYS_LIST = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
const DAYS_LIST = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

// very important
const BASE_BS_YEAR = 2000
const BASE_BS_MONTH = 1
const BASE_BS_DATE = 1

const BASE_AD_YEAR = 1943
const BASE_AD_MONTH = 4
const BASE_AD_DATE = 14

const BASE_AD_OFFSET = 103

const BS_MONTHS = ["Baisakh", "Jestha", "Ashad", "Shrawan", "Bhadra", "Ashwin", "Kartik", "Mangsir", "Poush", "Magh", "Falgun", "Chaitra"];
const AD_MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];


function is_leap_year(year) {
    // checks whether given AD year is leap year or not
    return (year % 4 == 0 && year % 100 != 0) || year % 400 == 0
}


function verify_bs_date(year, month, date) {
    // verify given nepali date
    max_date = BS_CALENDAR_DATA[year][month-1]
    if (date <= max_date) {
      return true;
    }
    return false;
}


function convert_bs_to_ad(bs_year, bs_month, bs_date) {
    // this function converts BS date to AD
    // input: bs_year, bs_month, bs_date - int
    // returns: tuple (ad_year, ad_month, ad_date)

    is_valid_date = verify_bs_date(bs_year, bs_month, bs_date)
    if (!is_valid_date) {
      alert(bs_year + " " + BS_MONTHS[bs_month - 1] + " doesnot have " + bs_date + " days");
      return
    }


    let total_bs_days = 0
    let year = BASE_BS_YEAR;

    // using num of days in each month
    // for (year = BASE_BS_YEAR; year < bs_year; year++) {
    //    for (let month = 0; month < 12; month++) {
    //        total_bs_days += BS_CALENDAR_DATA[year][month]
    //    }
    // }

    // using num of days in given year (last element of value in BS_CALENDAR_DATA)
    for ( ; year < bs_year; year++) {
        total_bs_days += BS_CALENDAR_DATA[year][12]
    }
    // console.log(total_bs_days)

    for (let month = 0; month < bs_month - 1; month++) {
        total_bs_days += BS_CALENDAR_DATA[year][month]
    }
    // console.log(total_bs_days)

    total_bs_days += bs_date - 1
    // console.log(total_bs_days)

    let res_ad_year = BASE_AD_YEAR
    let res_ad_month = BASE_AD_MONTH
    let res_ad_date = BASE_AD_DATE

    while(total_bs_days > 0) {
        if(is_leap_year(res_ad_year)) {
            if(res_ad_date < LEAP_DAYS_LIST[res_ad_month-1]) {
                res_ad_date += 1
                total_bs_days -= 1
            }
            else {
                res_ad_month += 1
                res_ad_date = 0
                if(res_ad_month > 12) {
                    res_ad_year += 1
                    res_ad_month = 1
                }
            }
        }
        else {
            if(res_ad_date < DAYS_LIST[res_ad_month-1]) {
                res_ad_date += 1
                total_bs_days -= 1
            }
            else {
                res_ad_month += 1
                res_ad_date = 0
                if(res_ad_month > 12) {
                    res_ad_year += 1
                    res_ad_month = 1
                }
            }
        }
    }

    // console.log(total_bs_days)
    return res_ad_date + " " + AD_MONTHS[res_ad_month-1] + " " + res_ad_year;
}

function convert_ad_to_bs(ad_year, ad_month, ad_date) {
    // this function converts AD date to BS
    // input: ad_year, ad_month, ad_date - int
    // returns: tuple (bs_year, bs_month, bs_date)

    let total_ad_days = 0

    for (let year = BASE_AD_YEAR; year < ad_year; year++) {
        if(is_leap_year(year))
            total_ad_days += 366
        else
            total_ad_days += 365
    }
    // console.log(total_ad_days)

    for (let month = 0; month < ad_month - 1; month++) {
        if(is_leap_year(ad_year))
            total_ad_days += LEAP_DAYS_LIST[month]
        else
            total_ad_days += DAYS_LIST[month]
    }
    // console.log(total_ad_days)

    total_ad_days += ad_date - 1
    total_ad_days -= BASE_AD_OFFSET
    // console.log(total_ad_days)

    let res_bs_year = BASE_BS_YEAR
    let res_bs_month = BASE_BS_MONTH
    let res_bs_date = BASE_BS_DATE

    while(total_ad_days > 0) {
        if(res_bs_date < BS_CALENDAR_DATA[res_bs_year][res_bs_month-1]) {
            res_bs_date += 1
            total_ad_days -= 1
        }
        else {
            res_bs_month += 1
            res_bs_date = 0
            if(res_bs_month > 12) {
                res_bs_year += 1
                res_bs_month = 1
            }
        }
    }
    // console.log(total_ad_days)

    return res_bs_year + " " + BS_MONTHS[res_bs_month - 1] + " " + res_bs_date;
}

for(let year = 1978; year <= 2092; year++) {
    let select = document.getElementById("select_year");
    let option = document.createElement("option");
    select.options.add(option);
    option.text = year;
    option.value = year;
}

for(let month = 1; month <= 12; month++) {
    let select = document.getElementById("select_month");
    let option = document.createElement("option");
    select.options.add(option);
    option.text = BS_MONTHS[month-1];
    option.value = month;
}

for(let date = 1; date <= 32; date++) {
    let select = document.getElementById("select_date");
    let option = document.createElement("option");
    select.options.add(option);
    option.text = date;
    option.value = date;
}

function to_bs() {
    // shows converted BS date
    ad_date_list = document.getElementById("ad_date").value.split("-");
    result = convert_ad_to_bs(ad_date_list[0], ad_date_list[1], ad_date_list[2]);
    document.getElementById("bs_result").innerHTML = result;
}

function to_ad() {
    // shows converted AD date
    bs_year = document.getElementById("select_year").value;
    bs_month = document.getElementById("select_month").value;
    bs_date = document.getElementById("select_date").value;
    result = convert_bs_to_ad(bs_year, bs_month, bs_date);
    document.getElementById("ad_result").innerHTML = result;
}

function get_bs_month(month) {
    // return number equiv of BS month i.e. Baisakh = 1
    return BS_MONTHS.indexOf(month) + 1;
}

function get_bs_date_from_date_object(date) {
    // convert date object to BS date string
    return convert_ad_to_bs(date.getFullYear(), date.getMonth() + 1, date.getDate());
}

// default settings on page load
bs_today = get_bs_date_from_date_object(new Date()).split(" ");
document.getElementById("select_year").value = bs_today[0];
document.getElementById("select_month").value = get_bs_month(bs_today[1]);
document.getElementById("select_date").value = bs_today[2];

document.getElementById("ad_date").value = new Date().toISOString().substring(0,10);
