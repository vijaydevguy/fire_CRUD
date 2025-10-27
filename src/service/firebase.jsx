import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAzUaeq4G-VCSE99QL8-DqW-pZI_D7Gz1Y",
  authDomain: "product-1c359.firebaseapp.com",
  projectId: "product-1c359",
  storageBucket: "product-1c359.firebasestorage.app",
  messagingSenderId: "755307258483",
  appId: "1:755307258483:web:773da399897e27341a0006",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
