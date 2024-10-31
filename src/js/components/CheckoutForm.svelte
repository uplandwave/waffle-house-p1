<script>
  import { createEventDispatcher } from "svelte";
  import { getLocalStorage, formDataToJSON } from "../utils.mjs";

  const baseURL = import.meta.env.VITE_SERVER_URL + "checkout";

  let tax = 0;
  let fname = "";
  let lname = "";
  let street = "";
  let city = "";
  let state = "";
  let zip = "";
  let cardNumber = "";
  let expiration = "";
  let code = "";
  let isFormValid = false;
  const dispatch = createEventDispatcher();

  let cartList = getLocalStorage("so-cart") || [];

  // link our total if we want
  let orderSummary = {
    total: cartList.reduce((total, item) => {
      return (total += item.FinalPrice * (item.qty || 1));
    }, 0),
    itemsTotal: cartList.length,
    items: cartList,
  };

  // calculate the shipping, tax, and orderTotal
  const calculateOrderTotal = function () {
    shipping = 10 + (cartList.length - 1) * 2;
    tax = (orderSummary.total * 0.06).toFixed(2);
    orderTotal = (
      parseFloat(orderSummary.total) +
      parseFloat(shipping) +
      parseFloat(tax)
    ).toFixed(2);
  };

  // Format card number into groups of 4
  function formatCardNumber(event) {
    let input = event.target.value.replace(/\D/g, "");
    input = input.slice(0, 16);
    cardNumber = input.replace(/(\d{4})(?=\d)/g, "$1 ");
  }

  // Format expiration date as MM/YY
  function formatExpirationDate(event) {
    let input = event.target.value.replace(/\D/g, "");
    input = input.slice(0, 4);
    if (input.length > 2) {
      expirationDate = input.slice(0, 2) + "/" + input.slice(2);
    } else {
      expirationDate = input;
    }
  }

  // check if filled out
  function validateForm() {
    isFormValid =
      fname &&
      lname &&
      street &&
      city &&
      state &&
      zip &&
      cardNumber &&
      expiration &&
      code;
  }

  // check form
  $: validateForm();

  function submitForm() {
    if (isFormValid) {
      dispatch("submit", {
        fname,
        lname,
        street,
        city,
        state,
        zip,
        cardNumber,
        expiration,
        code,
      });
    } else {
      alert(" Go put in the right info you goof :P ");
    }
  }

  // takes the items currently stored in the cart (localstorage) and returns them in a simplified form.
  const allItems = function (items) {
    const sumItems = items.map((item) => {
      console.log(items);
      return {
        id: item.Id,
        price: item.FinalPrice,
        name: item.Name,
        quantity: item.qty || 1,
      };
    });
    return sumItems;
  };

  function handleSubmit(e) {
    // build the data object from the calculated fields, the items in the cart, and the information entered into the form
    // remember that the form that was submitted can be found two ways...this or e.target
    // call the checkout method in our externalServices module and send it our data object.
  }
</script>

<div class="checkout-form">
  <h2>Checkout Form</h2>

  <div class="section">
    <h3>Shipping Information</h3>
    <label for="fname">First Name</label>
    <input
      id="fname"
      type="text"
      bind:value={fname}
      placeholder="Enter your first name"
    />

    <label for="lname">Last Name</label>
    <input
      id="lname"
      type="text"
      bind:value={lname}
      placeholder="Enter your last name"
    />

    <label for="street">Street Address</label>
    <input
      id="street"
      type="text"
      bind:value={street}
      placeholder="Enter your street address"
    />

    <label for="city">City</label>
    <input
      id="city"
      type="text"
      bind:value={city}
      placeholder="Enter your city"
    />

    <label for="state">State</label>
    <input
      id="state"
      type="text"
      bind:value={state}
      placeholder="Enter your state"
    />

    <label for="zip">Zip Code</label>
    <input
      id="zip"
      type="text"
      bind:value={zip}
      placeholder="Enter your zip code"
      on:blur={calculateOrderTotal}
    />
  </div>

  <div class="section">
    <h3>Payment Information</h3>
    <label for="cardNumber">Card Number</label>
    <input
      id="cardNumber"
      type="text"
      bind:value={cardNumber}
      placeholder="1234 5678 9012 3456"
      maxlength="16"
      on:input={formatCardNumber}
    />

    <label for="expiration">Expiration Date</label>
    <input
      id="expiration"
      type="text"
      bind:value={expiration}
      placeholder="MM/YY"
      maxlength="5"
      on:input={formatExpirationDate}
    />

    <label for="code">Security Code</label>
    <input
      id="code"
      type="text"
      bind:value={code}
      placeholder="123"
      maxlength="3"
    />
  </div>

  <div class="order-summary">
    <h3>Order Summary</h3>
    {#each orderSummary.items as item}
      <div class="order-item">
        <img
          src={item.Images.PrimarySmall}
          alt={item.NameWithoutBrand}
          class="order-item-img"
        />
        {item.NameWithoutBrand}
        <div class="order-item-tags">
          <span class="price">${item.FinalPrice.toFixed(2)}</span>
          <span class="qty">x {item.qty || 1}</span>
        </div>
      </div>
    {/each}
    <div><strong>Total: ${orderSummary.total.toFixed(2) + tax}</strong></div>
  </div>

  <button
    on:click={submitForm}
    on:submit|preventDefault={submitHandler}
    disabled={!isFormValid}
  >
    Submit
  </button>
</div>

<style>
  .checkout-form {
    max-width: 500px;
    margin: 0 auto;
    padding: 20px;
    border: 1px solid #ddd;
    border-radius: 5px;
  }
  .checkout-form h2 {
    text-align: center;
    margin-bottom: 20px;
  }
  .checkout-form .section {
    margin-bottom: 20px;
  }
  .checkout-form label {
    display: block;
    margin-bottom: 5px;
  }
  .checkout-form input {
    width: 100%;
    padding: 8px;
    margin-bottom: 15px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
  .order-summary {
    margin-top: 20px;
    padding: 10px;
    border-top: 1px solid #ddd;
  }
  .price {
    padding: 5px;
    /* border-radius: 20px; */
    background-color: var(--dark-grey);
    color: white;
    font-size: x-small;
    margin-left: auto;
    box-shadow: #aaa 2px 2px 4px;
  }
  .qty {
    padding: 5px;
    /* border-radius: 20px; */
    background-color: var(--dark-grey);
    color: white;
    font-size: x-small;
    box-shadow: #aaa 2px 2px 4px;
  }
  .order-item-tags {
    display: flex;
    margin-left: auto;
    gap: 5px;
  }
  .order-item-img {
    width: 30px;
  }
  .order-item {
    border-bottom: var(--light-grey) 1px solid;
    padding-bottom: 7px;
    display: flex;
    align-items: center;
    gap: 10px;
    margin: 10px 0;
  }
</style>
