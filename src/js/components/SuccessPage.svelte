<script>
    // Function to generate random colors for confetti pieces
    function getRandomColor() {
      const colors = ["#FF5A5F", "#FFB400", "#007A87", "#8CE071", "#FFAA91"];
      return colors[Math.floor(Math.random() * colors.length)];
    }
  
    // Creates confetti pieces
    let confetti = Array.from({ length: 30 }, (_, i) => ({
      id: i,
      color: getRandomColor(),
      size: Math.random() * 6 + 4,
      left: Math.random() * 100 + "vw",
      animationDelay: Math.random() * 1 + "s",
      animationDuration: Math.random() * 2 + 2 + "s"
    }));

    // Summary data for the order
    import { getLocalStorage, getCartTotal } from "../utils.mjs";
    let cartList = getLocalStorage("so-cart") || [];

    let orderSummary = {
        total: getCartTotal(),
        itemsTotal: cartList.length,
        items: cartList,
    };

    let tax = 0;
    let shipping = 0;
    let orderTotal = 0;

    const calculateOrderTotal = function () {
        shipping = 10 + (cartList.length - 1) * 2;
        tax = parseFloat((orderSummary.total * 0.06).toFixed(2));
        orderTotal = parseFloat((orderSummary.total + shipping + tax).toFixed(2));
    };

    calculateOrderTotal();

  </script>
  
  <div class="confetti-container">
    {#each confetti as piece (piece.id)}
      <div
        class="confetti-piece"
        style="
          --color: {piece.color};
          --size: {piece.size}px;
          --left: {piece.left};
          --animation-delay: {piece.animationDelay};
          --animation-duration: {piece.animationDuration};
        "
      ></div>
    {/each}
  </div>
  
  <div class="success-message">
    <h2>Thank you for your order!</h2>
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
            <div>Subtotal: ${orderSummary.total.toFixed(2)}</div>
            <div>Tax: ${tax.toFixed(2)}</div>
            <div>Shipping: ${shipping.toFixed(2)}</div>
            <div>Total: ${orderTotal.toFixed(2)}</div>
        </div>
    <div class="estimated-delivery">Your order should be on your doorstep in 2 days!</div>
  </div>
  
  <style>
    .confetti-container {
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      pointer-events: none;
      overflow: hidden;
    }
  
    .confetti-piece {
      position: absolute;
      width: var(--size);
      height: var(--size);
      background-color: var(--color);
      opacity: 0.8;
      border-radius: 50%;
      left: var(--left);
      animation: fall var(--animation-duration) linear var(--animation-delay) infinite;
    }
  
    @keyframes fall {
      0% { transform: translateY(0) rotate(0deg); }
      100% { transform: translateY(100vh) rotate(360deg); }
    }
  
    .success-message {
      text-align: center;
      margin-top: 2rem;
    }
  
    .order-summary {
        max-width: 600px;
        margin: 2rem auto;
        padding: 1.5rem;
        background-color: #f8f8f8;
        border-radius: 8px;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    }

    .order-summary h3 {
        margin-top: 0;
        font-size: 1.5rem;
    }

    .order-summary .order-item {
        display: flex;
        justify-content: space-between;
        padding: 0.5rem 0;
        /* border-bottom: #555; */
    }

    .order-summary .estimated-delivery {
        color: #555;
        margin-top: 1rem;
        font-size: 1rem;
    }

    .orderNumbers {
        padding-top: 10px;
        padding-bottom: 20px;
    }

    .orderNumbers div {
        border-bottom: var(--light-grey) 1px solid;
        padding-top: 5px;
    }
    .price {
        padding: 6px;
        background-color: var(--dark-grey);
        color: white;
        font-size: 14px;
        margin-left: auto;
        /* box-shadow: #aaa 2px 2px 4px; */
    }
    .qty {
        padding: 6px;
        background-color: var(--dark-grey);
        color: white;
        font-size: 14px;
        /* box-shadow: #aaa 2px 2px 4px; */
    }
    .order-item-tags {
        display: flex;
        margin-left: auto;
        gap: 5px;
    }
    .order-item-img {
        width: 60px;
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