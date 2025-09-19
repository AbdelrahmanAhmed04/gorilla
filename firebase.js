// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { initializeFirestore, persistentLocalCache } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_PROJECTS_DB_API_KEY,
  authDomain: import.meta.env.VITE_PROJECTS_DB_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_PROJECTS_DB_PROJECT_ID,
  storageBucket: import.meta.env.VITE_PROJECTS_DB_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_PROJECTS_DB_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_PROJECTS_DB_APP_ID,
  measurementId: import.meta.envVITE_PROJECTS_DB_MEASURMENT_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = initializeFirestore(app, {
  localCache: persistentLocalCache(),
});
