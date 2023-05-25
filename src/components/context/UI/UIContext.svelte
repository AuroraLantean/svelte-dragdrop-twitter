<script>
  import { setContext, onMount } from "svelte";
  import { writable } from "svelte/store";
  import { key } from ".";

  let snackbars = writable([]);
  /*let snackbars = writable([
    { message: "You have been logged in!", type: "success" },
    { message: "Ooops, something went wrong", type: "error" },
    { message: "Please, verify your profile", type: "warning" }
  ]); */
  function addSnackbar(message, type) {
    snackbars.update((list) => [{ message, type, id: new Date().toISOString() }, ...list]);
  }
  const removeSnackbar = (id) => () => {
    snackbars.update(list => {
      const index = list.findIndex((snackbar) => snackbar.id === id);
      if (index > -1) {
        list.splice(index, 1);
      }
      return list;
    })
  };

  //let documentBody = writable({});
  let isXl = writable(false);
  let isLg = writable(false);
  //let loading = writable(true);
  let innerHeight;
  let innerWidth;

  /*onMount(() => {
    $loading = false;
  })*/

  $: {
    //console.log(innerWidth);
    //console.log(innerHeight);
    $isXl = innerWidth > 1280;
    $isLg = innerWidth > 1024;
  }
  /*onMount(() => {
    console.log("Context was mounted!");
    handleResize();
    addEventListener("resize", handleResize);
    return () => {
      removeEventListener("resize", handleResize);
    }
  })

  function handleResize() {
    $documentBody = getSize();
    //documentBody.set(getSize());
    $isXl = $documentBody.width > 1280;
    $isLg = $documentBody.width > 1024;
  }
  function getSize() {
    return {
      height: document.body.clientHeight,
      width: document.body.clientWidth
    };
  }*/

  setContext(key, {
    //documentBody,
    //loading
    isXl,
    isLg,
    snackbars,
    addSnackbar,
    removeSnackbar
  });
</script>

<svelte:window bind:innerWidth bind:innerHeight />
<slot />
