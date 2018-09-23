// todo using indexeddb
// supports add edit delete filter search
"use strict";

// global variables
const todolist = document.getElementById("todos");
const todo = document.getElementById("title");
const sv = document.getElementById("for_search");

// initial state of todo (not done by default)
// change this to done or use this variable to do otherwise
var state = "ndone";

// to store filter state
var filter_state = "0";

var db;

window.onload = function() {
    //get database
    var request = window.indexedDB.open('todos', 1);

    // onerror
    request.onerror = function() {
        console.log("Database failed to open");
    };

    // onsuccess
    request.onsuccess = function() {
        console.log("Database opened successfully");
        db = request.result;
        showtodo(filter_state);
    };

    // Setup the database tables if this has not already been done
    request.onupgradeneeded = function(e) {
        // Grab a reference to the opened database
        var db = e.target.result;

        // Create an objectStore to store our notes in (basically like a single table)
        // including a auto-incrementing key
        var objectStore = db.createObjectStore('todos', { keyPath: 'id', autoIncrement:true });

        // Define what data items the objectStore will contain
        objectStore.createIndex('title', 'title', { unique: true });
        objectStore.createIndex('state', 'state', { unique: false });

        console.log('Database setup complete');
    };
}; //window onload close

// adds new task
function addtodo() {
    if(todo.value=="") {
        alert("Empty task");
        return;
    }

    var newtodo = { title: todo.value, state: state };

    // open a read/write db transaction, ready for adding the data
    let transaction = db.transaction(['todos'], 'readwrite');

    // call an object store that's already been added to the database
    let objectStore = transaction.objectStore('todos');

    // Make a request to add our newItem object to the object store
    var request = objectStore.add(newtodo);

    request.onsuccess = function() {
        // Clear the form, ready for adding the next entry
        todo.value = '';
    };

    // checks unique title in todos
    request.onerror = function() {
      alert("Two tasks cannot have same name");
    }

    // Report on the success of the transaction completing, when everything is done
    transaction.oncomplete = function() {
        console.log('NEW TASK ADDED');

        // update the display of data to show the newly added item, by running displayData() again.
        showtodo(filter_state);
    };

    transaction.onerror = function() {
        console.log('AN ERROR OCCURED');
    };
} // addtodo close

