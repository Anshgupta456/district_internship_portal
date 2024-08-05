import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyCtuXtORmomFeak3Q90JvK6nhnS-EcMtG8",
  authDomain: "formofdifferentlevels.firebaseapp.com",
  projectId: "formofdifferentlevels",
  storageBucket: "formofdifferentlevels.appspot.com",
  messagingSenderId: "306804141514",
  appId: "1:306804141514:web:45cf764252c9bce9cd7333"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Storage and get a reference to the service
const storage = getStorage(app);

export { storage };