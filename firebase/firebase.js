//initializes the firebase database app

import { getDatabase } from "firebase/database";
import { firebaseConfig } from "./firebaseConfig";

// Get a reference to a Realtime Database service
const database = getDatabase(app);

export default database;
