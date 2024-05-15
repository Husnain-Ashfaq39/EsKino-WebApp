import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { app } from "../config/firebase"; // Make sure firebaseConfig is imported
import { db } from "../config/firebase";
import { deleteObject } from "firebase/storage";
const storage = getStorage(app);

export const uploadFile = (file, path) => {
  const storageRef = ref(storage, path);
  return uploadBytes(storageRef, file).then((snapshot) => {
    return getDownloadURL(snapshot.ref);
  });
};

export const getFileURL = (path) => {
  const storageRef = ref(storage, path);
  return getDownloadURL(storageRef);
};

export const uploadImageToStorage = async (file) => {
  const storageRef = storage.ref();
  const fileRef = storageRef.child(`gallery/${Date.now()}_${file.name}`);
  await fileRef.put(file);
  return fileRef.getDownloadURL();
};

export const addImageToGallery = async (url, category) => {
  const galleryRef = db.collection("blogimages");
  return galleryRef.add({
    url,
    category,
    timestamp: new Date(),
  });
};
export const deleteFileFromStorage = async (filePath) => {
  const fileRef = ref(storage, filePath);
  await deleteObject(fileRef);
};
