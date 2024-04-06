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
export const putDb = async (content) => {
  try {
    // Open the database
    const textDb = await openDB('jate', 1);

    // Start a transaction and get the object store
    const tx = textDb.transaction('jate', 'readwrite');
    const store = tx.objectStore('jate');

    // Add the data to the object store
    const request = store.add({ content: content });
    const result = await request;
    console.log('Data saved to the database', result);

  } catch (error) {
    console.error('Error posting data to the database:', error);
    }
  };

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  try {
    // Open the database
    const textDb = await openDB('jate', 1);

    // Start a read-only transaction and get the object store
    const tx = textDb.transaction('jate', 'readonly');
    const store = tx.objectStore('jate');

    // Retrieve all data from the object store
    const request = store.getAll();

    const result = await request;
    console.log('result.value', result);
    return result;
    
  } catch (error) {
    console.error('Error retrieving data from the database:', error);
    }
  };

initdb();
