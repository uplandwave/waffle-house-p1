<script>
    export let selectedProduct;
    
    let dialog;
  
    // Open the modal when selectedProduct is set
    $: if (selectedProduct) {
      dialog?.showModal();
    }
  
    // Function to close the dialog and clear the selected product
    function closeQuickView() {
      dialog.close();
      selectedProduct = null;
    }
  </script>
  
  <!-- Dialog to show the quick view of the selected product -->
  <dialog bind:this={dialog} class="modal-content" aria-labelledby="modal-title" aria-modal="true">
    {#if selectedProduct}
      <h2 id="modal-title">{selectedProduct.Brand.Name}</h2>
      <p>Price: {selectedProduct.FinalPrice}</p>
      <button on:click={closeQuickView} aria-label="Close modal">Close</button>
    {/if}
  </dialog>
  
  <style>
    dialog::backdrop {
      background: rgba(0, 0, 0, 0.5);
    }
  
    .modal-content {
      border: none;
      padding: 20px;
      border-radius: 8px;
      background: white;
      max-width: 500px;
      margin: auto;
    }
  </style>
  