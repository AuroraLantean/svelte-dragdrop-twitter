import { authenticate } from "@api/auth";
import { writable } from "svelte/store";

//contains authentication state for login and register
export function createAuthStore(authType) {
  const loading = writable(false);

  async function authUser(form) {
    loading.set(true);
    try {
      await authenticate(form, authType);
    } catch (err) {
      console.log(err.message);
      loading.set(false);
    }
    // const firebaseUser = await authenticate(form, authType);
    // console.log("createAuthStore/authUser() => firebaseUser:", firebaseUser);
    // return firebaseUser;
  }

  return {
    authUser,
    loading: { subscribe: loading.subscribe }
  };
}
