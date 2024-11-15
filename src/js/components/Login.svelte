<script>
    import { getParam } from "../utils.mjs";
    import { login, isTokenValid, checkLogin} from "../auth.mjs";
    let email = "user1@email.com";
    let password = "";

    // checkLogin();
    
  
  
  async function handleSubmit (event) {
      event.preventDefault();
      console.log("email:", email);
      console.log("password:", password);
      
      const creds = { email, password };
      const redirect = getParam || '/';
      await login(creds, redirect);

    };
  </script>
  
  <form on:submit={handleSubmit}>
    <div id="login-input">
      <div id="user-login">
        <div id="user">
          <label for="email">Email</label>
          <input
            id="email"
            type="text"
            bind:value={email}
            placeholder="Email"
          />
        </div>
  
        <div id="user-password">
          <label for="password">Password</label>
          <input
            id="password"
            type="text"
            bind:value={password}
            placeholder="Password"
          />
        </div>
        <button id="checkoutSubmit" type="submit">Submit</button>
      </div>
    </div>
  </form>
  
  <style>
    /* Center the entire login container */
    #login-input {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 80vh; /* Adjust height as needed */
      background-color: white;
    }
  
    #user {
      display: flex;
      flex-direction: column;
    }
  
    label {
      padding-bottom: 10px;
    }
    #user-password {
      display: flex;
      flex-direction: column;
    }
    /* Style for the login box */
    #user-login {
      background-color: #ffffff;
      padding: 20px;
      border: 2px solid #ccc;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
      width: 500px; /* Adjusted width for a more compact look */
      height: 300px;
      display: flex;
      flex-direction: column;
      justify-content: center; /* Center inputs vertically */
      gap: 26px; /* Space between inputs */
    }
  
    /* Style for the inputs */
    #user-login input {
      width: 100%; /* Takes full width of the #user-login box */
      padding: 10px;
      font-size: 16px;
      border: 1px solid #ccc;
      border-radius: 4px;
      box-sizing: border-box;
    }
  
    #user-login input:focus {
      outline: none;
      border-color: #007bff; /* Optional focus color */
    }
  </style>
  