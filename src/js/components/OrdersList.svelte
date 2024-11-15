<!-- what he has -->

<script>
  import { getOrders } from "../externalServices.mjs";
  import { checkLogin } from "../auth.mjs";
  import { onMount } from "svelte";
  export let token = "";
  let orders = [];
  async function init() {
    try {
      orders = await getOrders(token);
      console.log(orders);
    } catch (err) {
      console.log(err);
    }
  }

  onMount(init);
</script>

<p />
<table>
  <thead>
    <tr>
      <th>Id</th>
      <th>Date</th>
      <th>#Items</th>
      <th>Total</th>
    </tr>
  </thead>

  <tbody class="order-body">
    {#each orders as order}
      <tr>
        <td>{order.id}</td>
        <td>{new Date(order.orderDate).toLocaleDateString("en-US")}</td>
        <td>{order.items ? order.items.length : 0}</td>
        <td>${Number(order.orderTotal).toFixed(2)}</td>
      </tr>
    {/each}
  </tbody>
</table>

<style>
  table {
    text-align: center;
    margin: 0 auto;
  }
  td {
    padding: 0.2em 0;
  }
  tr:nth-child(even) {
    background-color: var(--light-grey);
  }
</style>
