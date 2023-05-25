import { db } from "@db/index";
import { Timestamp, doc, collection, addDoc } from "firebase/firestore";

async function dbAddPost(glideData) {
  const userRef = doc(db, "users", glideData.uid);

  const glide = {
    ...glideData,
    user: userRef,
    likesCount: 0,
    subglidesCount: 0,
    date: Timestamp.now()
  };

  console.log("dbAddPost: new glide =", glide);
  const glideCollection = collection(db, "glides");
  const addedDoc = await addDoc(glideCollection, glide);

  return { ...glide, id: addedDoc.id };
}

export { dbAddPost };
