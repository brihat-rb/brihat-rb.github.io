/* * REQUIRES: nepali_calendar_tools.js, AD_BS.js * */

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
