import { get, writable } from "svelte/store";
import { fetchGlides } from "@api/glides";
import { onMount } from "svelte";

const FIRST_PAGE = 1;

export function createGlideStore() {
  const pages = writable({ [FIRST_PAGE]: { glides: [] } });
  const page = writable(FIRST_PAGE); //current page
  //const glides = writable([]);
  const loading = writable(false);

  let lastGlideDoc;
  onMount(loadGlides);

  async function loadGlides() {
    const _page = get(page);
    console.log("Loading page: " + _page);

    if (_page > 1 && !lastGlideDoc) {
      return;
    }
    
    loading.set(true);
    try {
      const { glides, lastGlideDoc: _lastGlideDoc } = await fetchGlides(lastGlideDoc);
      console.log("db glides:", glides);

      if (glides.length > 0) {
        // add new glides to the store if these glides exists
        pages.update((_pages) => ({ ..._pages, [_page]: { glides } })); //{glides} or {glides: glides}
        //console.log("get(pages):", get(pages));
        page.update((_page) => _page + 1);
      }
      lastGlideDoc = _lastGlideDoc;
      //console.log(lastGlideDoc);
    } catch (err) {
      console.log(err.message);
    } finally {
      loading.set(false);
    }
  }

  function uiAddPost(glide) {
    console.log("uiAddPost: glide :" + JSON.stringify(glide));
    pages.update((_pages) => {
      _pages[FIRST_PAGE].glides.unshift(glide);
      return _pages;
    });
    // pages.update(_pages => ({
    //   ..._pages,
    //   [FIRST_PAGE]: {glides: [glide, ..._pages[FIRST_PAGE].glides]}
    // }));

    //glides.update((list) => [glide, ...list]);
  }

  return {
    pages: { subscribe: pages.subscribe },
    //glides: { subscribe: glides.subscribe },
    loading: { subscribe: loading.subscribe },
    uiAddPost,
    loadGlides
  };
}
