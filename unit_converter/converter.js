var array_temperature = ['kelvin', 'celsius', 'fahrenheit'];
var array_length = ['inch', 'foot', 'yard', 'mile', 'centimeter', 'meter', 'kilometer'];
var array_area = ['square_inch', 'square_foot', 'anna', 'square_centimeter', 'square_meter'];
var array_weight = ['ounce', 'pound', 'gram', 'kilogram'];
var array_volume = ['cubic_foot', 'litre', 'cubic_meter'];
var array_plane_angle = ['degree', 'radian', 'gradian'];
var array_other = ['height_inch', 'water_litre'];

var PI = 3.14159265;

conversion_func_dict = {
  'none': {
    'none': "func_same",
  },

  'kelvin': {
    'kelvin': "func_same",
    'celsius': "func_temp_k2c",
    'fahrenheit': "func_temp_k2f",
  },
  'celsius': {
    'kelvin': "func_temp_c2k",
    'celsius': "func_same",
    'fahrenheit': "func_temp_c2f",
  },
  'fahrenheit': {
    'kelvin': "func_temp_f2k",
    'celsius': "func_temp_f2c",
    'fahrenheit': "func_same",
  },

  'inch': {
    'inch': "func_same",
    'foot': "func_length_i2f",
    'yard': "func_length_i2y",
    'mile': "func_length_i2mi",
    'centimeter': "func_length_i2c",
    'meter': "func_length_i2me",
    'kilometer': "func_length_i2k",
  },
  'foot': {
    'inch': "func_length_f2i",
    'foot': "func_same",
    'yard': "func_length_f2y",
    'mile': "func_length_f2mi",
    'centimeter': "func_length_f2c",
    'meter': "func_length_f2me",
    'kilometer': "func_length_f2k",
  },
  'yard': {
    'inch': "func_length_y2i",
    'foot': "func_length_y2f",
    'yard': "func_same",
    'mile': "func_length_y2mi",
    'centimeter': "func_length_y2c",
    'meter': "func_length_y2me",
    'kilometer': "func_length_y2k",
  },
  'mile': {
    'inch': "func_length_mi2i",
    'foot': "func_length_mi2f",
    'yard': "func_length_mi2y",
    'mile': "func_same",
    'centimeter': "func_length_mi2c",
    'meter': "func_length_mi2me",
    'kilometer': "func_length_mi2k",
  },
  'centimeter': {
    'inch': "func_length_c2i",
    'foot': "func_length_c2f",
    'yard': "func_length_c2y",
    'mile': "func_length_c2mi",
    'centimeter': "func_same",
    'meter': "func_length_c2me",
    'kilometer': "func_length_c2k",
  },
  'meter': {
    'inch': "func_length_me2i",
    'foot': "func_length_me2f",
    'yard': "func_length_me2y",
    'mile': "func_length_me2mi",
    'centimeter': "func_length_me2c",
    'meter': "func_same",
    'kilometer': "func_length_me2k",
  },
  'kilometer': {
    'inch': "func_length_k2i",
    'foot': "func_length_k2f",
    'yard': "func_length_k2y",
    'mile': "func_length_k2mi",
    'centimeter': "func_length_k2c",
    'meter': "func_length_k2me",
    'kilometer': "func_same",
  },

  'square_inch': {
    'square_inch': "func_same",
    'square_foot': "func_area_i2f",
    'anna': "func_area_i2a",
    'square_centimeter': "func_area_i2c",
    'square_meter': "func_area_i2m",
  },
  'square_foot': {
    'square_inch': "func_area_f2i",
    'square_foot': "func_same",
    'anna': "func_area_f2a",
    'square_centimeter': "func_area_f2c",
    'square_meter': "func_area_f2m",
  },
  'anna': {
    'square_inch': "func_area_a2i",
    'square_foot': "func_area_a2f",
    'anna': "func_same",
    'square_centimeter': "func_area_a2c",
    'square_meter': "func_area_a2m",
  },
  'square_centimeter': {
    'square_inch': "func_area_c2i",
    'square_foot': "func_area_c2f",
    'anna': "func_area_c2a",
    'square_centimeter': "func_same",
    'square_meter': "func_area_c2m",
  },
  'square_meter': {
    'square_inch': "func_area_m2i",
    'square_foot': "func_area_m2f",
    'anna': "func_area_m2a",
    'square_centimeter': "func_area_m2c",
    'square_meter': "func_same",
  },

  'height_inch': {
    'height_inch': "func_same",
    'water_litre': "func_other_i2l",
  },
  'water_litre': {
    'height_inch': "func_other_l2i",
    'water_litre': "func_same",
  },

  'ounce': {
    'ounce': "func_same",
    'pound': "func_weight_o2p",
    'gram': "func_weight_o2g",
    'kilogram': "func_weight_o2k",
  },
  'pound': {
    'ounce': "func_weight_p2o",
    'pound': "func_same",
    'gram': "func_weight_p2g",
    'kilogram': "func_weight_p2k",
  },
  'gram': {
    'ounce': "func_weight_g2o",
    'pound': "func_weight_g2p",
    'gram': "func_same",
    'kilogram': "func_weight_g2k",
  },
  'kilogram': {
    'ounce': "func_weight_k2o",
    'pound': "func_weight_k2p",
    'gram': "func_weight_k2g",
    'kilogram': "func_same",
  },

  'cubic_foot': {
    'cubic_foot': "func_same",
    'litre': "func_volume_f2l",
    'cubic_meter': "func_volume_f2m",
  },
  'litre': {
    'cubic_foot': "func_volume_l2f",
    'litre': "func_same",
    'cubic_meter': "func_volume_l2m",
  },
  'cubic_meter': {
    'cubic_foot': "func_volume_m2f",
    'litre': "func_volume_m2l",
    'cubic_meter': "func_same",
  },

  'degree': {
    'degree': "func_same",
    'radian': "func_angle_d2r",
    'gradian': "func_angle_d2g",
  },
  'radian': {
    'degree': "func_angle_r2d",
    'radian': "func_same",
    'gradian': "func_angle_r2g",
  },
  'gradian': {
    'degree': "func_angle_g2d",
    'radian': "func_angle_g2r",
    'gradian': "func_same",
  },
}

