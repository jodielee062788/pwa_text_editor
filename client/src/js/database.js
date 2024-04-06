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

// Function to add content to the database
export const putDb = async (content) => 
  console.error('putDb not implemented');

  // Open the database
  const textDb = await openDB('jate', 1);

  // Start a transaction and get the object store
  const tx = textDb.transaction('jate', 'readwrite');
  const store = tx.objectStore('jate');

  // Add the data to the object store
  const request = store.add({ content: content });
  const result = await request;
  console.log('Data saved to the database', result);

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => console.error('getDb not implemented');

initdb();
