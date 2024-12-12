import React, { useState } from "react";
import "../assets/contact.css";
import Contact from "../assets/contact.png";

function ContactPage() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState({ email: "" });

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

  const handleSubmit = (evt) => {
    evt.preventDefault();

    if (errors.email) {
      console.log("Validation error:", errors);
      return;
    }

    console.log("Form data submitted:", formData);
    // Her kan du tilføje logik til at sende dataen til en server.
  };

  return (
    <div className="frontpage" style={{ backgroundImage: `url(${Contact})` }}>
      <div className="contact-container">
      <h2 className="sub-header"><i></i></h2>
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

          <button className="send-button" type="submit">
            Send
          </button>
        </form>
      </div>
    </div>
  );
}

export default ContactPage;
