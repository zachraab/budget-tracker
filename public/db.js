//indexedDB pseudo code
//

// GLOBAL VARIABLES
let db;


//  create a database
const request = indexedDB.open("budgetTracker", 1);

//  create an object store - so we can store data
request.onupgradeneeded = ({ target }) => {
    let budgetStore;
    db = target.result;
    // if there isn't an objectStore already, create one with autoIncrementing unique id's
    if (db.objectStoreNames.length === 0) {
       budgetStore = db.createObjectStore('BudgetTracker', { 
        autoIncrement: true,
        keyPath: "ID" 
      });
      }
};

request.onsuccess = () => {
db = request.result
//check if app is online before reading db, then call function that reads db
if (navigator.onLine)  {
    console.log("Back online!");
    checkDatabase();
}
}

//handle errors to enhance user experience
request.onerror = function (e) {
    console.log(`Error Occured: ${e.target.errorCode}`)
}

//function that saves data when app is offline
const saveRecord = (record) => {
    console.log("saving record offline")
    //create transaction 
    const transaction = db.transaction(["BudgetTracker"], "readwrite");

    //access object store
    const store = transaction.objectStore("BudgetTracker")

    //add records to the storage
    store.add(record)
}

// create function that checks and reads the db and then makes a POST call to transaction list with that data, then clear out the objectStore
function checkDatabase() {
    console.log("checking database...")

//give access to db with readwrite privileges 
let transaction = db.transaction(["BudgetTracker"], "readwrite");
//grab objectStore
const budgetStore = transaction.objectStore("BudgetTracker");
//get all records from budgetStore
const getAll = budgetStore.getAll();

getAll.onsuccess = function() {
    //bulk add
    fetch("/api/transaction/bulk", {
        method: "POST",
        body: JSON.stringify(getAll.result),
        headers: {
            Accept: 'application/json, text/plain, */*',
            'Content-Type': 'application/json',
          },
    }).then((response) => response.json())
}
}

// event listener to check for app coming back online
window.addEventListener('online', checkDatabase);