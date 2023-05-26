import { db } from "@db/index";
import { Timestamp, doc, collection, getDocs, getDoc, query, addDoc, orderBy, limit, startAfter } from "firebase/firestore";

// const userRef = doc(db, "glide", glide.id);

async function fetchGlides(lastGlideDoc) {
  console.log("fetchGlides()");
  const constraints = [
    orderBy("date", "desc"),
    limit(10)
  ];
  console.log("lastGlideDoc:", lastGlideDoc, ", LastGlideDoc id: " + lastGlideDoc?.id);
  if (lastGlideDoc) {//but the lastGlideDoc from the last page is also undefined => check page > 1 at createGlideStore/loadGlide()
    constraints.push(startAfter(lastGlideDoc));
  }

  const q = query(collection(db, "glides"), ...constraints);
  const qSnapshot = await getDocs(q);

  const _lastGlideDoc = qSnapshot.docs[qSnapshot.docs.length - 1];
  const glides = await Promise.all(
    qSnapshot.docs.map(async (doc) => {
      const glide = doc.data();
      const userSnapshot = await getDoc(glide.user);
      glide.user = userSnapshot.data();

      return { ...glide, id: doc.id };
    })
  );

  return { glides, lastGlideDoc: _lastGlideDoc };
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
