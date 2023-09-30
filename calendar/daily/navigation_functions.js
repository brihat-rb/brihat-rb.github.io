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

