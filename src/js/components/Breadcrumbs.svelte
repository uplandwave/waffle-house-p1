<script>
  /*
  This will display breadcrumbs according to the `crumbs` prop.
  They will be seperated by an arrow -> .

  PROP: crumbs
    type: array of objects
      object attributes:
        - text     // what is shown
        - href     // the href of the link. no link if false or left out.
  */
  export let crumbs = [];
</script>

<div>
  {#each crumbs as crumb, i}
    {#if crumb.href}
      <!-- with link -->
      <a href={crumb.href}>
        {crumb.text}
      </a>
    {:else}
      <!-- no link -->
      <span> {crumb.text} </span>
    {/if}

    <!-- the arrow -> -->
    {#if i !== crumbs.length - 1}
      <!-- using code from https://www.w3schools.com/html/html_entities.asp -->
      <span class="arrow">-&gt;</span>
    {/if}
  {/each}
</div>

<style>
  div {
    display: flex;
    gap: 5px;
    margin-top: 9px;
    margin-left: 9px;
    font-size: small;
  }
  div a,
  div span {
    color: #656565;
  }
  .arrow {
    font-family: monospace;
  }
</style>
