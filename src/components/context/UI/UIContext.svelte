
<script>
  import { setContext, onMount } from "svelte";
  import { writable } from "svelte/store";
  import { key } from ".";

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
    isXl,
    isLg,
    //loading
  });

</script>

<svelte:window 
  bind:innerWidth
  bind:innerHeight
/>
<slot />