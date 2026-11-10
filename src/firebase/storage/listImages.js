import { cache } from "react";
import firebase_app from "../config";
import { getStorage, ref, listAll, getDownloadURL } from "firebase/storage";

const storage = getStorage(firebase_app);

// Lista los archivos de una carpeta de Storage y devuelve sus URLs de
// descarga reales (con su token correcto), ordenados por nombre de forma
// natural (1, 2, ..., 10). Si algo falla, devuelve [] para no romper la página.
// `cache` evita repetir las peticiones entre generateMetadata y la página.
const listImages = cache(async (folder) => {
  try {
    const { items } = await listAll(ref(storage, folder));
    const sorted = [...items].sort((a, b) =>
      a.name.localeCompare(b.name, undefined, { numeric: true })
    );
    const urls = await Promise.all(
      sorted.map(async (item) => {
        try {
          return { name: item.name, src: await getDownloadURL(item) };
        } catch (error) {
          console.error(`No se pudo obtener la URL de "${item.fullPath}":`, error.message);
          return null;
        }
      })
    );
    return urls.filter(Boolean);
  } catch (error) {
    console.error(`Error listando "${folder}" en Storage:`, error.message);
    return [];
  }
});

export default listImages;
