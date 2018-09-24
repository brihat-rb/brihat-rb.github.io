// JSDict
"use strict";

// global variables
const sv = document.getElementById("for_search");
var db;
var global_count = 0;

window.onload = function() {
    var request = window.indexedDB.open('dictionary', 1);
    request.onerror = function() {
        console.log("Database failed to open");
    };
    request.onsuccess = function() {
        console.log("Database opened successfully");
        db = request.result;
        showtodo();
    };
    request.onupgradeneeded = function(e) {
        var db = e.target.result;
        var objectStore = db.createObjectStore('dictionary', { keyPath: 'id', autoIncrement:true });
        objectStore.createIndex('title', 'title', { unique: true });
        console.log('Database setup complete');
    };
}; //window onload close

// display headwords
function showtodo() {
    global_count = 0;
    while (todo.firstChild) {
        todo.removeChild(todo.firstChild);
    }

    var objectStore = db.transaction('dictionary').objectStore('dictionary');

    console.log('DICT DISPLAYING...');
    objectStore.openCursor().onsuccess = function(e) {
        var cursor = e.target.result;
            if(cursor) {
                global_count++;
                // construct HTML structure for dict
                var pspan = document.createElement('span');
                var sep = document.createElement('code');
                var headword = document.createElement('a');

                headword.id = cursor.value.id + "_l";
                headword.innerHTML = cursor.value.title;
                headword.setAttribute("value",cursor.value.title);
                headword.setAttribute("onclick","show(this.textContent);");

                sep.innerHTML = "|";

                pspan.appendChild(headword);
                pspan.appendChild(sep);

                pspan.setAttribute('id', cursor.value.id);

                todo.appendChild(pspan);

                cursor.continue();
        }

        // if cursor points to null (no words)
        else {
            if(!todo.firstChild) {
                var pdiv = document.createElement('div');
                pdiv.innerHTML = '<h3>NO WORDS</h3>';
                pdiv.setAttribute("class","rbold");
                todo.appendChild(pdiv);
            }
            console.log('DICT DISPLAYED');
        }
        document.getElementById("count").innerHTML = global_count;
    };
} //showtodo close

// delete all headwords from db
function delall() {
    var transaction = db.transaction(["dictionary"], "readwrite");
    var objectStore = transaction.objectStore("dictionary");

    var objectStoreRequest = objectStore.clear();

    objectStoreRequest.onsuccess = function(event) {
        console.log("DICT RESET COMPLETE");
        showtodo();
    };

    transaction.oncomplete = function() {
        console.log("DB RESET DONE");
    };
}
