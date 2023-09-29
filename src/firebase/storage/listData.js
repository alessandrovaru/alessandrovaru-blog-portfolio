import { getStorage, ref, listAll } from "firebase/storage";

const storage = getStorage();

// Create a reference under which you want to list
const listRef = ref(storage, 'mandalas/mandala-1');

// Find all the prefixes and items.
async function listAllItems() {
  try {
    const result = await listAll(listRef);
    result.prefixes.forEach((folderRef) => {
      // All the prefixes under listRef.
      // You may call listAll() recursively on them.
      alert(folderRef+'folder')
    });
    result.items.forEach((itemRef) => {
      // All the items under listRef.
      alert(itemRef+'item')
    });
    return { result };
  } catch (error) {
    alert(error);
    return { error };
  }
}

export default listAllItems;