<script>
  import { getLocalStorage, setLocalStorage, getCartTotal } from "../utils.mjs";
  import CartItem from "./CartItem.svelte";
  import { cartCount } from "../stores.mjs";

  let cartList = getLocalStorage("so-cart") || [];
  let wishList = getLocalStorage("so-wish-list") || [];
  let cartTotal = getCartTotal();

  function calculateTotalQuantity(cart) {
    return cart.reduce((total, item) => total + (item.quantity || 1), 0);
  }

  function removeFromCart(e) {
    const itemId = e.detail.Id;
    cartList = cartList.filter((item) => item.Id !== itemId);
    updateCart();
  }
  function removeFromWishList(e) {
    // made by copying + adjusting the above function
    const itemId = e.detail.Id;
    wishList = wishList.filter((item) => item.Id !== itemId);
    updateWishList();
  }

  function handleQuantityChange(e) {
    const { Id, quantity } = e.detail;
    const index = cartList.findIndex((item) => item.Id === Id);
    if (index !== -1) {
      cartList[index].quantity = quantity;
      cartList = [...cartList]; // Trigger Svelte reactivity
      updateCart();
    }
  }
  function handleWishListQuantityChange(e) {
    // made by copying + adjusting the above function
    const { Id, quantity } = e.detail;
    const index = wishList.findIndex((item) => item.Id === Id);
    if (index !== -1) {
      wishList[index].quantity = quantity;
      wishList = [...wishList];
      updateWishList();
    }
  }

  // Moves from wish list to cart
  function moveToCart(e) {
    // made by copying and adjusting function: handleQuantityChange
    const { Id, quantity } = e.detail;
    removeFromWishList({ detail: { Id } });
  }
  // Moves from cart to wish list
  function moveToWishList(e) {
    // made by copying and adjusting function: handleWishListQuantityChange
    const { Id, quantity } = e.detail;
    removeFromCart({ detail: { Id } });
  }

  function updateCart() {
    setLocalStorage("so-cart", cartList);
    cartCount.set(calculateTotalQuantity(cartList));
    cartTotal = getCartTotal();
  }
  function updateWishList() {
    // made by copying + adjusting the above function
    setLocalStorage("so-wish-list", wishList);
  }
</script>

<!-- SHOPING CART -->
<div>
  <h2 class="title">My Cart</h2>
  {#if cartList.length === 0}
    <h1 class="cart-empty-message">Your SleepOutside Cart is Empty</h1>
  {:else}
    <ul>
      {#each cartList as item}
        <CartItem
          {item}
          moveTo={"Wish List"}
          on:itemDeleted={removeFromCart}
          on:quantityChanged={handleQuantityChange}
          on:itemMoved={moveToWishList}
        />
      {/each}
    </ul>

    <p class="cart-total">Total: ${cartTotal.toFixed(2)}</p>
    <a href="/checkout/index.html"><button>Checkout</button></a>
  {/if}
</div>

<!-- WISH LIST -->
<div>
  <h2 class="title">Wish List</h2>
  {#if wishList.length === 0}
    <h1>Your Wish List is Empty</h1>
  {:else}
    <ul>
      {#each wishList as item}
        <CartItem
          {item}
          moveTo={"Cart"}
          on:itemDeleted={removeFromWishList}
          on:quantityChanged={handleWishListQuantityChange}
          on:itemMoved={moveToCart}
        />
      {/each}
    </ul>
  {/if}
</div>

<style>
  .cart-total {
    padding-top: 10px;
    margin-bottom: 0px;
    font-weight: bold;
  }
  .title {
    margin-top: 0;
    margin-bottom: 30px;
  }
</style>
