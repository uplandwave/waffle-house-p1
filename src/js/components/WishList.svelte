<script>
  export let wishList = [];
</script>

<div>
  {#if wishList.length === 0}
    <h1>Your Wish List is empty</h1>
  {:else}
    <ul></ul>
  {/if}
</div>
