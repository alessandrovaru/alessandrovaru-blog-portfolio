import firebase_app from "../config";
import { getFirestore } from "firebase/firestore";

import { collection, getDocs } from "firebase/firestore"; 


const db = getFirestore(firebase_app)

export default async function listData(collection_name) {
  const querySnapshot = await getDocs(collection(db, collection_name));
  let items = [];
  querySnapshot.forEach((doc) => {
    items.push(doc.data())
  });
  return items;
}

