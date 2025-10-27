import { db } from "./firebase";
import { addDoc, getDocs, updateDoc, deleteDoc, doc, collection } from "firebase/firestore";

const ref = collection(db, "products");

export const getProd = () => {
  return getDocs(ref);
};

export const addProd = (payload) => {
  return addDoc(ref, payload);
};

export const updateProd = (id, payload) => {
  return updateDoc(doc(db, "products", id), payload);
};

export const deleteProd = (id) => {
  return deleteDoc(doc(db, "products", id));
};
