<script>
  import { onMount } from "svelte";
  import { getAuthContext } from "@components/context/auth";
  import { getUIContext } from "@components/context/UI";
  import TiImageOutline from "svelte-icons/ti/TiImageOutline.svelte";
  import { dbAddPost } from "@api/glides";

  export let uiAddPost;

  const { auth } = getAuthContext();
  $: user = $auth?.user;
  $: btnDisabled = loading || form.content === "";

  const { addSnackbar } = getUIContext();
  let form = { content: "" };
  let loading = false;
  let glideInput;
  onMount(() => glideInput.focus());

  async function submitGlide() {
    console.log("submitGlide()");
    loading = true;

    let mesg = form.content;
    if (mesg.slice(-1) === "\n") {
      mesg = mesg.slice(0, -1);
    }
    // Making request to store the glide to FS
    const glideData = {
      ...form,
      content: mesg,
      uid: user.uid
    };
    /*await new Promise((res) => {
      setTimeout(() => {
        res(true);
      }, 1000);
    });*/

    try {
      const glide = await dbAddPost(glideData);
      console.log("Messenger/glide:", glide);

      const userData = {
        nickName: user.nickName,
        avatar: user.avatar
      };
      uiAddPost({...glide, user: userData });
      addSnackbar("Glide Created!", "success");
      form.content = "";
    } catch (e) {
      addSnackbar(e.message, "error");
    } finally {
      loading = false;
    }
  }
  /**
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
  */
  async function onEnterKeyUp(event) {
    if (event.key === "Enter") {
      event.preventDefault();
      // By using `preventDefault`, it tells the Browser not to handle the key stroke for its own shortcuts or text input.
      console.log("enter is detected");
      await submitGlide();
    }
  }
</script>

<div class="flex-it py-1 px-4 flex-row">
  <div class="flex-it mr-4">
    <div class="w-12 h-12 overflow-visible cursor-pointer transition duration-200 hover:opacity-80">
      <img alt="" class="rounded-full" src={user?.avatar} />
    </div>
  </div>

  <div class="flex-it flex-grow">
    <div class="flex-it">
      <textarea
        bind:value={form.content}
        on:keyup={onEnterKeyUp}
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
          on:click={submitGlide}
          disabled={btnDisabled}
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
</div>
