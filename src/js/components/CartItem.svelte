<script>
  export let item = {};
  import { createEventDispatcher } from "svelte";
  const emit = createEventDispatcher();
  function emitDelete() {
    emit("itemDeleted", { Id: item.Id });
  }
  let itemURL = `../product_pages/index.html?product=${item.Id}`;
</script>

<li class="cart-card divider">
  <a href={itemURL} class="cart-card__image">
    <img src={item.Image} alt="${item.Name}" />
  </a>
  <a href={itemURL}>
    <h2 class="card__name">{item.Name}</h2>
  </a>
  <p class="cart-card__color">{item.Colors[0].ColorName}</p>
  <p class="cart-card__quantity">qty: 1</p>
  <p class="cart-card__price">${item.FinalPrice}</p>
  <button id="delete-cart-item" data-id={item.Id} on:click={emitDelete}
    >Delete Item</button
  >
</li>
