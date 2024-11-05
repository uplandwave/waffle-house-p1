<script>
  import { getLocalStorage, setLocalStorage } from "../utils.mjs";
  import CartItem from "./CartItem.svelte";
  import { cartCount } from "../stores.mjs";

  let cartList = getLocalStorage("so-cart") || [];

  function calculateTotalQuantity(cart) {
    return cart.reduce((total, item) => total + (item.quantity || 1), 0);
  }

  function removeFromCart(e) {
    const itemId = e.detail.Id;
    cartList = cartList.filter(item => item.Id !== itemId);
    updateCart();
  }

  function handleQuantityChange(e) {
    const { Id, quantity } = e.detail;
    const index = cartList.findIndex(item => item.Id === Id);
    if (index !== -1) {
      cartList[index].quantity = quantity;
      cartList = [...cartList]; // Trigger Svelte reactivity
      updateCart();
    }
  }

  function updateCart() {
    setLocalStorage("so-cart", cartList);
    cartCount.set(calculateTotalQuantity(cartList));
  }
</script>

{#if cartList.length === 0}
  <h1 class="cart-empty-message">Your SleepOutside Cart is Empty</h1>
{/if}

<ul>
  {#each cartList as item}
    <CartItem 
      {item} 
      on:itemDeleted={removeFromCart}
      on:quantityChanged={handleQuantityChange}
    />
  {/each}
</ul>