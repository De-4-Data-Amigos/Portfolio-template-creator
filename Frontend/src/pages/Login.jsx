import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import facade from '../utils/apiFacade';
import '../assets/login.css';
import Office from "../assets/Office.png";
import lockIcon from '../assets/icon/lock.png';
import "../assets/login.css";


function LoginPage({ onLogin }) {
  const init = { username: "", password: "" };
  const [loginCredentials, setLoginCredentials] = useState(init);
  const [errors, setErrors] = useState({ username: "", password: "", login: "" });
  const navigate = useNavigate();

  const performLogin = (evt) => {
    evt.preventDefault();
    console.log("Login button clicked");

    // Hvis der er fejl, lad ikke brugeren logge ind
    if (errors.username || errors.password) {
      console.log("Validation error:", errors);
      return;
    }

    facade.login(loginCredentials.username, loginCredentials.password)
      .then(() => {
        console.log("Login successful");
        setErrors({ ...errors, login: "" });
        onLogin(); // kald onLogin når login er succesfuldt
        navigate("/");
      })
      .catch((err) => {
        console.log("Login failed", err);
        setErrors({
          ...errors,
          login: "Login failed. Please check your credentials." // Sæt fejlmeddelelse
        });
      });
  };

  const handleValidation = (evt) => {
    const { id, value } = evt.target;
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    // Validering af email
    if (id === "username" && !emailPattern.test(value)) {
      setErrors((prevErrors) => ({ ...prevErrors, username: "Email must be a valid email" }));
    }
    // Validering af password
    else if (id === "password" && value.length < 8) {
      setErrors((prevErrors) => ({ ...prevErrors, password: "Password must be at least 8 characters" }));
    }
    else {
      setErrors((prevErrors) => ({ ...prevErrors, [id]: "" })); // Fjern fejlmeddelelse
    }

    // Opdater login credentials state
    setLoginCredentials({ ...loginCredentials, [id]: value });
  };

  return (
<div class="frontpage" style={{ backgroundImage: `url(${Office})` }}>
  <div class="content-box">
    <h2 class="sub-header"><i></i></h2>

    <form onSubmit="{performLogin}" class="login-form">
      <div class="input-group">
        <h2><p>Login</p></h2>
        <input
          class="input-field"
          placeholder="Email *"
          type="email"
          id="username"
          value=""
          onChange="{handleValidation}"
          required
        />
        <xsl:if test="errors.username">
          <span class="error-message">
            <xsl:value-of select="errors.username" />
          </span>
        </xsl:if>
      </div>

      <div class="input-group">
        <input
          class="input-field"
          placeholder="Password *"
          type="password"
          id="password"
          minLength="8"
          value=""
          onChange="{handleValidation}"
          required
        />
        <xsl:if test="errors.password">
          <span class="error-message">
            <xsl:value-of select="errors.password" />
          </span>
        </xsl:if>
      </div>

      <div class="options-group">
        <div class="checkbox-container">
          <input type="checkbox" id="remember-me" />
          <label for="remember-me">Remember Me</label>
        </div>

        <button class="login-button" type="submit">
          Log In
        </button>
      </div>

      <xsl:if test="errors.login">
        <span class="error-message">
          <xsl:value-of select="errors.login" />
        </span>
      </xsl:if>
    </form>

    <div class="link-group">
      <button type="button" class="login-button">
        Forgot Password?
      </button>
      <button type="button" class="login-button">
        Don't have an account?
      </button>
    </div>
  </div>
</div>


  );
};

export default LoginPage;
