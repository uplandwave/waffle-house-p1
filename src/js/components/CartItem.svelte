<script>
  export let item = {};
  export let moveTo = "";
  import { createEventDispatcher } from "svelte";

  const emit = createEventDispatcher();

  function emitDelete() {
    emit("itemDeleted", { Id: item.Id });
  }
  function emitMove() {
    emit("itemMoved", { Id: item.Id, quantity: item.quantity });
  }

  // Updated quantity change handler to handle all quantity changes
  function handleQuantityChange(event) {
    const newQuantity = parseInt(event.target.value) || 1;
    if (newQuantity < 1) {
      event.target.value = 1;
      return;
    }

    emit("quantityChanged", {
      Id: item.Id,
      quantity: newQuantity,
    });
  }

  let itemURL = `../product_pages/index.html?product=${item.Id}`;
</script>

<!-- CartItem.svelte -->
<li class="cart-card divider">
  <a href={itemURL} class="cart-card__image">
    <img src={item.Images.PrimarySmall} alt={item.Name} />
  </a>
  <a href={itemURL}>
    <h2 class="card__name">{item.Name}</h2>
  </a>
  <p class="cart-card__color">{item.Colors[0].ColorName}</p>

  <div class="cart-card__quantity">
    <label for="qty">qty: </label>
    <input
      type="number"
      id="qty"
      value={item.quantity || 1}
      min="1"
      on:change={handleQuantityChange}
      class="quantity-input"
    />
  </div>

  <p class="cart-card__price">${item.FinalPrice}</p>
  <div class="buttons-flex">
    <button class="cart-item-button" data-id={item.Id} on:click={emitDelete}>
      Delete Item
    </button>
    <button class="cart-item-button" data-id={item.Id} on:click={emitMove}>
      Move To {moveTo}
    </button>
  </div>
</li>

<style>
  .buttons-flex {
    grid-column-start: 1;
    grid-column-end: -1;
    display: flex;
    margin: 0 auto;
  }

  /*  Quantity Feature: Styling for quantity input */
  .cart-card__quantity {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .quantity-input {
    width: 60px;
    padding: 4px 8px;
    text-align: center;
    border: 1px solid #ccc;
    border-radius: 4px;
  }

  /* Show number input spinners */
  .quantity-input::-webkit-inner-spin-button,
  .quantity-input::-webkit-outer-spin-button {
    opacity: 1;
    height: 30px;
  }
</style>
