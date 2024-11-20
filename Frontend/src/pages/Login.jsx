import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import facade from '../utils/apiFacade';
import '../assets/login.css';
import lockIcon from '../assets/icon/lock.png';

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
    <div className="login-container">
      <div className="login-form-wrapper">
        <div className="avatar-container">
          <div className="avatar">
            <img src={lockIcon} alt="Lock icon" className="icon" />
          </div>
        </div>
        <h2 className="login-title">Log In</h2>

        <form onSubmit={performLogin}>
          <div className="input-group">
            <input
              className="input-field"
              placeholder="Email *"
              type="email"
              id="username"
              value={loginCredentials.username}
              onChange={handleValidation}
              required
            />
            {errors.username && <span className="error-message">{errors.username}</span>}
          </div>

          <div className="input-group" style={{ position: "relative" }}>
            <input
              className="input-field"
              placeholder="Password *"
              type="password"
              id="password"
              minLength="8"
              value={loginCredentials.password}
              onChange={handleValidation}
              required
            />
            {errors.password && <span className="error-message">{errors.password}</span>}
          </div>

          <div className="checkbox-group">
            <input type="checkbox" id="remember-me" />
            <label htmlFor="remember-me" className="remember-label">Remember Me</label>
          </div>

          <button className="button" type="submit">Log In</button>

          {errors.login && <span className="error-message">{errors.login}</span>}

          <div className="link-group">
            <button type="button" className="link-button">Forgot Password?</button>
            <button type="button" className="link-button">Don't have an account?</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
