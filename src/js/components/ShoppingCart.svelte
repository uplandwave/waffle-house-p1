<script>
  import { getLocalStorage, getCartCount, setLocalStorage } from "../utils.mjs";
  import CartItem from "./CartItem.svelte";
  import { cartCount } from "../stores.mjs"; // this is how we are linking it to our active cart data

  let cartList = getLocalStorage("so-cart");

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
  };
</script>

<ul>
  {#each cartList as item}
    <CartItem {item} on:itemDeleted={removeFromCart}></CartItem>
  {/each}
</ul>
