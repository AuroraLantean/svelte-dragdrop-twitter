import { firebaseAuth, db } from "@db/index";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";

function logoutUser() {
  return signOut(firebaseAuth);
}

async function loginUser(form) {
  const { user } = await signInWithEmailAndPassword(firebaseAuth, form.email, form.password);
  return user;
}

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

function authenticate(form, type) {
  return type === "login" ? loginUser(form) : registerUser(form);
}

export { logoutUser, authenticate };
