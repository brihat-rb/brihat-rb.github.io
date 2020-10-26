/* * main file here: https://brihat-rb.github.io/solarnscalendar/NS_BS.js * */

// very important
const BASE_NS_YEAR_FOR_BS = 1039;
const BASE_NS_MONTH_FOR_BS = 1;
const BASE_NS_DATE_FOR_BS = 1;

const BASE_BS_YEAR_FOR_NS = 1975;
const BASE_BS_MONTH_FOR_NS = 7;
const BASE_BS_DATE_FOR_NS = 4;

const BASE_BS_OFFSET = 190;

/* * HELPER Functions * */
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

/* * CONVERTER FUNCITONS * */
function convert_bs_to_ns(bs_year, bs_month, bs_date) {
    // this function converts BS date to NS
    // input: bs_year, bs_month, bs_date - int
    // returns: STRING ns_year ns_month ns_date

    is_valid_date = verify_bs_date(bs_year, bs_month, bs_date)
    if (!is_valid_date) {
        alert("वि. सं. " + arabic_number_to_nepali(bs_year) + " " + BS_MONTHS_NEP[bs_month - 1] + " मा " + arabic_number_to_nepali(bs_date) + " दिन छैन");
      return;
    }

    let total_bs_days = 0
    let year = BASE_BS_YEAR_FOR_NS;

    // using num of days in each month
    // for (year = BASE_BS_YEAR_FOR_NS; year < bs_year; year++) {
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
    total_bs_days -= BASE_BS_OFFSET
    // console.log(total_bs_days)

    let res_ns_year = BASE_NS_YEAR_FOR_BS
    let res_ns_month = BASE_NS_MONTH_FOR_BS
    let res_ns_date = BASE_NS_DATE_FOR_BS

    while(total_bs_days > 0) {
        if(is_leap_year(res_ns_year + NS_AD_OFFSET)) {
            if(res_ns_date < NS_DAYS_IN_MONTH_LEAP[res_ns_month-1]) {
                res_ns_date += 1
                total_bs_days -= 1
            }
            else {
                res_ns_month += 1
                res_ns_date = 0
                if(res_ns_month > 12) {
                    res_ns_year += 1
                    res_ns_month = 1
                }
            }
        }
        else {
            if(res_ns_date < NS_DAYS_IN_MONTH[res_ns_month-1]) {
                res_ns_date += 1
                total_bs_days -= 1
            }
            else {
                res_ns_month += 1
                res_ns_date = 0
                if(res_ns_month > 12) {
                    res_ns_year += 1
                    res_ns_month = 1
                }
            }
        }
    }

    // console.log(total_bs_days)
    return res_ns_year + " " + res_ns_month + " " + res_ns_date;
}

function convert_ns_to_bs(ns_year, ns_month, ns_date) {
    // this function converts NS date to BS
    // input: ns_year, ns_month, ns_date - int
    // returns: STRING: bs_year, bs_month, bs_date

  	if (ns_year < BASE_NS_YEAR_FOR_BS || ns_year == BASE_NS_YEAR_FOR_BS && ns_month < BASE_NS_MONTH_FOR_BS || ns_year == BASE_NS_YEAR_FOR_BS && ns_month == BASE_NS_MONTH_FOR_BS && ns_date < BASE_NS_DATE_FOR_BS) {
  		alert("Supported date range: Solar NS " + BASE_NS_YEAR_FOR_BS + "-" + BASE_NS_MONTH_FOR_BS + "-" + BASE_NS_DATE_FOR_BS + " to Solar NS 1164-6-29");
  		return;
  	}

  	if (ns_year > 1164 || ns_year == 1164 && ns_month > 6 || ns_year == 1164 && ns_month == 6 && ns_date > 29) {
      alert("Supported date range: Solar NS " + BASE_NS_YEAR_FOR_BS + "-" + BASE_NS_MONTH_FOR_BS + "-" + BASE_NS_DATE_FOR_BS + " to Solar NS 1164-6-29");
  		return;
  	}


    let is_valid_date = verify_ns_date(ns_year, ns_month, ns_date);
    if (!is_valid_date) {
        alert(" सौ. ने. सं. " + arabic_number_to_nepali(ns_year) + " " + NS_NEP[ns_month - 1] + " मा " + arabic_number_to_nepali(ns_date) + " दिन छैन");
        return;
    }

    let total_ns_days = 0

    for (let year = BASE_NS_YEAR_FOR_BS; year < ns_year; year++) {
        if(is_leap_year(year + NS_AD_OFFSET))
            total_ns_days += 366
        else
            total_ns_days += 365
    }
    // console.log(total_ns_days)

    for (let month = 0; month < ns_month - 1; month++) {
        if(is_leap_year(ns_year))
            total_ns_days += NS_DAYS_IN_MONTH_LEAP[month]
        else
            total_ns_days += NS_DAYS_IN_MONTH[month]
    }
    // console.log(total_ns_days)

    total_ns_days += ns_date - 1
    // console.log(total_ns_days)

    let res_bs_year = BASE_BS_YEAR_FOR_NS
    let res_bs_month = BASE_BS_MONTH_FOR_NS
    let res_bs_date = BASE_BS_DATE_FOR_NS

    while(total_ns_days > 0) {
        if(res_bs_date < BS_CALENDAR_DATA[res_bs_year][res_bs_month-1]) {
            res_bs_date += 1
            total_ns_days -= 1
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
    // console.log(total_ns_days)

    return res_bs_year + " " + res_bs_month + " " + res_bs_date;
}
