import firebase_app from "../config";
import { getFirestore, collection, addDoc } from "firebase/firestore";

const db = getFirestore(firebase_app);

export default async function addData(collection_name, data) {
  try {
    const docRef = await addDoc(collection(db, collection_name), data);
    return { docRef, error: null };
  } catch (error) {
    console.error("Error creando el documento:", error);
    return { docRef: null, error };
  }
}
