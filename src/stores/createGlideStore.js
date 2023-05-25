import { writable } from "svelte/store";

export function createGlideStore() {
  const glides = writable([]);

  function uiAddPost(glide) {
    console.log("uiAddPost: glide :" + JSON.stringify(glide));
    glides.update(list => [glide, ...list]);
  }

  return {
    glides: { subscribe: glides.subscribe },
    uiAddPost
  };
}
