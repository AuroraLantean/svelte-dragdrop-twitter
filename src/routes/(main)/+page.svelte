<script>
  import Messenger from "@components/utils/Messenger.svelte";
  import { createGlideStore } from "@stores/createGlideStore";
  import PaginatedGlides from "@components/glides/PaginatedGlides.svelte";
  import { pageStore } from "@stores/pageStore";

  const { pages, loading, uiAddPost, loadGlides } = createGlideStore();
  
  pageStore.title.set("Home");
</script>

<Messenger {uiAddPost} />

<!-- {JSON.stringify(glides)} -->
<div class="h-px bg-gray-700 my-1" />

<PaginatedGlides pages={$pages} loading={$loading} loadMoreGlides={loadGlides} />
<!-- {#each $glides as glide (glide.id)}
  <GlidePost {glide} />
{/each} -->

