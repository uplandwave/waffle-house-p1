import { writable } from 'svelte/store';

// Create a writable store with an initial value of `null`
export const selectedProduct = writable(null);
