// Function to fetch places based on a query string
export async function fetchPlaces(query) {
    const response = await fetch(`https://api.inaturalist.org/v1/places/autocomplete?q=${query}`);
    if (response.ok) {
      const data = await response.json();
      return data.results; // Return the list of places
    } else {
      console.error("Failed to fetch places.");
      return []; // Return an empty array if the fetch fails
    }
  }
  
  // Function to fetch identifications based on a place ID
  export async function fetchIdentifications(placeId) {
    const response = await fetch(`https://api.inaturalist.org/v1/observations?place_id=${placeId}&per_page=10`);
    if (response.ok) {
      const data = await response.json();
      // Format and return each identification's name and image URL
      return data.results.map(observation => ({
        name: observation.species_guess,
        image_url: observation.photos[0]?.url || ""
      }));
    } else {
      console.error("Failed to fetch identifications.");
      return []; // Return an empty array if the fetch fails
    }
  }
  