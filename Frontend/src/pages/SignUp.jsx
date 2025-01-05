import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom"; 
import facade from "../utils/apiFacade";
import "../assets/signup.css";
import lockIcon from "../assets/icon/lock.png";
import manwomanoffice from "../assets/manwomanoffice.png";

function SignUpPage() {
  const navigate = useNavigate();

  const init = { username: "", password: "", confirmPassword: "", firstName: "", lastName: "", role: "user" };
  const [signupCredentials, setSignupCredentials] = useState(init);
  const [errors, setErrors] = useState({ username: "", password: "", confirmPassword: "", signup: "" });

  const handleValidation = (evt) => {
    const { id, value } = evt.target;
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    setErrors((prevErrors) => ({
      ...prevErrors,
      [id]: id === "username" && !emailPattern.test(value)
        ? "Email must be valid."
        : id === "password" && value.length < 8
        ? "Password must be at least 8 characters long."
        : id === "confirmPassword" && value !== signupCredentials.password
        ? "Passwords do not match."
        : "",
    }));

    setSignupCredentials({ ...signupCredentials, [id]: value });
  };

  const performSignup = async (evt) => {
    evt.preventDefault();

    const errorMessages = [];
    if (errors.username) errorMessages.push(errors.username);
    if (errors.password) errorMessages.push(errors.password);
    if (errors.confirmPassword) errorMessages.push(errors.confirmPassword);

    if (errorMessages.length > 0) {
      alert(`Please fix the following errors:\n- ${errorMessages.join("\n- ")}`);
      return;
    }

    if (signupCredentials.password !== signupCredentials.confirmPassword) {
      alert("Passwords do not match.");
      setErrors((prevErrors) => ({ ...prevErrors, confirmPassword: "Passwords do not match." }));
      return;
    }

    try {
      await facade.signup(signupCredentials.username, signupCredentials.password, signupCredentials.role);
      console.log("Signup successful");

      await facade.login(signupCredentials.username, signupCredentials.password);
      alert("Signup successful! You will now be maneuvered to the login page");
      navigate("/template-suggestion");
    } catch (err) {
      console.log("Signup or login failed", err);
      setErrors({ ...errors, signup: `Error: ${err.response ? err.response.data : err.message}` });
    }
  };

  return (
    <div className="frontpage" style={{ backgroundImage: `url(${manwomanoffice})` }}>
      <div className="content-box">
        <form onSubmit={performSignup} className="login-form">
          <div className="input-group-sign">
            <h2 className="sign-title">Sign Up</h2>
          </div>
          <div className="form-container">
            <div className="form">
              <img src={lockIcon} alt="Lock icon" className="icon" />
            </div>
          </div>
          <div className="name-container">
            {["first name", "last name"].map((field) => (
              <div className="input-group-sign" key={field}>
                <input
                  className="input-field-sign"
                  placeholder={`${field.charAt(0).toUpperCase() + field.slice(1)} *`}
                  type="text"
                  required
                  id={field}
                  value={signupCredentials[field]}
                  onChange={handleValidation}
                />
              </div>
            ))}
          </div>
          <div className="input-group-sign">
            <input
              className="input-field-sign"
              placeholder="Email *"
              type="email"
              required
              id="username"
              value={signupCredentials.username}
              onChange={handleValidation}
            />
            {errors.username && <span className="error-message">{errors.username}</span>}
          </div>
          <div className="input-group-sign">
            <input
              className="input-field-sign"
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
              className="input-field-sign"
              placeholder="Confirm Password *"
              type="password"
              required
              id="confirmPassword"
              value={signupCredentials.confirmPassword}
              onChange={handleValidation}
            />
            {errors.confirmPassword && <span className="error-message">{errors.confirmPassword}</span>}
          </div>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <button className="sign-button" type="submit">
              Sign Up
            </button>
          </div>
          <p className="signin">
            Already have an account? <Link to="/login">Login</Link>
          </p>
          {errors.signup && <span className="error-message">{errors.signup}</span>}
        </form>
      </div>
    </div>
  );
}

export default SignUpPage;
