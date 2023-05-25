import { writable } from "svelte/store";
import { fetchGlides } from "@api/glides";
import { onMount } from "svelte";

export function createGlideStore() {
  const glides = writable([]);
  const loading = writable(false);

  onMount(loadGlides);

  async function loadGlides() {
    loading.set(true);
    try {
      const { glides: _glides } = await fetchGlides();
      //console.log("db glides:", glides);
      glides.set(_glides);
    } catch (err) {
      console.log(err.message);
    } finally {
      loading.set(false);
    }
  }

  function uiAddPost(glide) {
    console.log("uiAddPost: glide :" + JSON.stringify(glide));
    glides.update((list) => [glide, ...list]);
  }

  return {
    glides: { subscribe: glides.subscribe },
    loading: { subscribe: loading.subscribe },
    uiAddPost
  };
}
