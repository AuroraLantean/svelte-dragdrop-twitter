import { writable } from "svelte/store";
import { authenticate } from "@api/auth";
import { getUIContext } from "@components/context/UI";

//contains authentication state for login and register
export function createAuthStore(authType) {
  const { addSnackbar } = getUIContext();
  const loading = writable(false);

  async function authUser(form) {
    loading.set(true);
    try {
      await authenticate(form, authType);
      addSnackbar("Welcome Back!", "success");
    } catch (err) {
      addSnackbar(err.message, "error");
      //console.log(err.message);
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
