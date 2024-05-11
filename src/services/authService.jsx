import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged,updateProfile } from "firebase/auth";
import { doc, getDoc, setDoc} from "firebase/firestore"; // Import Firestore functions and database reference
import { app,db } from '../config/firebase'; // Assuming firebaseConfig is exported from the main Firebase initialization file

const auth = getAuth(app);

export async function registerUser (username,email, password){
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user=userCredential.user;
    updateProfile(user, {
        displayName: username
      }).then(() => {
        // Profile updated successfully
        console.log("Display Name updated to:", user.displayName);
      }).catch((error) => {
        // An error occurred
        console.error("Error updating display name:", error);
      });
    
    return userCredential;
}



export const signIn = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
};

export const signOutUser = () => {
    return signOut(auth);
};

export const onAuthChange = (callback) => {
    return onAuthStateChanged(auth, callback);
};


export function getCurrentUser() {
    const user = auth.currentUser;
    if (user) {
        console.log("Current logged-in user:", user);
        return user; // Returns user object if logged in
    } else {
        console.log("No user is currently logged in.");
        return null; // No user is logged in
    }
}

