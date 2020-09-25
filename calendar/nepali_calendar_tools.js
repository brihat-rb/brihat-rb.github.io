const BS_CALENDAR_DATA = {
    '1975': [ 31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30, 365 ],
    '1976': [ 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31, 366 ],
    '1977': [ 30, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31, 365 ],
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
    '2092': [ 31, 31, 32, 32, 31, 30, 30, 30, 29, 30, 30, 30, 366 ],
    '2093': [ 30, 32, 31, 32, 31, 30, 30, 30, 29, 30, 30, 30, 365 ],
    '2094': [ 31, 31, 32, 31, 31, 30, 30, 30, 29, 30, 30, 30, 365 ],
    '2095': [ 31, 31, 32, 31, 31, 31, 30, 29, 30, 30, 30, 30, 366 ],
    '2096': [ 31, 32, 31, 32, 31, 30, 30, 29, 30, 29, 30, 30, 365 ],
    '2097': [ 31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 30, 30, 366 ],
    '2098': [ 31, 31, 32, 31, 31, 31, 29, 30, 29, 30, 29, 31, 365 ],
    '2099': [ 31, 31, 32, 31, 31, 31, 30, 29, 29, 30, 30, 30, 365 ],
    '2100': [ 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31, 366 ]
}

const LEAP_DAYS_LIST = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
const DAYS_LIST = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

// very important
const BASE_BS_YEAR = 1975
const BASE_BS_MONTH = 1
const BASE_BS_DATE = 1

const BASE_AD_YEAR = 1918
const BASE_AD_MONTH = 4
const BASE_AD_DATE = 13

const BASE_AD_OFFSET = 102

const BS_MONTHS = ["Baisakh", "Jestha", "Ashad", "Shrawan", "Bhadra", "Ashwin", "Kartik", "Mangsir", "Poush", "Magh", "Falgun", "Chaitra"];
const AD_MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const ENGLISH_DAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

const BS_MONTHS_NEP = ["वैशाख", "ज्येष्ठ", "आषाढ", "श्रावण", "भाद्र", "आश्विन", "कार्तिक", "मंसिर", "पौष", "माघ", "फाल्गुण", "चैत्र"];
const NEPALI_DIGITS = ['०','१','२','३','४','५','६','७','८','९'];
const NEPALI_DAYS = ["आइतबार", "सोमबार", "मंगलबार", "बुधबार", "बिहिबार", "शुक्रबार", "शनिबार"];


function is_leap_year(year) {
    // checks whether given AD year is leap year or not
    return (year % 4 == 0 && year % 100 != 0) || year % 400 == 0
}


function verify_bs_date(year, month, date) {
    // verify given nepali date
    try {
      max_date = BS_CALENDAR_DATA[year][month-1];
    }
    catch(err) {
      return false;
    }
    if (date <= max_date) {
      return true;
    }
    return false;
}


