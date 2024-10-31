<script>
  import { getLocalStorage, getCartCount, setLocalStorage } from "../utils.mjs";
  import CartItem from "./CartItem.svelte";
  import { cartCount } from "../stores.mjs"; // this is how we are linking it to our active cart data

  let cartList = getLocalStorage("so-cart") || [];
  $: cartTotal = cartList.reduce((total, item) => {
    return (total += item.FinalPrice * (item.qty || 1));
  }, 0);

  function removeFromCart(e) {
    const itemId = e.detail.Id;
    // find the index of the first item with the specified id
    const index = cartList.findIndex((item) => item.Id === itemId);
    // if the item is found, remove only that instance
    if (index !== -1) {
      cartList.splice(index, 1);
    }
    cartList = [...cartList];
    // update local storage
    setLocalStorage("so-cart", cartList);
    // updates the cart icon when you remove an item
    cartCount.set(cartList.length);
  }
</script>

{#if cartList.length === 0}
  <h1 class="cart-empty-message">Your SleepOutside Cart is Empty</h1>
{:else}
  <div>
    <ul>
      {#each cartList as item}
        <CartItem {item} on:itemDeleted={removeFromCart}></CartItem>
      {/each}
    </ul>
    <p class="cart-total">Total: ${cartTotal?.toFixed(2)}</p>
    <a href="/checkout/index.html"><button id="checkOut">Check Out</button></a>
  </div>
{/if}
