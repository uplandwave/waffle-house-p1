<script>
  import { getLocalStorage, setLocalStorage } from "../utils.mjs";
  let newsletterSignedEmail = getLocalStorage("so-newsletter-email");
  let emailValue;
  let invalidMsg = "";

  function submitEmail() {
    // using code from https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement/checkValidity
    const emailEl = document.getElementById("newsletter-email");
    emailValue = emailEl.value;
    const isValid = emailValue ? emailEl.checkValidity() : false;
    if (isValid) {
      newsletterSignedEmail = emailValue;
      emailEl.value = "";
      setLocalStorage("so-newsletter-email", emailValue);
      // here is where you could actually sign them UP for the Newsletter (if they are not already)...
    } else {
      invalidMsg = "Be sure to enter an email!";
      emailEl.value = "";
    }
  }

  function unsubscribe() {
    setLocalStorage("so-newsletter-email", null);
    invalidMsg = "";
    newsletterSignedEmail = null;
    // here is where you could actually sign them OFF the Newsletter...
  }
</script>

<div class="newsletter-sign-up-box">
  {#if !newsletterSignedEmail}
    <h3>Join our Newsletter today!</h3>
    <p>
      If you want up-to-date information about SleepOutside, consider entering
      in your email below to join our Newsletter!
      {#if invalidMsg}
        <br />
        <strong>{invalidMsg}</strong>
      {/if}
    </p>
    <div class="newsletter-email-join">
      <label for="newsletter-email">Email: </label>
      <input type="email" id="newsletter-email" />
      <button on:click={submitEmail}>Join</button>
    </div>
  {:else}
    <h3>Thank you for signing up for the Newsletter!</h3>
    <p>
      Your email: <strong>{newsletterSignedEmail}</strong> is registered.
    </p>
    <button class="unsubscribe-button" on:click={unsubscribe}
      >Unsubscribe</button
    >
  {/if}
</div>

<style>
  button {
    margin: 0;
    font-size: 18px;
    padding: 5px 5px;
  }

  .newsletter-sign-up-box {
    border: solid var(--primary-color) 2px;
    padding: 0 15px 15px 15px;
    width: 75%;
    min-width: 300px;
    margin: 0 auto;
    max-width: 500px;
  }
  .newsletter-email-join {
    display: flex;
    width: min-content;
    margin: 0 auto;
    align-items: center;
    gap: 10px;
  }
  .unsubscribe-button {
    margin: 0 auto;
  }

  #newsletter-email {
    height: 30px;
  }
</style>
