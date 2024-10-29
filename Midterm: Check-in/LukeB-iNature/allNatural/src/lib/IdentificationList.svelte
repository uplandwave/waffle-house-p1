<script>
    export let identifications = []; 
</script>
  
  <div class="grid">
    {#if identifications.length > 0}
        {#each identifications as identification}
        <div class="card">
            <img src="{identification.image_url}" alt="{identification.name}" />
            <p>{identification.name}</p>
        </div>
        {/each}
    {:else}
    <p>No identifications found yet</p>
  {/if}
  </div>
  
  <style>
    .grid {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr 1fr;;
      gap: 1rem;
      padding: 1rem;
    }
  
    .card {
      border: 1px solid #ddd;
      border-radius: 8px;
      overflow: hidden;
      box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
      text-align: center;
    }
  
    .card img {
      width: 100%;
      height: 150px;
      object-fit: cover;
    }
  
    .card p {
      margin: 0.5rem;
      font-size: 1rem;
      font-weight: bold;
    }
  </style>

  <!-- src/lib/IdentificationList.svelte
<script>
    export let identifications = []; // Array of identifications passed down from App.svelte
  </script>
  
  <div>
    {#if identifications.length > 0}
      <ul>
        {#each identifications as identification}
          <li>
            <img src="{identification.image_url}" alt="{identification.name}" width="100" />
            <p>{identification.name}</p>
          </li>
        {/each}
      </ul>
    {:else}
      <p>No identifications found.</p>
    {/if}
  </div>
  
  <style>
    ul {
      list-style-type: none;
      padding: 0;
    }
    li {
      margin-bottom: 1rem;
    }
    img {
      border-radius: 4px;
    }
  </style> -->
  
  