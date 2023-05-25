import { db } from "@db/index";
import { Timestamp, doc, collection, getDocs, getDoc, query, addDoc, orderBy, limit } from "firebase/firestore";

// const userRef = doc(db, "glide", glide.id);

async function fetchGlides() {
  console.log("fetchGlides()");
  const constraints = [
    orderBy("date", "desc"),
    limit(10)
  ];
  const q = query(collection(db, "glides"), ...constraints);
  const qSnapshot = await getDocs(q);

  const glides = await Promise.all(
    qSnapshot.docs.map(async (doc) => {
      const glide = doc.data();
      const userSnapshot = await getDoc(glide.user);
      glide.user = userSnapshot.data();

      return { ...glide, id: doc.id };
    })
  );

  return { glides };
}

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

export { dbAddPost, fetchGlides };
