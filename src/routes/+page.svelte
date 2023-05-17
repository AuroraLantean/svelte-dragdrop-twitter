<script>
  console.log("Calling routes/page!");
  export let data;
</script>

<h1 class="text-3xl font-bold underline text-red-400">
  Hello world!
  <div>
    {data.test1} - {data.test2}
  </div>
</h1>

<style lang="postcss">
  :global(html) {
    background-color: theme(colors.gray.100);
  }
</style>