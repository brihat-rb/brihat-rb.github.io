"use strict";

var todo = document.getElementById("dict");
var pro = document.getElementById("processing");
var keys = [];

function change(alpha) {
    pro.innerHTML = "<br/>Processing . . .";
    alphadisp(alpha);


    console.log("Deleting all previous record...");
    while (todo.firstChild) {
        todo.removeChild(todo.firstChild);
    }

    delall();
    console.log(" DEL COMPLETE: ");

    console.log("Getting dict values");
    todo.innerHTML = "<div id='pw' class='green'>PLEASE WAIT<br/>FETCHING DICTIONARY HEADWORDS....</div>";
    var requestURL = 'https://raw.githubusercontent.com/brihat-rb/brihat-rb.github.io/master/dictionary_compact.json';
    // var requestURL = 'https://raw.githubusercontent.com/brihat-rb/brihat-rb.github.io/master/dictpart.json';
    pro.innerHTML = "<br/>Obtaining Dictionary Data . . .";

    var request = new XMLHttpRequest();
    request.open('GET', requestURL);
    request.responseType = 'json';
    request.send();

    request.onload = function() {
        var jsonobj = request.response;
        console.log("adding words...");
        init(alpha,jsonobj);
    }

    request.onerror = function() {
      alert("Error fetching dictionary data.");
      pro.innerHTML = "";
    }
}

function alphadisp(alpha) {
    if(alpha.toLowerCase() == "-") {
        alpha = "#";
    }

    var abtn = document.getElementsByTagName("button");
    for(var i = 0; i < abtn.length; i++) {
        if(abtn[i].textContent.toLowerCase() == alpha) {
            abtn[i].classList.remove("btnc");
            abtn[i].classList.add("btnd");
        }
        else {
            abtn[i].classList.remove("btnd");
            abtn[i].classList.add("btnc");
        }
    }
}

function init(alpha,jobj) {
    pro.innerHTML = "<br/>Processing headwords . . .";

    keys = [];
    for(var k in jobj) {
        if(k.toLowerCase().startsWith(alpha)) {
            keys.push(k);
        }
    }
    keys.sort();

    initshow(keys,alpha);

    var nword = 0;

    var transaction = db.transaction(['dictionary'], 'readwrite');
    var objectStore = transaction.objectStore('dictionary');

    for (var i = 0; i < keys.length; i++) {
        nword++;
        var newtodo = { title: keys[i].toLowerCase()};

        var request = objectStore.add(newtodo);
        request.onsuccess = function() {
            console.log('NEW WORD ADDED');
        };
    }
    console.log(nword + " words added");
    console.log("DICT INIT COMPLETE");
}

function initshow(keys,alpha) {
    var i = 0;
    for(var j = 0; j<keys.length; j++) {
        i++;
        var pspan = document.createElement('span');
        var sep = document.createElement('code');
        var headword = document.createElement('a');

        headword.innerHTML = keys[j];
        headword.setAttribute("value",keys[j]);
        headword.setAttribute("onclick","show(this.textContent);");

        sep.innerHTML = "|";

        pspan.appendChild(headword);
        pspan.appendChild(sep);

        pspan.setAttribute('id', i);

        todo.appendChild(pspan);
    }

    todo.removeChild(todo.firstChild);
    document.getElementById("count").innerHTML = i;
    pro.innerHTML = "";

    console.log('INIT DICT DISPLAYED');
}

function show(word) {
    var requestURL = 'https://raw.githubusercontent.com/brihat-rb/brihat-rb.github.io/master/dictionary_compact.json';

    var request = new XMLHttpRequest();
    request.open('GET', requestURL);
    request.responseType = 'json';
    request.send();
    request.onload = function() {
        var jobj = request.response;
        alert(word + "\n----------------------\n" + jobj[word]);
    }
}

function search() {
    var scount = 0;
    var query = document.getElementById("find").value;
    var all = document.getElementsByTagName("span");
    for(var i = 0; i < all.length; i++) {
        if(!(all[i].textContent.toLowerCase().startsWith(query.toLowerCase()))) {
            all[i].setAttribute("style","display:none");
        }
        else {
            scount++;
            all[i].removeAttribute("style");
        }
        if(query != "") {
            sv.innerHTML = "<br/><hr width='20%'>SEARCH RESULT (<b style='color:blue'>" + scount + "</b>)<hr width='20%'/>";
        }
        else {
            sv.innerHTML = "";
        }
    }
}

function clearsearch() {
  document.getElementById("find").value="";
  search();
}
