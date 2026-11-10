import { cache } from "react";
import firebase_app from "../config";
import { getFirestore, collection, query, where, limit, getDocs } from "firebase/firestore";

const db = getFirestore(firebase_app);

// Busca un único documento por su campo `slug`. Está envuelto en `cache`
// para que generateMetadata y la página compartan la misma consulta.
const getBySlug = cache(async (collection_name, slug) => {
  try {
    const q = query(collection(db, collection_name), where("slug", "==", slug), limit(1));
    const snapshot = await getDocs(q);
    return snapshot.empty ? null : snapshot.docs[0].data();
  } catch (error) {
    console.error(`Error buscando "${slug}" en "${collection_name}":`, error.message);
    return null;
  }
});

export default getBySlug;
