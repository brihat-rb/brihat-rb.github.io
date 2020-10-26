/* * REQUIRES: nepali_calendar_tools.js * */

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

// default settings on page load
document.getElementById("1").checked = true;
date_calculator_cal_choice("1");
document.getElementById("operation").value = "minus";
