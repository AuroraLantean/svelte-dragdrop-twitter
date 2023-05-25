<script>
  //console.log("Calling routes/page!");
  //export let data;
  import Messenger from "@components/utils/Messenger.svelte";
  import GlidePost from "../../components/glides/GlidePost.svelte";
  import { createGlideStore } from "@stores/createGlideStore";
  import CenteredDataLoader from "@components/utils/CenteredDataLoader.svelte";

  const { glides, loading, uiAddPost } = createGlideStore();
</script>

<Messenger uiAddPost={uiAddPost} />

<!-- {JSON.stringify(glides)} -->
<div class="h-px bg-gray-700 my-1" />
{#each $glides as glide (glide.id)}
  <GlidePost {glide} />
{/each}

{#if $loading}
  <CenteredDataLoader />
{/if}