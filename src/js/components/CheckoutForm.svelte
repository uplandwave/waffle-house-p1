<script>
  import { createEventDispatcher } from "svelte";
  import { getLocalStorage, alertMessage, getCartTotal } from "../utils.mjs";
  import { checkout } from "../externalServices.mjs";

  const baseURL = import.meta.env.VITE_SERVER_URL + "checkout";

  let tax = 0;
  let shipping = 0;
  let itemTotal = 0;
  let orderTotal = 0;

  let fname = "";
  let lname = "";
  let street = "";
  let city = "";
  let state = "";
  let zip = "";
  // let cardNumber = "1234123412341234";
  let cardNumber = "12343232123434543"; //this value throws and error
  let expiration = "12/25";
  let code = "123";
  let isFormValid = false;
  const dispatch = createEventDispatcher();

  let cartList = getLocalStorage("so-cart") || [];

  // link our total if we want
  let orderSummary = {
    total: getCartTotal(),
    itemsTotal: cartList.length,
    items: cartList,
  };

  // calculate the shipping, tax, and orderTotal
  const calculateOrderTotal = function () {
    shipping = 10 + (cartList.length - 1) * 2;
    tax = parseFloat((orderSummary.total * 0.06).toFixed(2));
    orderTotal = parseFloat((orderSummary.total + shipping + tax).toFixed(2));
  };

  calculateOrderTotal();

  // Format card number into groups of 4
  function formatCardNumber(event) {
    let input = event.target.value.replace(/\D/g, ""); // Remove all non-digit characters
    if (input.length > 16) input = input.slice(0, 16); // Limit to 16 digits
    cardNumber = input.replace(/(\d{4})(?=\d)/g, "$1 ");
  }

  function formatExpirationDate(event) {
    let input = event.target.value.replace(/\D/g, "");
    input = input.slice(0, 4);
    expiration =
      input.length > 2 ? `${input.slice(0, 2)}/${input.slice(2)}` : input;
  }

  function validateForm() {
    // Basic checks for each field
    const isCardNumberValid = true;
    const isExpirationValid = true;
    const isCodeValid = code.length === 3;

    isFormValid =
      fname.trim() &&
      lname.trim() &&
      street.trim() &&
      city.trim() &&
      state.trim() &&
      zip.trim() &&
      isCardNumberValid &&
      isExpirationValid &&
      isCodeValid;

    // Debugging output to check each condition
    console.log("Validation States:", {
      fname,
      lname,
      street,
      city,
      state,
      zip,
      cardNumber,
      expiration,
      code,
      isCardNumberValid,
      isExpirationValid,
      isCodeValid,
      isFormValid,
    });
  }

  // Reactive validation
  $: validateForm();

  // transform the current cart contents to a simpler format keeping just the things we need to send to checkout
  const packageItems = function (items) {
    const simplifiedItems = items.map((item) => {
      console.log(item);
      return {
        id: item.Id,
        price: item.FinalPrice,
        name: item.Name,
        quantity: item.quantity || 1,
      };
    });
    return simplifiedItems;
  };

  async function handleSubmit(event) {
    event.preventDefault();
    validateForm();

    if (!isFormValid) {
      alert("Please fill out all required fields.");
      return;
    }

    const json = {
      fname,
      lname,
      street, // Separate fields for each address part
      city,
      state,
      zip,
      cardNumber: cardNumber.replace(/\s/g, ""), // Ensure 16-digit card number without spaces
      expiration, // the expected format of the date is mm/yy, it will not work without the slash
      code,
      orderDate: new Date().toISOString(), // Format as ISO string for compatibility
      orderTotal,
      tax,
      shipping,
      items: packageItems(cartList), // Use packageItems for simplified cart items
    };

    console.log("Submitting order with payload:", json); // Debugging payload

    try {
      const response = await checkout(json);
      console.log("Order submitted successfully:", response);
      location.assign("/checkout/success.html");
    } catch (error) {
      console.error("Order submission failed:", error);
      for (let message in error.message) {
        alertMessage(error.message[message]);
      }
    }
  }
</script>

<form name="checkout" on:submit|preventDefault={handleSubmit}>
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
        maxlength="19"
        minlength="19"
        on:input={formatCardNumber}
      />

      <label for="expiration">Expiration Date</label>
      <input
        id="expiration"
        type="text"
        bind:value={expiration}
        placeholder="MM/YY"
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
            <span class="qty">x {item.quantity || 1}</span>
          </div>
        </div>
      {/each}
      <!-- Display the computed totals -->
      <div class="orderNumbers">
        <div><strong>Subtotal: ${orderSummary.total.toFixed(2)}</strong></div>
        <div><strong>Tax: ${tax.toFixed(2)}</strong></div>
        <div><strong>Shipping: ${shipping.toFixed(2)}</strong></div>
        <div><strong>Total: ${orderTotal.toFixed(2)}</strong></div>
      </div>

      <button id="checkoutSubmit" type="submit">Submit</button>
    </div>
  </div>
</form>

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
  .orderNumbers {
    padding-top: 10px;
    padding-bottom: 20px;
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
