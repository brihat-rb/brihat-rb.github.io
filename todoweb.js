// webstore integrated with todo
// indentation required

// global variables, to be changed to const
var todolist = document.getElementById("todos");
var todo = document.getElementById("title");

// initial state not done by default, change this to done or use this variable to do otherwise
var state = "ndone";
// to store filter state
var filter_state = "0";

var db; //global

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
    // copied
    request.onupgradeneeded = function(e) {
        // Grab a reference to the opened database
        var db = e.target.result;

        // Create an objectStore to store our notes in (basically like a single table)
        // including a auto-incrementing key
        var objectStore = db.createObjectStore('todos', { keyPath: 'id', autoIncrement:true });

        // Define what data items the objectStore will contain
        objectStore.createIndex('title', 'title', { unique: false });
        objectStore.createIndex('state', 'state', { unique: false });

        console.log('Database setup complete');
    };
}; //window onload close;

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

    // Report on the success of the transaction completing, when everything is done
    transaction.oncomplete = function() {
        console.log('Transaction completed: database modification finished.');

        // update the display of data to show the newly added item, by running displayData() again.
        showtodo(filter_state);
    };

    transaction.onerror = function() {
        console.log('Transaction not opened due to error');
    };

} // addtodo close

// display todos
function showtodo(sh) {
    //lets modify a bit
    // arg 0 = all
    // arg 1 = done only
    // arg 2 = ndone only
    filter_state = sh;
    var filterstate;

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

    // -- count
    // Open our object store and then get a cursor - which iterates through all the
    // different data items in the store
    var objectStore = db.transaction('todos').objectStore('todos');
    var count;
    var countRequest = objectStore.count();

    countRequest.onsuccess = function() {
        count = countRequest.result;
        var abc = "count = " + count;
        document.getElementById("count").innerHTML = abc;
    }
    // -- count end

    objectStore.openCursor().onsuccess = function(e) {

        // Get a reference to the cursor
        var cursor = e.target.result;

        // If there is still another data item to iterate through, keep running this code
        if(cursor) {
            if(cursor.value.state == filterstate || filterstate == "all") {
                // Create a list item, h3, and p to put each data item inside when displaying it
                // structure the HTML fragment, and append it inside the list
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
            // Iterate to the next item in the cursor
            cursor.continue();
        }

        // list is empty cursor points to null
        else {
            // Again, if list item is empty, display a 'No notes stored' message
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
            // if there are no more cursor items to iterate through, say so
            console.log('Notes all displayed');
        }
        if(filter_state == "0") {
            document.getElementById("filter").selectedIndex = 0;
        }
        countall();
    };
} //showtodo close

function deltodo(did) {
    // retrieve the name of the task we want to delete. We need
    // to convert it to a number before trying it use it with IDB; IDB key
    // values are type-sensitive.
    // var todoid = Number(e.target.parentNode.getAttribute('data-note-id'));
    var id = Number(did.substring(4,did.length));

    // open a database transaction and delete the task, finding it using the id we retrieved above
    var transaction = db.transaction(['todos'], 'readwrite');
    var objectStore = transaction.objectStore('todos');

    objectStore.delete(id);

    showtodo(filter_state);
} //deltodo close

// edit task name
function editname(eid) {
    var nname = prompt("Enter new name:");
    if(nname == "") {
        return;
    }

    var id = eid.substring(5,eid.length);

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
                    console.log('success');
                };
            }
            cursor.continue();
        }
    };
    showtodo(filter_state);
} // end editname

// toggle done
function toggle(tid) {
    var id = tid.substring(6,tid.length);
    var pid = document.getElementById(id);

    var transaction = db.transaction(['todos'], 'readwrite');
    var objectStore = transaction.objectStore('todos');

    objectStore.openCursor().onsuccess = function(event) {
        var cursor = event.target.result;

        if (cursor) {
            if (cursor.value.id == id) {
                var updateData = cursor.value;

                if (pid.getAttribute("state") == "done") {
                    console.log(cursor.value.state);
                    updateData.state = "ndone";
                }
                else if (pid.getAttribute("state") == "ndone") {
                    updateData.state = "done";
                }

                var request = cursor.update(updateData);
                request.onsuccess = function() {
                    console.log('toggle success');
                };
            }
            cursor.continue();
        }
    };
    showtodo(filter_state);
} // toggle ends

// counts tasks to be done and task done
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

        console.log("INFO:",not_done_counter,"TASK TO DO and",done_counter,"TASK DONE");
    };
} // count function ends

// delete all tasks
function delall(sid) {
    // open a read/write db transaction, ready for clearing the data
    var transaction = db.transaction(["todos"], "readwrite");

    // report on the success of the transaction completing, when everything is done
    transaction.oncomplete = function(event) {
        console.log('Transaction completed');
    };

    transaction.onerror = function(event) {
        console.log('Transaction not opened due to error: ' + transaction.error);
    };

    // create an object store on the transaction
    var objectStore = transaction.objectStore("todos");

    if(sid == 0) {
        // Make a request to clear all the data out of the object store
        var objectStoreRequest = objectStore.clear();

        objectStoreRequest.onsuccess = function(event) {
            // report the success of our request
            showtodo(filter_state);
        };
    }
    else if(sid == 1) {
        //del to do
        objectStore.openCursor().onsuccess = function(event) {
            var cursor = event.target.result;
            if(cursor) {
                if(cursor.value.state == "ndone") {
                    objectStore.delete(cursor.value.id);
                }
                cursor.continue();
            }
        };
        showtodo(filter_state);
    }
    else {
        //del done
        objectStore.openCursor().onsuccess = function(event) {
            var cursor = event.target.result;
            if(cursor) {
                if(cursor.value.state == "done") {
                    objectStore.delete(cursor.value.id);
                }
                cursor.continue();
            }
        };
        showtodo(filter_state);
    }
} // delete all tasks ends

// Search tasks
function search() {
    var query = document.getElementById("find").value;
    if(query=="") {
        alert("Nothing to search.");
        return;
    }

    var transaction = db.transaction(['todos'], 'readwrite');
    var objectStore = transaction.objectStore('todos');

    objectStore.openCursor().onsuccess = function(event) {
        var cursor = event.target.result;

        if (cursor) {
            if (cursor.value.title.toLowerCase() == query.toLowerCase()) {
                if(cursor.value.state == "done") {
                    alert(query+" is already done");
                    return;
                }
                else {
                    alert(query+" is not done yet");
                    return;
                }
            }
            cursor.continue();
        }
        else {
            alert(query+" is not found");
        }
    };
    document.getElementById("find").value="";
} // search close
