import React from "react";
import { Link } from "react-router-dom";
import dameImage from "../assets/womanworking.png";
import "../assets/Frontpage.css";
import "../assets/App.css";

const Frontpage = () => {
  return (
    <div className="frontpage" style={{ backgroundImage: `url(${dameImage})` }}>
      <div className="content-box">

        <h1 className="main-header">Lav nemt <br></br> din egen professionelle<br></br> hjemmeside</h1>
        
        <div className="section">
          <h2 className="sub-header">Nemt træk og placer overalt!</h2>
          <p>Tilpas din hjemmeside med lige præcis<br></br> hvad DU vil!</p>
        </div>
        
        <div className="section">
          <h2 className="sub-header">Dit eget domæne</h2>
          <p>Du får dit helt eget personlige domæne<br></br>så din hjemmeside tilhører 100% dig!</p>
        </div>
        
        <div className="section">
          <h2 className="sub-header">Sikker hosting</h2>
          <p>Som kunde hos os er du garanteret<br></br>at din personlige hjemmeside<br></br>altid er tilgængelig!</p>
        </div>
        
        <Link to="/editor" className="frontpage-button">
          <span>Kom i gang!</span>
        </Link>

        <div className="login-prompt">
          <p>Har du allerede en bruger? Klik <Link to="/login" className="login-link">her</Link></p>
        </div>
      </div>
    </div>
  );
};

export default Frontpage;
