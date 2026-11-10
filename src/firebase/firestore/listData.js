import firebase_app from "../config";
import { getFirestore, collection, getDocs } from "firebase/firestore";

const db = getFirestore(firebase_app);

// Devuelve todos los documentos de una colección. Si Firestore falla
// (red, permisos, variables de entorno ausentes) devuelve [] en vez de
// romper el render o el build.
export default async function listData(collection_name) {
  try {
    const querySnapshot = await getDocs(collection(db, collection_name));
    return querySnapshot.docs.map((doc) => doc.data());
  } catch (error) {
    console.error(`Error leyendo la colección "${collection_name}":`, error.message);
    return [];
  }
}
