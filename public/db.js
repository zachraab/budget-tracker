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
      //  create indexes - so we can query the data
    budgetStore.createIndex("testIndex", "testKeyPath")
};

request.onsuccess = () => {
db = request.result
//give access to db with readwrite privileges 
const transaction = db.transaction(["BudgetTracker"], "readwrite");
//grab objectStore
const budgetStore = transaction.objectStore("BudgetTracker");
//grab the index
const testIndex = budgetStore.index("testIndex")

//  add data to the database
budgetStore.add({ ID: "1", testKeyPath: "Hello World!"})
budgetStore.add({ ID: "2", testKeyPath: "test data"})

//query item by keyPath
const getRequest = budgetStore.get("2");
getRequest.onsuccess = () => {
    console.log(getRequest.result)
}
//query item(s) by index
const getRequestIndex = testIndex.getAll("Hello World!");
getRequestIndex.onsuccess = () => {
    console.log(getRequestIndex.result);
}
}

//handle errors to enhance user experience

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

//check if app is online before reading db, then call function that reads db

// create function that checks and reads the db and then makes a POST call to transaction list with that data, then clear out the objectStore

// event listener to check for app coming back online