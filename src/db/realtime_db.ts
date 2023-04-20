import {
  getDatabase,
  ref,
  onValue,
  set,
  update,
  remove
} from 'firebase/database';
import RealtimeDatabasePaths from '../types/RealtimeDatabasePaths';

const read = async <T extends keyof RealtimeDatabasePaths>(
  path: T
): Promise<RealtimeDatabasePaths[T] | undefined> => {
  const database = getDatabase();
  const dataRef = ref(database, path);

  return new Promise((resolve, reject) => {
    onValue(
      dataRef,
      snapshot => {
        const data = snapshot.val();
        resolve(data as RealtimeDatabasePaths[T]);
      },
      error => {
        reject(error);
      }
    );
  });
};

const write = async <T extends keyof RealtimeDatabasePaths>(
  path: T,
  data: RealtimeDatabasePaths[T]
) => {
  const database = getDatabase();
  const dataRef = ref(database, path);
  await set(dataRef, data);
};

const updateData = async <T extends keyof RealtimeDatabasePaths>(
  path: T,
  data: Partial<RealtimeDatabasePaths[T]>
) => {
  const database = getDatabase();
  const dataRef = ref(database, path);
  await update(dataRef, data);
};

const deleteData = async <T extends keyof RealtimeDatabasePaths>(path: T) => {
  const database = getDatabase();
  const dataRef = ref(database, path);
  await remove(dataRef);
};

///////////////// usage example ///////////

// import realtime_db from "./realtime_db";

// // Read data
// const data = await realtime_db.read("your-path");

// // Write data
// await realtime_db.write("your-path", data);

// // Update data
// await realtime_db.updateData("your-path", updatedData);

// // Delete data
// await realtime_db.deleteData("your-path");

///////////////// usage example ///////////

const realtime_db = {
  read,
  write,
  updateData,
  deleteData
};

export default realtime_db;
