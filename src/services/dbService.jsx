import { getFirestore, collection, addDoc, getDoc, getDocs, query, where, updateDoc, doc } from "firebase/firestore";
import { app } from '../config/firebase';// Ensure this is correctly imported from your Firebase setup

const db = getFirestore(app);

export const addDocument = (collectionName, data) => {
    return addDoc(collection(db, collectionName), data);
};

export const getDocument = (collectionName, id) => {
    const docRef = doc(db, collectionName, id);
    return getDoc(docRef);
};
export const getAllDocuments = (collectionName) => {
    const colRef = collection(db, collectionName);
    return getDocs(colRef);
};

export const updateDocument = (collectionName, id, data) => {
    const docRef = doc(db, collectionName, id);
    return updateDoc(docRef, data);
};

export const fetchDocumentsWithQuery = (collectionName, fieldName, value) => {
    const q = query(collection(db, collectionName), where(fieldName, "==", value));
    return getDocs(q);
};
