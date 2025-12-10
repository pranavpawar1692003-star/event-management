import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyBYkH2aEoGlzUSElUI7UIZ-J3_GHgU3a5M",
  authDomain: "event-management-185f8.firebaseapp.com",
  projectId: "event-management-185f8",
  storageBucket: "event-management-185f8.firebasestorage.app",
  messagingSenderId: "152296411402",
  appId: "1:152296411402:web:5308a2d81863585994eaf3",
  measurementId: "G-CVRNFWLGZ6"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const analytics = getAnalytics(app);