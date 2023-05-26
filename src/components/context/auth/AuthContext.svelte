<script>
  import { onMount, setContext } from "svelte";
  import { writable } from "svelte/store";
  import { key } from ".";
  import Loader from "@components/utils/Loader.svelte";
  import { onAuthStateChanged } from "firebase/auth";
  import { firebaseAuth } from "@db/index";
  import { getUser } from "@api/users";

  let isLoading = writable(true);
  let auth = writable({
    isAuthenticated: false,
    user: null
  });
  /*let isAuthenticated = writable(false, (set) => {
    setTimeout(() => {
      set(false); // isAuthenticated setter
      isLoading.set(false);//OR $isLoading = false;
    }, 1000);
  });*/

  setContext(key, {
    auth,
    isLoading
  });
  
  onMount(listenToAuthChanges);

  function listenToAuthChanges() {
    onAuthStateChanged(firebaseAuth, async (user) => {
      if (user) {
        const gliderUser = await getUser(user.uid);
        //console.log(gliderUser);
        auth.set({isAuthenticated: true, user: gliderUser});
      } else {
        // user is null
        auth.set({ isAuthenticated: false, user: null });
      }
      isLoading.set(false);
    });
  }
</script>

<!-- Just to subscribe so start function can be called 
<div style="display:none;">
  {$isAuthenticated}
</div>-->

<!-- && !$isAuthenticated -->
{#if $isLoading}
  <Loader size={150} />
{:else}
  <slot />
{/if}
