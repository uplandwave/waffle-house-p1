<script>
  import { onMount } from "svelte";
  let placeName = ""; // Holds the user's input
  let selectedPlaceId = ""; // holds the place id

  // inaturalist api
  const baseUrl = "https://api.inaturalist.org/v1/";

  let placeData = [];
  let placeIdentifications = [];

  let startDate = "";
  let endDate = "";

  async function getPlace(placeName) {
    const placeUrl = `https://api.inaturalist.org/v1/places/autocomplete?q=${encodeURIComponent(placeName)}`;
    const response = await fetch(placeUrl);
    if (!response.ok) {
      throw new Error(`Error fetching place data: ${response.statusText}`);
    }
    return response.json();
  }

  async function getIdentificationsByPlaceId(placeId) {
    const params = new URLSearchParams({ place_id: placeId});
    if (startDate) params.append('d1', startDate);
    if (endDate) params.append('d2', endDate);
    
    const placeIdUrl = `https://api.inaturalist.org/v1/identifications?${params}`;
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

  // function to get unique observations based on taxon.name, used for checking which
  // observations to display so duplicates will not be displayed
  function uniqueNames(items) {
    const uniqueNames = new Set();
    return items.filter((item) => {
      const taxonName = item.observation?.taxon?.name;
      if (taxonName && !uniqueNames.has(taxonName)) {
        uniqueNames.add(taxonName);
        return true;
      }
      return false;
    });
  }
</script>

<main>
  <div>
    <!-- user input of place, when search button is clicked api is queried to find places  -->
    <label for="Select Place">Select Place</label>
    <input type="text" name="search" id="search" bind:value={placeName} />
    <button on:click={searchPlace}>Search</button>

  <h3>Specify Place & Dates(opt)</h3>
    <!-- multiple places found, user has date buttons and can select the specific place -->
    <div id="selectDate">
      <label for="startDate">Start Date</label>
      <input type="date" id="startDate" bind:value={startDate} />

      <label for="endDate">Start Date</label>
      <input type="date" id="endDate" bind:value={endDate} />
    </div>
  </div>

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

  <h3>Identifications</h3>
  <section>
    {#if placeIdentifications.length > 0}
      {#each uniqueNames(placeIdentifications) as identification}
        <div id="name-photo">
          <h2>{identification.observation.taxon.name}</h2>
          <img
            src={identification.observation.taxon.default_photo.medium_url}
            alt={identification.observation.species_guess}
          />
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
