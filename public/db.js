//indexedDB pseudo code
//

// GLOBAL VARIABLES
let db;


//  create a database
const request = indexedDB.open("budgetTracker", 1);

request.onsuccess = () => {
    console.log(request.result)
}

//  create an object store - so we can store data
request.onupgradeneeded = ({ target }) => {
    let budgetStore;
    db = target.result;
    // if there isn't an objectStore already, create one with autoIncrementing unique id's
    if (db.objectStoreNames.length === 0) {
       budgetStore = db.createObjectStore('BudgetTracker', { autoIncrement: true });
      }
      //  create indexes - so we can query the data
    budgetStore.createIndex("test", "testKeyPath")
};



//  add data to the database
//  update data with cursors