// display todos
function showtodo(sh) {
    // sh == 0  no filter
    // sh == 1  done filter
    // sh == 2  not done filter

    filter_state = sh;
    var filterstate;
    var scount = 0;

    if(sh == 0 || sh == "0") {
        filterstate = "all";
    }
    else if (sh =="1") {
        filterstate = "done";
    }
    else if (sh=="2") {
        filterstate = "ndone";
    }

    // Here we empty the contents of the list element each time the display is updated
    // If you didn't do this, you'd get duplicates listed each time a new note is added
    while (todolist.firstChild) {
        todolist.removeChild(todolist.firstChild);
    }

    var objectStore = db.transaction('todos').objectStore('todos');

    // get value from search box
    var query = document.getElementById("find").value;

    scount = 0;
    objectStore.openCursor().onsuccess = function(e) {
        // Get a reference to the cursor
        var cursor = e.target.result;

        // If there is still another data item to iterate through, keep running this code
        if(cursor) {
            if(cursor.value.state == filterstate || filterstate == "all") {
                if(cursor.value.title.toLowerCase().startsWith(query.toLowerCase())) {
                    // increase search count by one;
                    scount++;

                    // display search count
                    if(query != "") {
                      sv.innerHTML = "<hr width='20%'>SEARCH RESULT (<b style='color:blue'>" + scount + "</b>)<hr width='20%'/>";
                    }
                    else {
                      sv.innerHTML ="";
                    }

                    // construct HTML structure for todos
                    var pdiv = document.createElement('div');
                    var ndiv = document.createElement('div');
                    var tdiv = document.createElement('div');
                    var bdiv = document.createElement('div');

                    var content = document.createElement('label');
                    var edit = document.createElement('button');
                    var del = document.createElement('button');
                    var tstate = document.createElement('button');

                    content.id = cursor.value.id + "_l";
                    content.innerHTML = cursor.value.title;

                    edit.textContent = 'Edit';
                    edit.style="color:blue";
                    edit.id = "edit_" + cursor.value.id;
                    edit.setAttribute("onclick","editname(this.id)");

                    tstate.id = "state_" + cursor.value.id;
                    tstate.setAttribute("onclick","toggle(this.id)");

                    if(cursor.value.state == "done") {
                        pdiv.setAttribute("class","tdone");
                        tstate.textContent = ' Not Done';
                        tstate.style="color:maroon";
                    }
                    else {
                        pdiv.setAttribute("class","tndone");
                        tstate.textContent = 'Done';
                        tstate.style="color:green";
                    }

                    del.id = "del_" + cursor.value.id;
                    del.textContent = 'Delete';
                    del.style="color:red";
                    del.setAttribute("onclick","deltodo(this.id);");

                    bdiv.appendChild(edit);
                    bdiv.appendChild(del);
                    bdiv.appendChild(tstate);
                    bdiv.setAttribute("class","column");

                    tdiv.appendChild(content);
                    tdiv.setAttribute("class","column");

                    ndiv.setAttribute("class","margin");

                    pdiv.appendChild(ndiv);
                    pdiv.appendChild(tdiv);
                    pdiv.appendChild(bdiv);

                    // Store the ID of the data item inside an attribute on the listItem, so we know
                    // which item it corresponds to. This will be useful later when we want to delete items
                    pdiv.setAttribute('id', cursor.value.id);
                    pdiv.setAttribute("state",cursor.value.state);
                    pdiv.classList.add("row");

                    todolist.appendChild(pdiv);
                }
            }
            // Iterate to the next item in the cursor
            cursor.continue();
        }

        // if cursor points to null (no todos)
        else {
            // added for search function
            if(query != "") {
                sv.innerHTML = "<hr width='20%'>SEARCH RESULT (<b style='color:blue'>" + scount + "</b>)<hr width='20%'/>";
            }
            else {
                sv.innerHTML = "";
               
                // if no todos are found and search is not active, display message
                if(!todolist.firstChild) {
                    var pdiv = document.createElement('div');

                    if(filter_state=="0") {
                        pdiv.innerHTML = '<h3>NO TASKS</h3>';
                    }
                    else if (filter_state=="1") {
                        pdiv.innerHTML = '<h3>NO TASKS DONE</h3>';
                    }
                    else {
                        pdiv.innerHTML = '<h3 class="green">HURRAY! NO TASKS PENDING</h3>';
                    }

                    pdiv.setAttribute("class","rbold");
                    todolist.appendChild(pdiv);
                }
            }

            // if there are no more cursor items to iterate through, say so
            console.log('ALL TODOS DISPLAYED');
        }

        // update filter dropdown in HTML
        if(filter_state == "0") {
            document.getElementById("filter").selectedIndex = 0;
        }

        //count all todos
        countall();
    };
} //showtodo close

// delete particular todo that calls this method
function deltodo(did) {
    // convert delete id to id
    var id = Number(did.substring(4,did.length));
    var pdiv = document.getElementById(id);
    pdiv.setAttribute("style","display:none;");
    
    // open a database transaction and delete the task, finding it using the id above
    var transaction = db.transaction(['todos'], 'readwrite');
    var objectStore = transaction.objectStore('todos');
    objectStore.delete(id);
    countall();
} //deltodo close

// edit task name
function editname(eid) {
    var nname = prompt("Enter new name:");
    if(nname == "" || nname == null) {
        return;
    }

    var id = eid.substring(5,eid.length);

    if(document.getElementById(id+"_l").textContent == nname) {
      alert("No changes made");
      return;
    }

    var transaction = db.transaction(['todos'], 'readwrite');
    var objectStore = transaction.objectStore('todos');

    objectStore.openCursor().onsuccess = function(event) {
        var cursor = event.target.result;

        if (cursor) {
            if (cursor.value.id == id) {
                var updateData = cursor.value;
                updateData.title = nname;

                var request = cursor.update(updateData);
                request.onsuccess = function() {
                    console.log('TASK RENAMED');
                };
                request.onerror = function() {
                  alert("TASK WITH ENTERED NAME ALREADY EXIST");
                }
            }
            cursor.continue();
        }
    };
    document.getElementById(id+"_l").textContent = nname;
} // end editname

