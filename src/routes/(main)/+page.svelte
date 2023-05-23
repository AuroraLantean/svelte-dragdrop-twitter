<script>
  //console.log("Calling routes/page!");
  //export let data;
  import { onMount } from 'svelte'
  import TiImageOutline from "svelte-icons/ti/TiImageOutline.svelte";
  import GlidePost from "../../components/glides/GlidePost.svelte";

  let glides = [];
  let glideContent = "";
  let glideInput;

  onMount(() => glideInput.focus())

  function createGlide() {
    console.log("CreateGlide:", glideContent);
    const date = new Date();
    const glide = {
      id: date.toISOString(),
      content: glideContent,
      user: {
        nickName: "Filip99",
        avatar: "https://thrangra.sirv.com/Avatar1.png"
      },
      likesCount: 0,
      subglidesCount: 0,
      date
    };
    glides = [glide, ...glides]; //glides.push(glideContent) will not update glides array
    glideContent = "";
  }

  function onEnterKeyUp(event) {
    if (event.key === "Enter") {
      event.preventDefault();
      // By using `preventDefault`, it tells the Browser not to handle the key stroke for its own shortcuts or text input.
      console.log("enter is detected");
      createGlide()
    }
  }
</script>

<!-- Children -->
<!-- HOME PAGE START -->
<!-- {JSON.stringify(glides)} -->

<div class="flex-it py-1 px-4 flex-row">
  <div class="flex-it mr-4">
    <div class="w-12 h-12 overflow-visible cursor-pointer transition duration-200 hover:opacity-80">
      <img
        alt=""
        class="rounded-full"
        src="https://www.pinclipart.com/picdir/middle/133-1331433_free-user-avatar-icons-happy-flat-design-png.png"
      />
    </div>
  </div>
  <!-- MESSENGER START -->
  <div class="flex-it flex-grow">
    <div class="flex-it">
      <textarea
        on:keyup={onEnterKeyUp}
        bind:value={glideContent}
        bind:this={glideInput}
        name="content"
        rows="1"
        id="glide"
        class="bg-transparent resize-none overflow-hidden block !outline-none !border-none border-transparent focus:border-transparent focus:ring-0 text-gray-100 text-xl w-full p-0"
        placeholder={"What's new?"}
      />
    </div>
    <div class="flex-it mb-1 flex-row xs:justify-between items-center">
      <div class="flex-it mt-3 mr-3 cursor-pointer text-white hover:text-blue-400 transition">
        <div class="upload-btn-wrapper">
          <div class="icon">
            <TiImageOutline />
          </div>
          <input type="file" name="myfile" />
        </div>
      </div>
      <div class="flex-it w-32 mt-3 cursor-pointer">
        <button
          on:click={createGlide}
          type="button"
          class="
                        disabled:cursor-not-allowed disabled:bg-gray-400
                        bg-blue-400 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded-full flex-it transition duration-200"
        >
          <div class="flex-it flex-row text-sm font-bold text-white items-start justify-center">
            <span>Glide It</span>
          </div>
        </button>
      </div>
    </div>
  </div>
  <!-- MESSENGER END -->
</div>

<div class="h-px bg-gray-700 my-1" />
{#each glides as glide (glide.id)}
  <GlidePost {glide} />
{/each}

<!-- HOME PAGE END -->
