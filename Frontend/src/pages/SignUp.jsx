import React, { useState } from "react";
import facade from "../utils/apiFacade";
import "../assets/signup.css";
import lockIcon from '../assets/icon/lock.png';

function SignPage() {
  const init = { username: "", password: "", confirmPassword: "", firstName: "", lastName: "", role: "user" }; // Rolle er hardcoded som 'user'
  const [signupCredentials, setSignupCredentials] = useState(init);
  const [errors, setErrors] = useState({ username: "", password: "", confirmPassword: "", signup: "" });

  const performSignup = async (evt) => {
    evt.preventDefault();
    console.log("Signup button clicked");

    // Tjek om der er fejl i inputfelterne
    if (errors.username || errors.password || errors.confirmPassword || !signupCredentials.role) {
      console.log("Validation error:", errors);
      return; // Stop udførelsen, hvis der er fejl
    }

    if (signupCredentials.password !== signupCredentials.confirmPassword) {
      setErrors({ ...errors, confirmPassword: "Passwords do not match." });
      return;
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
      setErrors((prevErrors) => ({ ...prevErrors, username: "Email must be valid." }));
    } else if (id === "password" && value.length < 8) {
      setErrors((prevErrors) => ({ ...prevErrors, password: "Password must be at least 8 characters long." }));
    } else if (id === "confirmPassword" && value !== signupCredentials.password) {
      setErrors((prevErrors) => ({ ...prevErrors, confirmPassword: "Passwords do not match." }));
    } else {
      setErrors((prevErrors) => ({ ...prevErrors, [id]: "" }));
    }

    setSignupCredentials({ ...signupCredentials, [id]: value });
  };

  return (
    <div className="name-container">
      <div className="login-form-wrapper">
        <div className="avatar-container">
          <div className="avatar">
            <img src={lockIcon} alt="Lock icon" className="icon" />
          </div>
        </div>
        <h2 className="login-title">Sign Up</h2>

        <form onSubmit={performSignup}>
          <div className="name-container">
            <div className="input-group">
              <input
                className="input-field"
                placeholder="First Name"
                type="text"
                id="firstName"
                value={signupCredentials.firstName}
                onChange={(e) => setSignupCredentials({ ...signupCredentials, firstName: e.target.value })}
              />
            </div>

            <div className="input-group">
              <input
                className="input-field"
                placeholder="Last Name"
                type="text"
                id="lastName"
                value={signupCredentials.lastName}
                onChange={(e) => setSignupCredentials({ ...signupCredentials, lastName: e.target.value })}
              />
            </div>
          </div>

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
            {errors.username && <span className="error-message">{errors.username}</span>}
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

          <div className="input-group">
            <input
              className="input-field"
              placeholder="Confirm Password *"
              type="password"
              required
              id="confirmPassword"
              value={signupCredentials.confirmPassword}
              onChange={handleValidation}
            />
            {errors.confirmPassword && <span className="error-message">{errors.confirmPassword}</span>}
          </div>

          <button className="button" type="submit">Sign Up</button>
          {errors.signup && <span className="error-message">{errors.signup}</span>}
        </form>
      </div>
    </div>
  );
}

export default SignPage;
