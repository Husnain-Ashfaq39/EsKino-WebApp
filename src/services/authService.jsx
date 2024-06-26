import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut, updateProfile } from "firebase/auth";
import { app } from '../config/firebase'; // Assuming firebaseConfig is exported from the main Firebase initialization file

const auth = getAuth(app);

export async function registerUser(username, email, password) {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    updateProfile(user, {
        displayName: username
    }).then(() => {
    }).catch((error) => {
    });

    localStorage.setItem("authToken", user.accessToken);
    return userCredential;
}

export const signIn = async (email, password) => {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    localStorage.setItem("authToken", userCredential.user.accessToken);
    return userCredential;
};

export const signOutUser = () => {
    localStorage.removeItem("authToken");
    return signOut(auth);
};

export const onAuthChange = (callback) => {
    return onAuthStateChanged(auth, callback);
};

export function getCurrentUser() {
    const user = auth.currentUser;
    if (user) {
        return user; // Returns user object if logged in
    } else {
        return null; // No user is logged in
    }
}
