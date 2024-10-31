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

    .grid p {
      justify-content: center;
      grid-column: 1 / -1;
    }
  
    .card {
      border: 1px solid #3a3a3a;
      overflow: hidden;
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

  
  