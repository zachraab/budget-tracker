//indexedDB pseudo code
//

//  create a database
const request = indexedDB.open("budgetTracker", 1);

request.onsuccess = () => {
    console.log(request.result)
}
//  create an object store - so we can store data
//  create indexes - so we can query the data
//  add data to the database
//  update data with cursors