<script>
  export let message = "";
  let isShown = true;
</script>

{#if isShown}
  <div class="alert-conatiner">
    {message}
    <button
      class="alert-x"
      on:click={() => {
        isShown = false;
      }}
    >
      x
    </button>
  </div>
{/if}

<style>
  .alert-conatiner {
    border: var(--primary-color) 1px solid;
    background-color: #ffca9c;
    position: relative;
    padding: 5px;
  }
  .alert-x {
    position: absolute;
    right: 5px;
    top: 2.5px;
    border: none;
    padding: 0;
    background-color: rgba(0, 0, 0, 0);
    color: black;
    width: min-content;
    font-family: monospace;
  }
</style>
