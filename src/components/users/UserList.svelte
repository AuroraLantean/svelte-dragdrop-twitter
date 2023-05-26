
<script>
  import { fetchUsers } from "@api/users";
  import CenteredDataLoader from "@components/utils/CenteredDataLoader.svelte";
  import { onMount } from "svelte";
  import UserItem from "./UserItem.svelte";
  import { getAuthContext } from "@components/context/auth";

  const { auth } = getAuthContext();

  let users = [];
  let loading = true;
  onMount(loadUsers);
  async function loadUsers() {
    try {
      users = await fetchUsers($auth.user);
    } catch(e) {
      console.log(e.message);
    } finally {
      loading = false;
    }
  }
</script>

{#if loading}
  <CenteredDataLoader />
{:else if users.length > 0}
  {#each users as user (user.uid)}
    <UserItem {user} />
  {/each}
{/if}