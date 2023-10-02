// listData.js
import { getStorage, ref, listAll } from "firebase/storage";

const storage = getStorage();


async function listData() {
  const listRef = ref(storage, `mandalas`);
  try {
    const res = await listAll(listRef);
    const items = res.items.map(itemRef => ({ label: itemRef.name, value: itemRef.name }));
    return items;
  } catch (error) {
    console.error("Error fetching items", error);
    return [];
  }
}

export default listData;
