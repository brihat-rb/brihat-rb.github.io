import argparse
import sys

BS_MONTHS = ["Baisakh", "Jestha", "Ashad", "Shrawan", "Bhadra", "Ashwin",
             "Kartik", "Mangsir", "Poush", "Magh", "Falgun", "Chaitra"]
AD_MONTHS = ["January", "February", "March", "April", "May", "June", "July",
             "August", "September", "October", "November", "December"]

# very important
BASE_NS_YEAR = 1
BASE_NS_MONTH = 1
BASE_NS_DATE = 1
BASE_AD_YEAR = 880
BASE_AD_MONTH = 10
BASE_AD_DATE = 20

BASE_AD_OFFSET = 293
NS_AD_OFFSET = 880

LEAP_DAYS_LIST = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
DAYS_LIST = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]

AD_MONTHS = ["January", "February", "March", "April", "May", "June", "July",
             "August", "September", "October", "November", "December"]
AD_MONTHS_SHORT = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug",
                   "Sep", "Oct", "Nov", "Dec"]

NEPALI_DIGITS = ['०', '१', '२', '३', '४', '५', '६', '७', '८', '९']

NEPALI_DAYS = ["आइतबार", "सोमबार", "मंगलबार", "बुधबार", "बिहिबार",
               "शुक्रबार", "शनिबार"]

ENGLISH_DAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday",
                "Friday", "Saturday"]
ENGLISH_DAYS_SHORT = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

NS_DAYS_IN_MONTH = [30, 30, 30, 30, 30, 29, 31, 31, 31, 31, 31, 31]
NS_DAYS_IN_MONTH_LEAP = [30, 30, 30, 30, 30, 30, 31, 31, 31, 31, 31, 31]

NS_NEP = ["कछला", "थिंला", "प्वँहेला", "सिल्ला", "चिल्ला", "चौला", "बछला",
          "तछला", "दिल्ला", "गुंला", "यंला", "कौला"]


def is_leap_year(year):
    ''' checks whether given AD year is leap year or not '''
    return (year % 4 == 0 and year % 100 != 0) or year % 400 == 0


def is_valid_ns_date(year, month, date):
    ''' verify given NS date '''
    if is_leap_year(year + NS_AD_OFFSET):
        max_date = NS_DAYS_IN_MONTH_LEAP[month-1]
    else:
        max_date = NS_DAYS_IN_MONTH[month-1]

    if (date <= max_date):
        return True
    return False


def is_valid_ad_date(year, month, date):
    ''' checks validity of AD Date '''
    if (year < BASE_AD_YEAR
            or (year == BASE_AD_YEAR and month < BASE_AD_MONTH)
            or (year == BASE_AD_YEAR
                and month == BASE_AD_MONTH
                and date < BASE_AD_DATE)):
        print("Supported date range " + str(BASE_AD_YEAR) + "-"
              + str(BASE_AD_MONTH) + "-" + str(BASE_AD_DATE) + " to 2044-4-15")
        return False

    if (year > 2044
            or (year == 2044 and month > 4)
            or (year == 2044 and month == 4 and date > 15)):
        print("Supported date range " + str(BASE_AD_YEAR) + "-"
              + str(BASE_AD_MONTH) + "-" + str(BASE_AD_DATE) + " to 2044-4-15")
        return False

    if month not in range(1, 13):
        print("Invalid Month")
        return False

    date_range = LEAP_DAYS_LIST[month-1] + 1 if is_leap_year(year) \
        else DAYS_LIST[month-1] + 1
    if date not in range(1, date_range):
        print(str(year) + " " + AD_MONTHS[month-1]
              + " does not have date " + str(date))
        return False

    return True


