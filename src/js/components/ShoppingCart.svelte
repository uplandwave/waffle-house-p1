<script>
  import { getLocalStorage, updateCartIcon, setLocalStorage } from "../utils.mjs";
  import CartItem from "./CartItem.svelte";

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

    // update the cart icon
    updateCartIcon();
  }
</script>

<ul>
  {#each cartList as item}
    <CartItem {item} on:itemDeleted={removeFromCart}></CartItem>
  {/each}
</ul>