function category_changed(selected_category) {
  if (selected_category.value == "none") {
    document.getElementById("first_unit").innerHTML = "<option value='none'>-- empty --</option>";
    document.getElementById("second_unit").innerHTML = "<option value='none'>-- empty --</option>";
	convert();
    update_local_storage();
    return;
  }

  document.getElementById("first_unit").innerHTML = "";
  document.getElementById("second_unit").innerHTML = "";

  var category = null;

  switch (selected_category.value) {
    case 'temperature':
      category = array_temperature;
      break;
    case 'length':
      category = array_length;
      break;
    case 'area':
      category = array_area;
      break;
    case 'weight':
      category = array_weight;
      break;
    case 'volume':
      category = array_volume;
      break;
    case 'angle':
      category = array_plane_angle;
      break;
    case 'other':
      category = array_other;
      break;
  }

  var units_length = category.length;

  for (let index = 0; index < units_length; index++) {
    var select = document.getElementById("first_unit");
    var option = document.createElement("option");
    select.options.add(option);
    option.text = category[index].replace("_"," ");
    option.value = category[index];
  }

  for (var index = 0; index < units_length; index++) {
    var select = document.getElementById("second_unit");
    var option = document.createElement("option");
    select.options.add(option);
    option.text = category[index].replace("_"," ");
    option.value = category[index];
  }
  convert();
  update_local_storage();
}

function convert() {
  var val_to_convert = document.getElementById("first_value").value;
  // console.log(val_to_convert);
  var first_unit = document.getElementById('first_unit').value;
  var second_unit = document.getElementById('second_unit').value;

  var conversion_function = conversion_func_dict[first_unit][second_unit];

  var converted_value = eval(conversion_function + "(" + val_to_convert + ")");
  document.getElementById("second_value").value = converted_value.toFixed(4);

  update_local_storage();
}

function exchange_units() {
  var first_unit = document.getElementById('first_unit');
  var second_unit = document.getElementById('second_unit');

  var swap = first_unit.value;
  first_unit.value = second_unit.value;
  second_unit.value = swap;
  convert();
}

var saved_category = localStorage.getItem('saved_category');
var saved_first_unit = localStorage.getItem('saved_first_unit');
var saved_second_unit = localStorage.getItem('saved_second_unit');

if(saved_category) {
  document.getElementById("category").value = saved_category;
  category_changed(document.getElementById('category'));
}

if(saved_first_unit) {
  document.getElementById("first_unit").value = saved_first_unit;
}

if(saved_second_unit) {
  document.getElementById("second_unit").value = saved_second_unit;
}

function update_local_storage() {
  localStorage.saved_category = document.getElementById("category").value;
  localStorage.saved_first_unit = document.getElementById("first_unit").value;
  localStorage.saved_second_unit = document.getElementById("second_unit").value;
}