def convert_ns_to_ad(ns_year, ns_month, ns_date):
    ''' this function converts NS date to AD
        input: ns_year, ns_month, ns_date - int
        returns: STRING: ad_year ad_month ad_date '''

    is_valid_date = is_valid_ns_date(ns_year, ns_month, ns_date)
    if not is_valid_date:
        print("सौ. ने. सं. " + str(ns_year) + " " + NS_NEP[ns_month - 1]
              + " मा " + str(ns_date) + " दिन छैन")
        return

    total_ns_days = 0

    for year in range(BASE_NS_YEAR, ns_year):
        if is_leap_year(year + NS_AD_OFFSET):
            total_ns_days += 366
        else:
            total_ns_days += 365

    for month in range(0, ns_month - 1):
        if is_leap_year(ns_year + NS_AD_OFFSET):
            total_ns_days += NS_DAYS_IN_MONTH_LEAP[month]
        else:
            total_ns_days += NS_DAYS_IN_MONTH[month]

    total_ns_days += ns_date - 1

    res_ad_year = BASE_AD_YEAR
    res_ad_month = BASE_AD_MONTH
    res_ad_date = BASE_AD_DATE

    while(total_ns_days > 0):
        if is_leap_year(res_ad_year):
            if(res_ad_date < LEAP_DAYS_LIST[res_ad_month-1]):
                res_ad_date += 1
                total_ns_days -= 1
            else:
                res_ad_month += 1
                res_ad_date = 0
                if (res_ad_month > 12):
                    res_ad_year += 1
                    res_ad_month = 1
        else:
            if(res_ad_date < DAYS_LIST[res_ad_month-1]):
                res_ad_date += 1
                total_ns_days -= 1
            else:
                res_ad_month += 1
                res_ad_date = 0
                if(res_ad_month > 12):
                    res_ad_year += 1
                    res_ad_month = 1

    return (res_ad_year, res_ad_month, res_ad_date)


def convert_ad_to_ns(ad_year, ad_month, ad_date):
    ''' this function converts AD date to NS
        input: ad_year, ad_month, ad_date - int
        returns: STEING: ns_year ns_month ns_date '''

    if (ad_year < BASE_AD_YEAR
            or (ad_year == BASE_AD_YEAR and ad_month < BASE_AD_MONTH)
            or (ad_year == BASE_AD_YEAR
                and ad_month == BASE_AD_MONTH
                and ad_date < BASE_AD_DATE)):
        print("Supported date range " + BASE_AD_YEAR + "-" + BASE_AD_MONTH
              + "-" + BASE_AD_DATE + " to 2044-4-15")
        return

    if (ad_year > 2044 or (ad_year == 2044 and ad_month > 4)
            or (ad_year == 2044 and ad_month == 4 and ad_date > 15)):
        print("Supported date range " + BASE_AD_YEAR + "-" + BASE_AD_MONTH
              + "-" + BASE_AD_DATE + " to 2044-4-15")
        return

    total_ad_days = 0

    for year in range(BASE_AD_YEAR, ad_year):
        if is_leap_year(year):
            total_ad_days += 366
        else:
            total_ad_days += 365

    for month in range(0, ad_month - 1):
        if is_leap_year(ad_year):
            total_ad_days += LEAP_DAYS_LIST[month]
        else:
            total_ad_days += DAYS_LIST[month]

    total_ad_days += ad_date - 1
    total_ad_days -= BASE_AD_OFFSET

    res_ns_year = BASE_NS_YEAR
    res_ns_month = BASE_NS_MONTH
    res_ns_date = BASE_NS_DATE

    while(total_ad_days > 0):
        if is_leap_year(res_ns_year + NS_AD_OFFSET):
            if(res_ns_date < NS_DAYS_IN_MONTH_LEAP[res_ns_month-1]):
                res_ns_date += 1
                total_ad_days -= 1
            else:
                res_ns_month += 1
                res_ns_date = 0
                if(res_ns_month > 12):
                    res_ns_year += 1
                    res_ns_month = 1
        else:
            if(res_ns_date < NS_DAYS_IN_MONTH[res_ns_month-1]):
                res_ns_date += 1
                total_ad_days -= 1
            else:
                res_ns_month += 1
                res_ns_date = 0
                if(res_ns_month > 12):
                    res_ns_year += 1
                    res_ns_month = 1

    return (res_ns_year, res_ns_month, res_ns_date)


def print_help():
    ''' show usage help '''
    print("usage: ns_ad_converter.py [type] [year] [month] [date]")
    print("")
    print("valid type [type]: to_ns | to_ad")
    print(("valid range [year] [month] [date]: FROM 880 10 20 to ... (to_ns),"
           " 1 1 1 to ... (to_ad)"))
    print("")


def main():
    # print("func to call: ", sys.argv[1])
    func = sys.argv[1]
    year = int(sys.argv[2])
    month = int(sys.argv[3])
    date = int(sys.argv[4])

    if(func == "to_ad"):
        if is_valid_ns_date(year, month, date):
            print("converting NS to AD")
            print(convert_ns_to_ad(year, month, date))
    elif(func == "to_ns"):
        if is_valid_ad_date(year, month, date):
            print("converting AD to NS")
            print(convert_ad_to_ns(year, month, date))
    else:
        print("Unknown Type\n")
        print_help()
        return
    print("DONE")


if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    if len(sys.argv) != 5:
        print_help()
        sys.exit(1)
    main()
