<script>
  let count = 0; // Initialize `count` as a normal variable
  const increment = () => {
    count += 1;
  };
</script>

<button on:click={increment}>
  count is {count}
</button>
