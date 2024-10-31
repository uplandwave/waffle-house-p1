<script>
  import PlaceSearchForm from './lib/PlaceSearchForm.svelte';
  import IdentificationList from './lib/IdentificationList.svelte';
  import { fetchPlaces, fetchIdentifications } from './lib/api.js';

  let identifications = [];

  async function handleSearch(event) {
    const query = event.detail.query;
    const places = await fetchPlaces(query);

    if (places.length) {
      identifications = await fetchIdentifications(places[0].id);
    } else {
      identifications = [];
    }
  }
</script>

<main>
  <h1>iNaturalist Form</h1>
  <PlaceSearchForm on:search="{handleSearch}" /> 
  <IdentificationList identifications="{identifications}" />
</main>

<style>
  main {
    padding: 1rem;
    max-width: 1200px;
    margin: auto;
    text-align: center;
  }
  h1 {
    margin-bottom: 1rem;
  }
</style>

