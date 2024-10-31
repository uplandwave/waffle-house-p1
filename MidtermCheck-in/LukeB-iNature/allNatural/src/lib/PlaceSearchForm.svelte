<script>
  import { createEventDispatcher } from 'svelte';

  let placeQuery = "";
  // Event dispatcher to send data to parent
  const dispatch = createEventDispatcher(); 

  // Form submission handler that dispatches the search event
  function handleSubmit(event) {
    // event.preventDefault();
    dispatch('search', { query: placeQuery }); // Dispatch search event with the query
  }
</script>
          <!-- this part prevents the page from relaoding -->
<form on:submit|preventDefault={handleSubmit}>
  <input type="text" placeholder="Search for a place" bind:value={placeQuery} required />

  <button type="submit">Search</button>
</form>

<style>
  form {
    margin-bottom: 1rem;
  }
  input, button {
    padding: 0.5rem;
    margin-right: 0.5rem;
  }
</style>