// toggle task state (done or not done)
function toggle(tid) {
    var toset;
    var id = tid.substring(6,tid.length);
    var pid = document.getElementById(id);
    var sbtn = document.getElementById("state_"+id);
    
    var transaction = db.transaction(['todos'], 'readwrite');
    var objectStore = transaction.objectStore('todos');

    if (sbtn.innerText == "Done") {
        sbtn.innerText = "Not Done";
        sbtn.setAttribute("style","color:maroon");
        pid.classList.remove("tndone");
        pid.classList.add("tdone");
        toset = "done";
    }
    else if (sbtn.innerText == "Not Done") {
        sbtn.innerText = "Done";
        sbtn.setAttribute("style","color:green");
        pid.classList.remove("tdone");
        pid.classList.add("tndone");
        toset = "ndone";
    }
    
    objectStore.openCursor().onsuccess = function(event) {
        var cursor = event.target.result;
        if (cursor) {
            if (cursor.value.id == id) {
                var updateData = cursor.value;
                updateData.state = toset;
                var request = cursor.update(updateData);
                request.onsuccess = function() {
                    console.log('TASK STATE CHANGE SUCCESSFUL');
                };
            }
            cursor.continue();
        }
    };
    countall();
} // toggle ends

// counts tasks to be done and task done and total
function countall() {
    var done_counter = 0;
    var not_done_counter = 0;

    var transaction = db.transaction(['todos'], 'readonly');
    var objectStore = transaction.objectStore('todos');
    objectStore.openCursor().onsuccess = function(event) {
        var cursor = event.target.result;

        if(cursor) {
            if(cursor.value.state == "done") {
                done_counter++;
            }
            else {
                not_done_counter++;
            }
            cursor.continue();
        }

        document.getElementById("ttd").innerHTML = not_done_counter;
        document.getElementById("td").innerHTML = done_counter;
        document.getElementById("count").innerHTML = done_counter+not_done_counter;
        console.log(not_done_counter + " TASKS PENDING AND " + done_counter + " TASKS DONE");
    };
} // count function ends

// delete all tasks
function delall(sid) {
    // sid == 0  delete all TASKS
    // sid == 1  delete all to do TASKS
    // sid == 2  delete all done TASKS

    var transaction = db.transaction(["todos"], "readwrite");
    var objectStore = transaction.objectStore("todos");

    if(sid == 0) {
        // Make a request to clear all the data out of the object store
        var objectStoreRequest = objectStore.clear();

        objectStoreRequest.onsuccess = function(event) {
            console.log("ALL TASKS DELETED");
            showtodo(filter_state);
        };
    }
    else if(sid == 1) {
        var dndone = document.getElementsByClassName("tndone");
        for(var i = 0; i < dndone.length; i++) {
            deltodo("del_"+dndone[i].id);
        }
    }
    else {
        var ddone = document.getElementsByClassName("tdone");
        for(var i = 0; i < ddone.length; i++) {
            deltodo("del_"+ddone[i].id);
        }
    }
} // delete all tasks ends

// functions for searching tasks and clearing search on blur
function search() {
    var query = document.getElementById("find").value;
    var all = document.getElementsByTagName("label");
    for(var i = 0; i < all.length; i++) {
        var pdiv = all[i].parentNode.parentNode;
        if(!(all[i].textContent.toLowerCase().startsWith(query.toLowerCase()))) {
            pdiv.setAttribute("style","display:none");
        }
        else {
            pdiv.removeAttribute("style");
        }
    }
}

function clearsearch() {
    document.getElementById("find").value="";
    search();
}
