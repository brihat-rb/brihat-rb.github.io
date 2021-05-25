let myinfo_popup_box = document.getElementById("myinfo_popup");
let myinfo_btn = document.getElementById("myinfo");
let myinfo_span = document.getElementById("myinfo_close");

// When the user clicks the button, open the modal
myinfo_btn.onclick = function() {
  // app_info();
  myinfo_popup_box.style.display = "block";
};

// When the user clicks on <span> (x), close the modal
myinfo_span.onclick = function() {
  myinfo_popup_box.style.display = "none";
};

// When the user clicks anywhere outside of the modal within parent, close it
window.addEventListener('click', function(event) {
  if (event.target == myinfo_popup) {
    myinfo_popup_box.style.display = "none";
  }
  else if(event.target == div_content) {
    myinfo_popup_box.style.display = "none";
  }
});


document.getElementById("datetime").onmouseover = function() {
  document.getElementById('titlebarbtns').style.visibility = "visible";
  document.getElementById('titlebarbtns').style.opacity = 1;
};

document.getElementById("datetime").onmouseout = async function() {
  await new Promise(r => setTimeout(r, 3000));
  document.getElementById('titlebarbtns').style.visibility = "hidden";
  document.getElementById('titlebarbtns').style.opacity = 0;
};
