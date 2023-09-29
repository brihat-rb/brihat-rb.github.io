document.onkeydown = trigger_key_press;

// taken from: https://stackoverflow.com/a/9310900
function trigger_key_press(e) {
    e = e || window.event;
    if (e.keyCode == '37') {
        // console.log("LEFT");
        e.preventDefault();
        previous_day(current_year, current_month, current_date);
    }
    else if (e.keyCode == '38') {
        // console.log("UP");
        e.preventDefault();
        previous_month(current_year, current_month, current_date);
    }
    else if (e.keyCode == '39') {
        // console.log("RIGHT");
        e.preventDefault();
        next_day(current_year, current_month, current_date);
    }
    else if (e.keyCode == '40') {
        // console.log("DOWN");
        e.preventDefault();
        next_month(current_year, current_month, current_date);
    }
    else if (e.keyCode == '33') {
        // console.log("PgUP");
        e.preventDefault();
        previous_year(current_year, current_month, current_date);
    }
    else if (e.keyCode == '34') {
        // console.log("PgDN");
        e.preventDefault();
        next_year(current_year, current_month, current_date);
    }
    else if (e.keyCode == '13') {
        // console.log("ENTER");
        e.preventDefault();
        get_event(bs_year, bs_month, bs_date);
    }
    else {
        // some other key
        console.log(e.keyCode);
    }
}
