import React from "react";
import { Link } from "react-router-dom";
import dameImage from "../assets/dame.png";
import "../assets/Frontpage.css";

const Frontpage = () => {
  return (
    <div className="frontpage" style={{ backgroundImage: `url(${dameImage})` }}>
      <div className="content-box">
        <h1 className="main-header">Lav nemt din egen professionelle hjemmeside</h1>
        
        <div className="section">
          <h2 className="sub-header">Nemt træk og placer overalt!</h2>
          <p>Tilpas din hjemmeside med lige præcis hvad DU vil!</p>
        </div>
        
        <div className="section">
          <h2 className="sub-header">Dit eget domæne</h2>
          <p>Du får dit helt eget personlige domæne, så din hjemmeside tilhører 100% dig!</p>
        </div>
        
        <div className="section">
          <h2 className="sub-header">Sikker hosting</h2>
          <p>Som kunde hos os er du garanteret at din personlige hjemmeside altid er tilgængelig!</p>
        </div>
        
        <Link to="/editor" className="frontpage-button">
          <span>Kom i gang!</span>
        </Link>
      </div>
    </div>
  );
};

export default Frontpage;
