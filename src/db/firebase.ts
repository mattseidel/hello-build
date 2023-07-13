import { FirebaseOptions } from "firebase/app";
import { initializeApp } from "firebase/app";
import {getFirestore as getFires} from "firebase/firestore"



export const firebaseConfig: FirebaseOptions = {
  apiKey: "AIzaSyAhNXi2YrVl3WrxarEnq0mzvtRZmfXDPKw",
  authDomain: "hello-build-439c9.firebaseapp.com",
  projectId: "hello-build-439c9",
  storageBucket: "hello-build-439c9.appspot.com",
  messagingSenderId: "96211372074",
  appId: "1:96211372074:web:62f07b02aabf79dcf69b53",
  measurementId: "G-7PZE13EZEN",
};

export const app = initializeApp(firebaseConfig);


export const db = getFires(app);