import { initializeApp } from 'firebase/app';
import {
  getFirestore,
  connectFirestoreEmulator,
  enableMultiTabIndexedDbPersistence
} from 'firebase/firestore';
import {
  getAuth,
  connectAuthEmulator
  // signInWithCredential,
  // EmailAuthProvider
} from 'firebase/auth';
import { connectDatabaseEmulator, getDatabase } from 'firebase/database';

import { connectStorageEmulator, getStorage } from 'firebase/storage';

// the values to initialize the firebase app can be found in your firebase project
const firebaseConfig = {};

const initFirebase = async () => {
  try {
    const app = initializeApp(firebaseConfig);
    const firestore = getFirestore(app);
    const storage = getStorage(app);
    const auth = getAuth(app);
    const database = getDatabase(app);

    if (process.env.NODE_ENV !== 'production') {
      connectAuthEmulator(auth, 'http://localhost:9099');
      connectFirestoreEmulator(firestore, 'localhost', 8080);
      connectStorageEmulator(storage, 'localhost', 9199);
      connectDatabaseEmulator(database, 'localhost', 9000);
      enableMultiTabIndexedDbPersistence(firestore);
      /**
       * The following code logins the user automatically to speed up development.
       * For this to work you first need to create a user and then run the command
       * yarn emulator:export, then import the data when starting the emulator
       * yarn firebase emulators:start --only firestore,auth --import=firestore_mock_data
       */
      // signInWithCredential(
      //   auth,
      //   EmailAuthProvider.credential('john@doe.com', '123123')
      // )
    }
  } catch (err) {
    console.error(err);
    return err;
  }
};

export default initFirebase;
