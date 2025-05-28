import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";

const firebaseConfig = {
  apiKey: "AIzaSyClTmmWOdKHaZoHilB9YVCYBdw6ogum-Y0",
  authDomain: "crizmazo.firebaseapp.com",
  projectId: "crizmazo",
  storageBucket: "crizmazo.firebasestorage.app",
  messagingSenderId: "954719278904",
  appId: "1:954719278904:web:a89d4e0700f878eb6753cd",
  measurementId: "G-9B0VRQNBDG",
};

const app = initializeApp(firebaseConfig);

const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});

export { app, auth };
