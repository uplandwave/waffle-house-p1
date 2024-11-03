<script>
  import { onMount } from "svelte";
  let placeName = ""; // Holds the user's input
  let selectedPlaceId = ""; // holds the place id

  // inaturalist api
  const baseUrl = "https://api.inaturalist.org/v1/";

  let placeData = [];
  let placeIdentifications = [];

  async function getPlace(placeName) {
    const placeUrl = `https://api.inaturalist.org/v1/places/autocomplete?q=${encodeURIComponent(placeName)}`;
    const response = await fetch(placeUrl);
    if (!response.ok) {
      throw new Error(`Error fetching place data: ${response.statusText}`);
    }
    return response.json();
  }

  async function getIdentificationsByPlaceId(placeId) {
    const placeIdUrl = `https://api.inaturalist.org/v1/identifications?q=${encodeURIComponent(placeId)}`;
    const response = await fetch(placeIdUrl);
    if (!response.ok) {
      throw new Error(`Error fetching place data: ${response.statusText}`);
    }
    return response.json();
  }

  async function searchPlace() {
    try {
      const data = await getPlace(placeName);
      placeData = data.results;
      console.log("Fetched places:", placeData[0].id);
    } catch (error) {
      console.error("Error during search:", error);
    }
  }

  async function selectPlace(placeId) {
    selectedPlaceId = placeId;
    console.log("place id:", selectedPlaceId);
    try {
      // variable to hold what is returned by the api
      const placeIdData = await getIdentificationsByPlaceId(placeId);
      placeIdentifications = placeIdData.results;

      console.log("Fetched observations:", placeIdentifications);
    } catch (error) {
      console.error("Error fetching identifications:", error);
    }
  }
</script>

<main>
  <div>
    <input type="text" name="search" id="search" bind:value={placeName} />
    <button on:click={searchPlace}>Search</button>
  </div>

  <h1>Places</h1>

  <!-- Display fetched place data if available -->
  {#if placeData.length > 0}
    <p>Select a place:</p>
    <ul>
      {#each placeData as place}
        <li>
          <button on:click={() => selectPlace(place.id)}>{place.name}</button>
          <!-- <strong>{place.name}</strong> - ID: {place.id} -->
        </li>
      {/each}
    </ul>
  {/if}

  <h1>Identifications</h1>
  <section>
  {#if placeIdentifications.length > 0}
  {#each placeIdentifications as identification}
  <div id="name-photo">
    <h2>{identification.observation.taxon.name}</h2>
    <img src={identification.observation.taxon.default_photo.medium_url} alt={identification.observation.species_guess}/>
  </div>
  {/each}
  {/if}
</section>
</main>

<style>
  li {
    list-style-type: none;
  }
 img {
  width: 200px;
  height: 200px;
 }
  section {
    display: flex;
    flex-wrap: wrap;
    gap: 25px;
    justify-content: space-around;
  }
</style>