convert();

/** ************************
*** CONVERSION FUNCTIONS ***
************************ **/

//-------------------------------------------------
// SAME UNIT CONVERSION
//-------------------------------------------------
function func_same(value) {
  return value;
}

//-------------------------------------------------
// TEMPERATURE CONVERSION
//-------------------------------------------------
function func_temp_k2c(value) {
  return value - 273.15;
}

function func_temp_k2f(value) {
  return value * (9.0 / 5.0) - 459.67;
}

//-------------------------------------------------

function func_temp_c2k(value) {
  return value + 273.15;
}

function func_temp_c2f(value) {
  return (value * (9.0 / 5.0)) + 32.0;
}

//-------------------------------------------------

function func_temp_f2k(value) {
  return (value + 459.67) * (5.0 / 9.0);
}

function func_temp_f2c(value) {
  return (value - 32.0) * (5.0 / 9.0);
}

//-------------------------------------------------
// LENGTH CONVERSION
//-------------------------------------------------
function func_length_i2f(value) {
  return value / func_length_f2i(1.0);
}

function func_length_i2y(value) {
  return value / func_length_y2i(1.0);
}

function func_length_i2mi(value) {
  return value / func_length_mi2i(1.0);
}

function func_length_i2c(value) {
  return value / func_length_c2i(1.0);
}

function func_length_i2me(value) {
  return value / func_length_me2i(1.0);
}

function func_length_i2k(value) {
  return value / func_length_k2i(1.0);
}

//-------------------------------------------------

function func_length_f2i(value) {
  return value * 12.0;
}

function func_length_f2y(value) {
  return value / 3.0;
}

function func_length_f2mi(value) {
  return func_length_f2y(value) / 1760.0;
}

function func_length_f2c(value) {
  return func_length_i2c(value) * 12.0;
}

function func_length_f2me(value) {
  return func_length_f2c(value) / 100.0;
}

function func_length_f2k(value) {
  return func_length_f2me(value) / 1000.0;
}

//-------------------------------------------------

function func_length_y2i(value) {
  return func_length_y2f(value) * 12.0;
}

function func_length_y2f(value) {
  return value * 3.0;
}

function func_length_y2mi(value) {
  return value / func_length_mi2y(1.0);
}

function func_length_y2c(value) {
  return func_length_y2me(value) * 100.0;
}

function func_length_y2me(value) {
  return func_length_y2k(value) * 1000.0;
}

function func_length_y2k(value) {
  return value / func_length_k2y(1.0);
}

//-------------------------------------------------

function func_length_mi2i(value) {
  return func_length_mi2f(value) * 12.0;
}

function func_length_mi2f(value) {
  return func_length_mi2y(value) * 3.0;
}

function func_length_mi2y(value) {
  return value * 1760.0;
}

function func_length_mi2c(value) {
  return func_length_mi2m(value) * 100.0;
}

function func_length_mi2me(value) {
  return func_length_mi2k(value) * 1000.0;
}

function func_length_mi2k(value) {
  return 1.0 / func_length_k2mi(value);
}

//-------------------------------------------------

function func_length_c2i(value) {
  return func_length_me2i(value) / 100.0;
}

function func_length_c2f(value) {
  return func_length_me2f(value) / 100.0;
}

function func_length_c2y(value) {
  return func_length_me2y(value) / 100.0;
}

function func_length_c2mi(value) {
  return func_length_me2mi(value) / 100.0;
}

function func_length_c2me(value) {
  return value / 100.0;
}

function func_length_c2k(value) {
  return func_length_c2me(value) / 1000.0;
}

//-------------------------------------------------

function func_length_me2i(value) {
  return func_length_me2f(value) * 12.0;
}

function func_length_me2f(value) {
  return func_length_me2y(value) * 3.0;
}

function func_length_me2y(value) {
  return value * 1.09361;
}

function func_length_me2mi(value) {
  return func_length_k2mi(value) / 1000.0;
}

function func_length_me2c(value) {
  return value * 100.0;
}

function func_length_me2k(value) {
  return value / 1000.0;
}

//-------------------------------------------------

function func_length_k2i(value) {
  return func_length_k2f(value) * 12.0;
}

function func_length_k2f(value) {
  return func_length_k2y(value) * 3.0;
}

function func_length_k2y(value) {
  return value * 1093.612959995625;
}

function func_length_k2mi(value) {
  return value * 0.621371;
}

