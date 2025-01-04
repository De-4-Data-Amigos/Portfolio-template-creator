import React from "react";
import { Link } from "react-router-dom";
import dameImage from "../assets/dame.png";
import "../assets/Frontpage.css";
import "../assets/App.css";


const Frontpage = () => {
  return (
    <div className="frontpage" style={{ backgroundImage: `url(${dameImage})` }}>
      <div className="content-box">
        <h1 className="main-header">Easily create your own professional website</h1>
        
        <div className="section">
          <h2 className="sub-header">Easy drag-and-drop anywhere!</h2>
          <p>Customize your website with exactly what YOU want!</p>
        </div>
        
        <div className="section">
          <h2 className="sub-header">Your own domain</h2>
          <p>You get your very own personal domain, making your website 100% yours!</p>
        </div>
        
        <div className="section">
          <h2 className="sub-header">Secure hosting</h2>
          <p>As our customer, you are guaranteed that your personal website is always available!</p>
        </div>
        
        <Link to="/editor" className="frontpage-button">
          <span>Get started!</span>
        </Link>
      </div>
    </div>
  );
};

export default Frontpage;

