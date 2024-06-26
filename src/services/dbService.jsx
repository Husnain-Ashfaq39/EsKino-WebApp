import {
  getFirestore,
  collection,
  addDoc,
  getDoc,
  getDocs,
  query,
  where,
  updateDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { app } from "../config/firebase"; // Ensure this is correctly imported from your Firebase setup
import moment from "moment";

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
  const q = query(
    collection(db, collectionName),
    where(fieldName, "==", value)
  );
  return getDocs(q);
};

export const deleteDocument = (collectionName, id) => {
  const docRef = doc(db, collectionName, id);
  return deleteDoc(docRef);
};

export const getMeetingStatus = (meeting) => {
  const currentTime = moment();
 
  // Check if endDate and endTime are defined
  if (!meeting.endDate || !meeting.endTime) {
    return "Unknown";
  }

  // Rearrange the date format from DD/MM/YYYY to YYYY-MM-DD
  const [day, month, year] = meeting.endDate.split("/");
  const formattedEndDate = `${year}-${month.padStart(2, "0")}-${day.padStart(
    2,
    "0"
  )}`;

  // Combine formatted endDate and endTime using moment
  const endTime = moment(
    `${formattedEndDate} ${meeting.endTime}`,
    "YYYY-MM-DD hh:mm A"
  );

  if (currentTime.isAfter(endTime)) {
    return "Timeout";
  } else if (meeting.capacity === "0" || meeting.capacity === 0) {
    return "Closed";
  } else {
    return "Active";
  }
};

export const ensureCategoriesInitialized = async () => {
  const categories = [
    { name: "Events" },
    { name: "Our Team" },
    { name: "Function" },
  ];
  const colRef = collection(db, "categories");
  const querySnapshot = await getDocs(colRef);
  if (querySnapshot.empty) {
    const promises = categories.map(category =>
      addDoc(colRef, category)
    );
    await Promise.all(promises);
  }
};

// New function to get a document by a specific field value
export const getDocumentByField = async (collectionName, fieldName, value) => {
  const q = query(
    collection(db, collectionName),
    where(fieldName, "==", value)
  );
  const querySnapshot = await getDocs(q);
  if (!querySnapshot.empty) {
    return querySnapshot.docs[0]; // Assuming you want the first matching document
  }
  return null; // Return null if no matching document is found
};
