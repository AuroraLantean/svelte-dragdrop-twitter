<script>
  import { beforeUpdate, afterUpdate, onMount, onDestroy } from "svelte";
  import Portal from "./Portal.svelte";
  import { clickOutside } from "@actions/clickOutside";
  import { logoutUser } from "@api/auth";

  let isOpen = false;
  let openerMenu;
  let popupBottomPosition;
  let popupLeftPosition;
  let popup;

  onMount(() => {
    //console.log("Mount has been called!");
    //addEventListener("click", closePopup);
    addEventListener("resize", adjustPopup);
    return () => {
      //console.log("destroy from onMount called!");
      //removeEventListener("click", closePopup);
      removeEventListener("resize", adjustPopup);
    };
  });
  /*onDestroy(() => {
    console.log("onDestroy called on server");
    //removeEventListener("click", closePopup);
  });
  beforeUpdate(() => {
    console.log("before update called!");
  });*/
  afterUpdate(() => {
    //console.log("after update called!");
    adjustPopup();
  });

  function adjustPopup() {
    if (isOpen) {
      const position = openerMenu.getBoundingClientRect();
      popupBottomPosition = openerMenu.clientHeight + "px";
      popupLeftPosition = position.left + "px";
    }
  }

  /* see clickOutside()
  function closePopup(e) {
    console.log("closePopup CALLLED!"); //e.target
    //should be called when the popup is open and not clicked on itself!
    if (isOpen && !isPopupClicked(e.target)) isOpen = false;
  }
  function isPopupClicked(targetElement) {
    return popup.contains(targetElement);
  }*/

  async function logout() {
    await logoutUser();
    //window.location.reload();
  }
</script>

<div class="flex-it">
  <div bind:this={openerMenu} class="flex-it">
    <button
      on:click|stopPropagation={() => {
        isOpen = !isOpen;
      }}
    >
      <slot />
    </button>
  </div>
  {#if isOpen}
    <Portal>
      <div
        on:outclick={() => {
          isOpen = false;
        }}
        use:clickOutside
        bind:this={popup}
        style="bottom: {popupBottomPosition}; left: {popupLeftPosition}"
        class="flex-it hover:cursor-pointer fixed bg-gray-800 text-white popup z-10 rounded-2xl border-gray-700 border transition duration-1000"
      >
        <div class="w-72 min-w-68 max-h-120 min-h-8 flex-it overflow-auto">
          <div class="flex-it flex-grow flex-shrink py-3">
            <button
              on:click={logout}
              class="flex-it items-start px-4 py-3 transition hover:bg-gray-700"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </Portal>
  {/if}
</div>
