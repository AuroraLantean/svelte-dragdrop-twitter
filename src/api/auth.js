import { firebaseAuth, db } from "@db/index";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";

async function registerUser(form) {
  console.log("api/auth/registerUser. form:", form);
  const { user: registeredUser } = await createUserWithEmailAndPassword(
    firebaseAuth,
    form.email,
    form.password
  );
  //extract uid from firebase, then use it to construct a full user data, then save such profile into firebase database!
  const user = {
    uid: registeredUser.uid,
    fullName: form.fullName,
    nickName: form.nickName,
    email: form.email,
    avatar: form.avatar,
    followers: [],
    following: [],
    followersCount: 0,
    followingCount: 0
  };

  const userDoc = doc(db, "users", registeredUser.uid);
  await setDoc(userDoc, user);
  return registeredUser;
}

export { registerUser };
