import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAhDNvIGb588QO6b5QoVAoZ42eAoLw4Ua8",
  authDomain: "chatting-app-9abdc.firebaseapp.com",
  projectId: "chatting-app-9abdc",
  storageBucket: "chatting-app-9abdc.appspot.com",
  messagingSenderId: "232776102177",
  appId: "1:232776102177:web:858b97924b8be56e4ace60"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth=getAuth();
export const storage = getStorage();
export const db=getFirestore(app);