function convert_bs_to_ad(bs_year, bs_month, bs_date, message) {
    // this function converts BS date to AD
    // input: bs_year, bs_month, bs_date - int
    // returns: tuple (ad_year, ad_month, ad_date)

    is_valid_date = verify_bs_date(bs_year, bs_month, bs_date)
    if (!is_valid_date) {
      if (message == "") {
        alert(arabic_number_to_nepali(bs_year) + " " + BS_MONTHS_NEP[bs_month - 1] + " मा " + arabic_number_to_nepali(bs_date) + " दिन छैन");
      }
      else {
        alert("BS Range Invalid. Valid Range: [1975 - 2100]");
      }
      return;
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

function ad_string_from_date(date) {
    // return ad date string in form of 'date month(str) year'
    let date_string = date.toLocaleDateString().split("/");
    return date_string[1] + " " + AD_MONTHS[date_string[0]-1] + " " + date_string[2];
}

function convert_ad_to_bs(ad_year, ad_month, ad_date) {
    // this function converts AD date to BS
    // input: ad_year, ad_month, ad_date - int
    // returns: tuple (bs_year, bs_month, bs_date)

	if (ad_year < BASE_AD_YEAR || ad_year == BASE_AD_YEAR && ad_month < BASE_AD_MONTH || ad_year == BASE_AD_YEAR && ad_month == BASE_AD_MONTH && ad_date < BASE_AD_DATE) {
		alert("Supported date range " + BASE_AD_YEAR + "-" + BASE_AD_MONTH + "-" + BASE_AD_DATE + " to 2044-4-15");
		return;
	}

	if (ad_year > 2044 || ad_year == 2044 && ad_month > 4 || ad_year == 2044 && ad_month == 4 && ad_date > 15) {
    alert("Supported date range " + BASE_AD_YEAR + "-" + BASE_AD_MONTH + "-" + BASE_AD_DATE + " to 2044-4-15");
		return;
	}

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

let select_list_ids = ["_", "_birthdate_", "_asof_", "_event_", "_date_calc_"];

for(let elem = 0; elem < select_list_ids.length; elem++) {
  for(let year = 1975; year <= 2100; year++) {
      if (select_list_ids[elem] == "_event_") {
          if (year < 2070 || year > 2077) {
              continue;
          }
      }
      let select = document.getElementById("select" + select_list_ids[elem] + "year");
      let option = document.createElement("option");
      select.options.add(option);
      option.text = arabic_number_to_nepali(year);
      option.value = year;
  }

  for(let month = 1; month <= 12; month++) {
      let select = document.getElementById("select" + select_list_ids[elem] + "month");
      let option = document.createElement("option");
      select.options.add(option);
      option.text = BS_MONTHS_NEP[month-1];
      option.value = month;
  }

  for(let date = 1; date <= 32; date++) {
      let select = document.getElementById("select" + select_list_ids[elem] + "date");
      let option = document.createElement("option");
      select.options.add(option);
      option.text = arabic_number_to_nepali(date);
      option.value = date;
  }
}

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

function date_diff() {
    // computes date difference between two AD dates and displays in
    // years months days
    if (!document.getElementById("date2").value) {
      document.getElementById('date2').value = new Date().toISOString().substr(0,10);
    }
    let date1 = new Date(document.getElementById("date1").value);
    let date2 = new Date(document.getElementById("date2").value);

    if (date1 > date2) {
        let swap = date1;
        date1 = date2;
        date2 = swap;
    }
    let date1_year = date1.getFullYear();
    let february = (date1_year % 4 === 0 && date1_year % 100 !== 0) || date1_year % 400 === 0 ? 29 : 28;
    let days_list = [31, february, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    let no_of_years = date2.getFullYear() - date1_year;

    let no_of_months = date2.getMonth() - date1.getMonth();
    if (no_of_months < 0) {
        no_of_years--;
        no_of_months += 12;
    }

    let no_of_days = date2.getDate() - date1.getDate();
    if (no_of_days < 0) {
        if (no_of_months > 0) {
            no_of_months--;
        }
        else {
            no_of_years--;
            no_of_months = 11;
        }
        no_of_days += days_list[date1.getMonth()];
    }

    let answer = '<span class="age_num">' + no_of_years + '</span> years';
    answer += '&emsp;<span class="age_num">' + no_of_months + '</span> months';
    answer += '&emsp;<span class="age_num">' + no_of_days + '</span> days';
    document.getElementById("age_result").innerHTML = answer;
}

function date_diff_bs() {
    // helper function, calls date_diff()
    let birthdate_year = document.getElementById("select_birthdate_year").value;
    let birthdate_month = document.getElementById("select_birthdate_month").value;
    let birthdate_date = document.getElementById("select_birthdate_date").value;
    let asofdate_year = document.getElementById("select_asof_year").value;
    let asofdate_month = document.getElementById("select_asof_month").value;
    let asofdate_date = document.getElementById("select_asof_date").value;

    let ad_date_string = get_ad_date_string(convert_bs_to_ad(birthdate_year, birthdate_month, birthdate_date, ""));
    document.getElementById("date1").value = ad_date_string;

    ad_date_string = get_ad_date_string(convert_bs_to_ad(asofdate_year, asofdate_month, asofdate_date, ""));
    document.getElementById("date2").value = ad_date_string;

    date_diff();
}

function date_diff_ad() {
    // helper function, calls date_diff()
    if (!document.getElementById("date1").value) {
      alert("Invalid Birthdate");
      return;
    }

    let birthdate_ad = document.getElementById("date1").value;
    let asofdate_ad = document.getElementById("date2").value;

    let birthdate_ad_list = birthdate_ad.split("-");
    let birthdate_bs_list = convert_ad_to_bs(birthdate_ad_list[0], birthdate_ad_list[1], birthdate_ad_list[2]).split(" ");
    document.getElementById("select_birthdate_year").value = birthdate_bs_list[0];
    document.getElementById("select_birthdate_month").value = get_bs_month(birthdate_bs_list[1]);
    document.getElementById("select_birthdate_date").value = birthdate_bs_list[2];

    let asofdate_ad_list = asofdate_ad.split("-");
    let asofdate_bs_list = convert_ad_to_bs(asofdate_ad_list[0], asofdate_ad_list[1], asofdate_ad_list[2]).split(" ");
    document.getElementById("select_asof_year").value = asofdate_bs_list[0];
    document.getElementById("select_asof_month").value = get_bs_month(asofdate_bs_list[1]);
    document.getElementById("select_asof_date").value = asofdate_bs_list[2];

    date_diff();
}

function get_nepali_day_from_bs_date(bs_year, bs_month, bs_date) {
    // returns nepali day in nepali font from given nepali date
    let ad_date_string = convert_bs_to_ad(bs_year, bs_month, bs_date, "another message");
    let ad_date_list = ad_date_string.split(" ");
    let ad_date = new Date(ad_date_list[2] + "-" + (AD_MONTHS.indexOf(ad_date_list[1]) + 1) + "-" + ad_date_list[0]);
    return NEPALI_DAYS[ad_date.getDay()];
}

function date_calc() {
    // date add / subtract from ad/bs utility function 24 sep 2020
    let n_years = parseInt(document.getElementById("n_years").value);
    let n_months = parseInt(document.getElementById("n_months").value);
    let n_days = parseInt(document.getElementById("n_days").value);

    if (n_years == "" || isNaN(n_years)) {
      n_years = 0;
    }

    if (n_months == "" || isNaN(n_months)) {
      n_months = 0;
    }

    if (n_days == "" || isNaN(n_days)) {
      n_days = 0;
    }

    let operation = document.getElementById("operation").value;
    let result = document.getElementById("date_calc_result");
    let choice = 0;

    let calc_cal = document.getElementsByName("cal");
    for (let i = 0; i < calc_cal.length; i++) {
        if (calc_cal[i].checked) {
            choice = calc_cal[i].id;
        }
    }

    if (choice == 1) {  // Date Calculator for AD
      if(document.getElementById("calc_ad_date").value == "") {
          result.innerHTML = "AD Date Empty";
          return;
      }
      let date = new Date(document.getElementById("calc_ad_date").value);
      if (operation == "minus") { // Back Date Case
          let new_date = date.setDate(date.getDate() - n_days);
          new_date = date.setMonth(date.getMonth() - n_months);
          new_date = date.setFullYear(date.getFullYear() - n_years);
          new_date = new Date(new_date);
          result.innerHTML = new_date.getDate() + " " + AD_MONTHS[new_date.getMonth()] + " " + new_date.getFullYear() + " " + ENGLISH_DAYS[new_date.getDay()];
      }

      if (operation == "plus") { // Future Date Case
          new_date = date.setDate(date.getDate() + n_days);
          new_date = date.setMonth(date.getMonth() + n_months);
          new_date = date.setFullYear(date.getFullYear() + n_years);
          new_date = new Date(new_date);
          result.innerHTML = new_date.getDate() + " " + AD_MONTHS[new_date.getMonth()] + " " + new_date.getFullYear() + " " + ENGLISH_DAYS[new_date.getDay()];
      }
    }

    if (choice == 2) { // Date calculator for BS
        let old_years = parseInt(document.getElementById("select_date_calc_year").value);
        let old_months = parseInt(document.getElementById("select_date_calc_month").value);
        let old_days = parseInt(document.getElementById("select_date_calc_date").value);

        let new_years = 0;
        let new_months = 0;
        let new_days = 0;

        if (operation == "minus") { // Back Date Case
            if (old_years == 1975 && old_months == 1 && old_days == 1) {
              result.innerHTML = "Starting BS Date, cannot subtract further";
              return;
            }

            new_years = old_years - n_years;
            new_months = old_months - n_months;
            new_days = old_days - n_days; //+1 for today

            if (new_months < 1) {
                new_months += 12;
                new_years -= 1;
            }

            if (new_days < 1) {
                if (new_years < 1975) {
                    result.innerHTML = "Result out of range [1975 - 2100]";
                    return
                }
                else {
                    if (new_months == 1) {
                        try {
                          new_days += BS_CALENDAR_DATA[new_years-1][11];
                        }
                        catch(err) {
                          console.log("Error", err.message);
                        }
                        new_months = 12;
                        new_years -= 1;
                    }
                    else {
                        new_days += BS_CALENDAR_DATA[new_years][new_months-2];
                        new_months -= 1;
                    }
                }
            }
        }
        else if (operation == "plus") { // Future Date Case
            new_years = parseInt(old_years) + n_years;
            new_months = parseInt(old_months) + n_months;
            new_days = parseInt(old_days) + n_days; // +1 for today

            if (new_years > 2100) {
                result.innerHTML = "Result out of range [1975 - 2100]";
                return;
            }

            if (new_months > 12) {
                new_months -= 12;
                new_years += 1;
            }

            if (new_days > BS_CALENDAR_DATA[new_years][new_months-1]) {
                if (new_years > 2100) {
                    result.innerHTML = "Result out of range [1975 - 2100]";
                    return;
                }
                else {
                    new_days -= BS_CALENDAR_DATA[new_years][new_months-1];
                    new_months += 1;
                }
            }

            if (new_months > 12) {
                new_months = 1;
                new_years += 1;
            }
        }

        let nepali_day = get_nepali_day_from_bs_date(new_years, new_months, new_days);

        // alternate way without using above function
        // let nepali_day = NEPALI_DAYS[new Date(convert_bs_to_ad(new_years, new_months, new_days, "")).getDay()];

        result.innerHTML = arabic_number_to_nepali(new_years) + " " + BS_MONTHS_NEP[new_months - 1] + " " + arabic_number_to_nepali(new_days) + " " + nepali_day;
    }
}

function date_calculator_cal_choice(id) {
  if (id == 1) {
    document.getElementById("date_calc_ad").style.display = "flex";
    document.getElementById("date_calc_bs").style.display = "none";
  }

  if (id == 2) {
    document.getElementById("date_calc_bs").style.display = "flex";
    document.getElementById("date_calc_ad").style.display = "none";
  }
}

function arabic_number_to_nepali(number){
    number = number.toString();
    let nepali_number = "";
    for(let i = 0; i < number.length; i++) {
        nepali_number += NEPALI_DIGITS[parseInt(number.charAt(i))];
    }
    return nepali_number;
}

// default settings on page load
let bs_today = get_bs_date_from_date_object(new Date()).split(" ");
document.getElementById("select_year").value = bs_today[0];
document.getElementById("select_month").value = get_bs_month(bs_today[1]);
document.getElementById("select_date").value = bs_today[2];

document.getElementById("select_asof_year").value = bs_today[0];
document.getElementById("select_asof_month").value = get_bs_month(bs_today[1]);
document.getElementById("select_asof_date").value = bs_today[2];

document.getElementById("ad_date").value = new Date().toISOString().substring(0,10);
document.getElementById('date2').value = new Date().toISOString().substr(0,10);

document.getElementById("select_event_year").value = bs_today[0];
document.getElementById("select_event_month").value = get_bs_month(bs_today[1]);
document.getElementById("select_event_date").value = bs_today[2];

document.getElementById("1").checked = true;
date_calculator_cal_choice("1");
document.getElementById("operation").value = "minus";
