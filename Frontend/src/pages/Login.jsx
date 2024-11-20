import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import facade from '../utils/apiFacade';
import '../assets/login.css';
import Office from "../assets/Office.png";
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
    <div className="frontpage" style={{ backgroundImage: `url(${Office})` }}>
      <div className="content-box">
        <h2 className="sub-header"><i></i></h2>

        <form onSubmit={performLogin} className="login-form">
          <div className="input-group">
            <h2><p>Login</p></h2>
            <input
              className="input-field"
              placeholder="Email *"
              type="email"
              id="username"
              value={loginCredentials.username}
              onChange={handleValidation}
              required
            />
            {errors.username && (
              <span className="error-message">{errors.username}</span>
            )}
          </div>

          <div className="input-group">
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
            {errors.password && (
              <span className="error-message">{errors.password}</span>
            )}
          </div>


          <div
            className="checkbox-group"
            style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', width: '300px', marginRight: '40px' }}>
            <input type="checkbox" id="remember-me" style={{ marginRight: '5px' }}  
            />
            <label htmlFor="remember-me" style={{ fontSize: '16px', marginRight: '70px' }}>
              Remember Me
            </label>
          </div>

          <button className="login-button" type="submit">
            Log In
          </button>
          {errors.login && <span className="error-message">{errors.login}</span>}
        </form>

        <div className="link-group">
          <button type="button" className="login-button">
            Forgot Password?
          </button>
          <button type="button" className="login-button">
            Don't have an account?
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
