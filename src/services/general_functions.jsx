import { getFirestore, collection, getDocs } from "firebase/firestore";
import { app } from "../config/firebase";

const db = getFirestore(app);

export const convertTimestamp = (timestamp) => {
  if (!timestamp) return "";
  const date = timestamp.toDate();
  return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
};

export const convertTime = (timestamp) => {
  if (!timestamp) return "";
  const date = timestamp.toDate();
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  return `${hours}:${minutes}`;
};

export let contactInfo = {
  address: "",
  phone: "",
  email: "",
};

let contactInfoPromise;

const fetchContactInfo = async () => {
  try {
    const colRef = collection(db, "contactInfo");
    const colSnap = await getDocs(colRef);

    if (!colSnap.empty) {
      const docSnap = colSnap.docs[0]; // Get the first document
      contactInfo = {
        address: docSnap.data().address,
        phone: docSnap.data().phone,
        email: docSnap.data().email,
      };
    }
  } catch (error) {
    console.error("Error fetching contact info:", error);
  }
};

// Ensures contactInfo is fetched before use
export const ensureContactInfo = async () => {
  if (!contactInfoPromise) {
    contactInfoPromise = fetchContactInfo();
  }
  await contactInfoPromise;
};

export function dateConverter(dateStr) {
  // Split the input date string into components
  const [day, month, year] = dateStr.split("/");

  // Create a new Date object
  const dateObj = new Date(`${year}-${month}-${day}`);

  // Define an array of month names
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  // Get the month name from the month number
  const monthName = monthNames[dateObj.getMonth()];

  // Format the date into the desired string
  const formattedDate = `${monthName} ${day}, ${year}`;

  return formattedDate;
}

// Immediately invoked async function to fetch contact info when the script runs
ensureContactInfo();
