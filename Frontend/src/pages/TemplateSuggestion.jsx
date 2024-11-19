import React from "react";
import { Link } from "react-router-dom"; // Importér Link fra React Router
import maleDev from "../assets/maleDev.png";
import "../assets/Frontpage.css";

const TemplateSuggestion = () => {
return (
    <div className="frontpage" style={{ backgroundImage: `url(${maleDev})` }}>
      <div className="content-box">
        <h1 className="main-header">Let's get you started
         </h1>

        
          <h2 className="sub-header">Here's a few suggestions for your own personalized portfolio</h2>
        

    </div>
    </div>
);
};

export default TemplateSuggestion;