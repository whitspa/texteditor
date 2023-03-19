import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

//Added logic that accepts some content and adds it to the database
 

export const putDb = async (content) => {
  console.log('PUT to database');
//creates connection to db
  const contactDb = await openDB('jate', 1);
//creates new transaction and specifies database and version
  const trans = contactDb.transaction('jate,readwrite');
//creates new transaction and specifies database and privileges
  const store = trans.objectStore('jate');
//designate the desired objectStore to open
  const request = store.put({ id: 1, value: content});
//logic to pass content into the store
  const result = await request;
  console.log("Data saved to the database", result);
};



// Added logic that gets all the content from the database
export const getDb = async () => {
console.log("GET from database");
const contactDb = await openDB('jate', 1);
const trans = contactDb.transaction('jate', 'readonly');
const store = trans.objectStore('jate');
const request = store.getAll();

const result = await request;
console.log('result.value', result);
return result?.value;
};

initdb();
