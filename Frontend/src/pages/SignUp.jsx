import React, { useState } from "react";
import facade from "../utils/apiFacade";
import "../assets/login.css";
import lockIcon from '../assets/icon/lock.png';

function SignPage() {
  const init = { username: "", password: "", role: "user" }; // Rolle er nu hardcoded som 'user'
  const [signupCredentials, setSignupCredentials] = useState(init);
  const [errors, setErrors] = useState({ username: "", password: "", signup: "" });

  const performSignup = async (evt) => {
    evt.preventDefault();
    console.log("Signup button clicked");

    // Tjek om der er fejl i inputfelterne
    if (errors.username || errors.password || !signupCredentials.role) {
      console.log("Validation error:", errors);
      return; // Stoppe udførelsen, hvis der er fejl
    }

    try {
      // Send credentials til backend med rollen som 'user'
      await facade.signup(signupCredentials.username, signupCredentials.password, signupCredentials.role);
      console.log("Signup successful");
      setErrors({ ...errors, signup: "" });
      alert("User created successfully! You can now log in.");
    } catch (err) {
      console.log("Signup failed", err);
      console.log("Full error details:", err.response ? err.response.data : err.message);
      setErrors({ ...errors, signup: `Signup failed: ${err.response ? err.response.data : err.message}` });
    }
  };

  const handleValidation = (evt) => {
    const { id, value } = evt.target;
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (id === "username" && !emailPattern.test(value)) {
      setErrors((prevErrors) => ({ ...prevErrors, email: "Email must be valid." }));
    } else if (id === "password" && value.length < 8) {
      setErrors((prevErrors) => ({ ...prevErrors, password: "Password must be at least 8 characters long." }));
    } else {
      setErrors((prevErrors) => ({ ...prevErrors, [id]: "" }));
    }

    setSignupCredentials({ ...signupCredentials, [id]: value });
  };

  return (
    <div className="login-container">
      <div className="login-form-wrapper">
        <div className="avatar-container">
          <div className="avatar">
            <img src={lockIcon} alt="Lock icon" className="icon" />
          </div>
        </div>
        <h2 className="login-title">Sign Up</h2>

        <form onSubmit={performSignup}>
          <div className="input-group">
            <input
              className="input-field"
              placeholder="Email *"
              type="email"
              required
              id="username"
              value={signupCredentials.username}
              onChange={handleValidation}
            />
            {errors.email && <span className="error-message">{errors.email}</span>}
          </div>

          <div className="input-group">
            <input
              className="input-field"
              placeholder="Password *"
              type="password"
              required
              id="password"
              minLength="8"
              value={signupCredentials.password}
              onChange={handleValidation}
            />
            {errors.password && <span className="error-message">{errors.password}</span>}
          </div>

          {/* Dropdown for role er fjernet, da vi hardcoder 'user' som rolle */}
          <input type="hidden" value={signupCredentials.role} />

          <button className="button" type="submit">Sign Up</button>
          {errors.signup && <span className="error-message">{errors.signup}</span>}
        </form>
      </div>
    </div>
  );
}

export default SignPage;
