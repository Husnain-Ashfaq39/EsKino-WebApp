import { getFirestore, collection, getDocs } from "firebase/firestore";
import { app } from '../config/firebase';

const db = getFirestore(app);

export const convertTimestamp = (timestamp) => {
    if (!timestamp) return "";
    const date = timestamp.toDate();
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
};

export const convertTime = (timestamp) => {
    if (!timestamp) return "";
    const date = timestamp.toDate();
    let hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    hours = hours ? hours : 12;
    return `${hours}:${minutes} ${ampm}`;
};

export let contactInfo = {
    address: "",
    phone: "",
    email: ""
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
                email: docSnap.data().email
            };
            console.log("Contact info fetched successfully:", contactInfo);
        } else {
            console.log("No documents found in the contactInfo collection!");
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

// Immediately invoked async function to fetch contact info when the script runs
ensureContactInfo();
