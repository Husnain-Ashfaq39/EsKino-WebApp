import { db } from './config/firebase'; // Adjust the import according to your project's structure
import { doc, getDoc } from 'firebase/firestore';

const defaultColors = {
  primary: "#f6ebeb",
  secondary: "#ffb9b9",
  tertiary: "#ee7272",
  dark: "#a31818",
  lightBlue: "#97ddf6",
  primaryBlue: "#64D5FF",
  darkBlue: "#2E7DDA",
};

let colors = { ...defaultColors };

const fetchColors = async () => {
  try {
    const docRef = doc(db, "colours", "colorSettings");
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      colors = docSnap.data();
    } else {
      console.log("No color settings found in Firestore. Using default colors.");
    }
  } catch (error) {
    console.error("Error fetching colors from Firebase:", error);
  }
};

await fetchColors();

export default colors;