function func_length_k2c(value) {
  return value * func_length_k2me(value) * 100.0;
}

function func_length_k2me(value) {
  return value * 1000.0;
}
//-------------------------------------------------
// AREA CONVERSION
//-------------------------------------------------
function func_area_i2f(value) {
  return value / func_area_f2i(1.0);
}

function func_area_i2a(value) {
  return func_area_f2a(value) / 144.0;
}

function func_area_i2c(value) {
  return value * 6.4516;
}

function func_area_i2m(value) {
  return func_area_i2c(value) / 10000.0;
}

//-------------------------------------------------

function func_area_f2i(value) {
  return value * 144.0;
}

function func_area_f2a(value) {
  return value / func_area_a2f(1.0);
}

function func_area_f2c(value) {
  return func_area_f2m(value) * 10000.0;
}

function func_area_f2m(value) {
  return value * 0.092903;
}

//-------------------------------------------------

function func_area_a2i(value) {
  return func_area_a2f(value) * 144.0;
}

function func_area_a2f(value) {
  return value * 346.5625;
}

function func_area_a2c(value) {
  return func_area_a2f(value) * func_area_f2c(1.0);
}

function func_area_a2m(value) {
  return value * 31.79606544;
}

//-------------------------------------------------

function func_area_c2i(value) {
  return value * 0.155;
}

function func_area_c2f(value) {
  return func_area_c2i(value) / 144.0;
}

function func_area_c2a(value) {
  return value / func_area_a2c(1.0);
}

function func_area_c2m(value) {
  return value / 10000.0;
}

//-------------------------------------------------

function func_area_m2i(value) {
  return func_area_c2i(value) * 10000.0;
}

function func_area_m2f(value) {
  return value * 10.7639;
}

function func_area_m2a(value) {
  return value / func_area_a2m(1.0);
}

function func_area_m2c(value) {
  return value * 10000.0;
}

//-------------------------------------------------
// WEIGHT CONVERSION
//-------------------------------------------------
function func_weight_o2p(value) {
  return value / func_weight_p2o(1.0);
}

function func_weight_o2g(value) {
  return value * 28.3495;
}

function func_weight_o2k(value) {
  return value / func_weight_k2o(1.0);
}

//-------------------------------------------------

function func_weight_p2o(value) {
  return value * 16.0;
}

function func_weight_p2g(value) {
  return value * 453.592;
}

function func_weight_p2k(value) {
  return value / func_weight_k2p(value);
}

//-------------------------------------------------

function func_weight_g2o(value) {
  return value / func_weight_o2g(1.0);
}

function func_weight_g2p(value) {
  return value /func_weight_p2g(1.0);
}

function func_weight_g2k(value) {
  return value / func_weight_k2g(1.0);
}

//-------------------------------------------------

function func_weight_k2o(value) {
  return func_weight_g2o(value) * 1000.0;
}

function func_weight_k2p(value) {
  return value * 2.20462;
}

function func_weight_k2g(value) {
  return value * 1000.0;
}

//-------------------------------------------------
// VOLUME CONVERSION
//-------------------------------------------------
function func_volume_f2l(value) {
  return value * 28.3168;
}

function func_volume_f2m(value) {
  return value / func_volume_m2f(1.0);
}

//-------------------------------------------------

function func_volume_l2f(value) {
  return value / func_volume_f2l(1.0);
}

function func_volume_l2m(value) {
  return value / func_volume_m2l(1.0);
}

//-------------------------------------------------

function func_volume_m2f(value) {
  return value * 35.31467;
}

function func_volume_m2l(value) {
  return value * 1000.0;
}

//-------------------------------------------------
// PLANE ANGLE CONVERSION
//-------------------------------------------------
function func_angle_d2r(value) {
  return value * (PI / 180.0);
}

function func_angle_d2g(value) {
  return value * (10.0 / 9.0);
}

//-------------------------------------------------

function func_angle_r2d(value) {
  return value / func_angle_d2r(1.0);
}

function func_angle_r2g(value) {
  return value * (200.0 / PI);
}

//-------------------------------------------------

function func_angle_g2d(value) {
  return value / func_angle_d2g(1.0);
}

function func_angle_g2r(value) {
  return value / func_angle_r2g(1.0);
}

//-------------------------------------------------
// OTHER CONVERSION
//-------------------------------------------------
function func_other_i2l(value) {
  return value * 181.07406;
}

function func_other_l2i(value) {
  return value / func_other_i2l(1.0);
}
