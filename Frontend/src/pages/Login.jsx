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

    if (errors.username || errors.password) {
      console.log("Validation error:", errors);
      return;
    }

    facade.login(loginCredentials.username, loginCredentials.password)
      .then(() => {
        setErrors({ ...errors, login: "" });
        onLogin();
        navigate("/");
      })
      .catch(() => {
        setErrors({
          ...errors,
          login: "Login failed. Please check your credentials."
        });
      });
  };

  const handleValidation = (evt) => {
    const { id, value } = evt.target;
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (id === "username" && !emailPattern.test(value)) {
      setErrors((prevErrors) => ({ ...prevErrors, username: "Email must be a valid email" }));
    } else if (id === "password" && value.length < 8) {
      setErrors((prevErrors) => ({ ...prevErrors, password: "Password must be at least 8 characters" }));
    } else {
      setErrors((prevErrors) => ({ ...prevErrors, [id]: "" }));
    }

    setLoginCredentials({ ...loginCredentials, [id]: value });
  };

  return (
    <div className="frontpage" style={{ backgroundImage: `url(${Office})` }}>
      <div className="content-box">
        <h2 className="sub-header"><i></i></h2>
        <form onSubmit={performLogin} className="login-form">
          
          <div className="input-group">
            <h2 className="login-title">Log in</h2>
          </div>

        <div className="form-container">
          <div className="form-login">
            <img src={lockIcon} alt="Lock icon" className="icon" />
          </div>
        </div>
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

          <div className="input-group">
            <input
              className="input-field"
              placeholder="Password *"
              type="password"
              id="password"
              value={loginCredentials.password}
              onChange={handleValidation}
              required
            />
            {errors.password && <span className="error-message">{errors.password}</span>}
          </div>

          <div className="options-group">
            <div className="checkbox-container">
              <input type="checkbox" id="remember-me" />
              <label htmlFor="remember-me">Remember Me</label>
            </div>

            <button className="login-button" type="submit">
              Log In
            </button>
          </div>


          {errors.login && <span className="error-message">{errors.login}</span>}
        </form>

        <div className="link-group">
    <button
      type="button"
      className="login-button"
      onClick={() => navigate("/registration")}
    >
      Don't have an account?
    </button>
    <button type="button" className="login-button">
      Forgot Password?
    </button>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
