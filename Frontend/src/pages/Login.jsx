import React, { useState } from "react";
import facade from '../utils/apiFacade';
import '../assets/login.css';
import lockIcon from '../assets/icon/lock.png';


function LoginPage({ onLogin }) {
  const init = { username: "", password: "" };
  const [loginCredentials, setLoginCredentials] = useState(init);
  const [errors, setErrors] = useState({ email: "", password: "", login: "" });

  const performLogin = (evt) => {
    evt.preventDefault();
    console.log("Login button clicked"); // For at sikre, at funktionen bliver kaldt
    if (errors.email || errors.password) {
      console.log("Validation error:", errors);
      return;
    }

    facade.login(loginCredentials.username, loginCredentials.password)
      .then(() => {
        console.log("Login successful");
        setErrors({ ...errors, login: "" });
        onLogin();
      })
      .catch(() => {
        console.log("Login failed");
        setErrors({ ...errors, login: "Login failed. Please check your credentials." });
      });
  };

  const handleValidation = (evt) => {
    const { id, value } = evt.target;
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (id === "username" && !emailPattern.test(value)) {
      setErrors((prevErrors) => ({ ...prevErrors, email: "Email must be a valid email" }));
    } else if (id === "password" && value.length < 8) {
      setErrors((prevErrors) => ({ ...prevErrors, password: "Password must be at least 8 characters" }));
    } else {
      setErrors((prevErrors) => ({ ...prevErrors, [id]: "" }));
    }

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
              required
              id="username"
              value={loginCredentials.username}
              onChange={handleValidation}
            />
            {errors.email && <span className="error-message">{errors.email}</span>}
          </div>

          <div className="input-group" style={{ position: "relative" }}>
            <input
              className="input-field"
              placeholder="Password *"
              type="password"
              required
              id="password"
              minLength="8"
              value={loginCredentials.password}
              onChange={handleValidation}
            />
            {errors.password && <span className="error-message">{errors.password}</span>}
          </div>

          <div className="checkbox-group">
            <input type="checkbox" id="remember-me" />
            <label htmlFor="remember-me" className="remember-label">Remember Me</label>
          </div>

          <button className="button" type="submit">Log In</button>
          {errors.login && <span className="error-message">{errors.login}</span>}

          <button className="link-button">Forgot Password?</button>
          <button className="link-button">Don't have an account?</button>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
