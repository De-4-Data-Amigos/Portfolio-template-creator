import React, { useState } from "react";
import "../assets/contact.css";
import Contact from "../assets/contact.png";
import apiFacade from "../utils/apiFacade";

function ContactPage() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState({ email: "" });
  const [successMessage, setSuccessMessage] = useState(""); // For succesmeddelelse
  const [errorMessage, setErrorMessage] = useState(""); // For fejlmeddelelse

  const handleValidation = (evt) => {
    const { id, value } = evt.target;
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (id === "email" && !emailPattern.test(value)) {
      setErrors({ ...errors, email: "Email skal være gyldig" });
    } else {
      setErrors({ ...errors, email: "" });
    }

    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    if (errors.email) {
      alert("Der opstod en fejl. Tjek venligst din email.");
      return;
    }
    let response;
  
    try {
     response = await apiFacade.sendContactMessage(formData);
      if (response.message) {
        alert(response.message); 
        setSuccessMessage(response.message); 
        setErrorMessage(""); 
        setFormData({ name: "", email: "", message: "" }); 
      } else {
        throw new Error("Uventet svarformat fra serveren");
      }
    } catch (err) {
      console.error("Kunne ikke sende besked:", err);
      alert("Noget gik galt. Prøv igen senere."); 
      setErrorMessage("Noget gik galt. Prøv igen senere.");
      setSuccessMessage(""); 
    }
  };

  return (
    <div className="frontpage" style={{ backgroundImage: `url(${Contact})` }}>
      <div className="contact-container">
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

          {/* Viser succes- eller fejlmeddelelser */}
          {successMessage && <p className="success-message">{successMessage}</p>}
          {errorMessage && <p className="error-message">{errorMessage}</p>}
        </form>
      </div>
    </div>
  );
}

export default ContactPage;
