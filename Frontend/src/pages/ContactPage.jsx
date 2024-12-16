import React, { useState } from "react";
import "../assets/contact.css";
import Contact from "../assets/contact.png";
import apiFacade from "../utils/apiFacade";

function ContactPage() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState({ email: "" });
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); 

  const handleValidation = (evt) => {
    const { id, value } = evt.target;
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (id === "email" && !emailPattern.test(value)) {
      setErrors({ ...errors, email: "Email must be valid" });
    } else {
      setErrors({ ...errors, email: "" });
    }

    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();

    if (errors.email) {
        setErrorMessage("There was an error. Please check your email.");
        return;
    }

    try {
        const response = await apiFacade.sendContactMessage(formData);
        if (response && response.message) {
            setSuccessMessage(response.message); 
            setErrorMessage(""); // Nulstil fejlbeskeder
            setFormData({ name: "", email: "", message: "" }); 
            console.warn("Unexpected response format from server:", response);
            setErrorMessage("Unexpected error occurred. Please try again.");
        }
    } catch (err) {
        console.error("Error sending message:", err.message || err);
        alert("Something went wrong. Please try again later."); 
        setErrorMessage("Something went wrong. Please try again later.");
        setSuccessMessage(""); 
    }
};

  return (
    <div className="frontpage" style={{ backgroundImage: `url(${Contact})` }}>
      <div className="contact-container">
      <div className="welcome-text">
        <h2 className="contact-header">You're Always Welcome to Reach Out!</h2>
        <p className="contact-description">
          Here you can ask questions, provide feedback, or share your thoughts. 
          We're here to listen and assist you in any way we can.
        </p>
      </div>
        <form onSubmit={handleSubmit} className="contact-form">
          <div className="input-group">
            <h2 className="contact-title">Contact</h2>
            <input
              className="input-field"
              placeholder="Your Name *"
              type="text"
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
          </div>

          <div className="input-group">
            <input
              className="input-field"
              placeholder="Your Email *"
              type="email"
              id="email"
              value={formData.email}
              onChange={handleValidation}
              required
            />
            {errors.email && <span className="error-message">{errors.email}</span>}
          </div>

          <div className="input-group">
            <textarea
              className="input-field"
              placeholder="Your Message *"
              id="message"
              rows="4"
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              required
            ></textarea>
          </div>

          <div style={{ display: "flex", justifyContent: "center" }}>
            <button className="send-button" type="submit">
              Send
            </button>
          </div>

        
          {successMessage && <p className="success-message">{successMessage}</p>}
          {errorMessage && <p className="error-message">{errorMessage}</p>}
        </form>
      </div>
    </div>
  );
}

export default ContactPage;
