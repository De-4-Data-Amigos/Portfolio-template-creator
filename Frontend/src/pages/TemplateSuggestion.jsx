import React from "react";
import { Link } from "react-router-dom";
import maleDev from "../assets/maleDev.png";
import "../assets/Frontpage.css";
import ButtonRow from "../components/ButtonRow";

const TemplateSuggestion = () => {
    return (
        <div className="frontpage" style={{ backgroundImage: `url(${maleDev})` }}>
            <div className="content-box">
                <h2 className="sub-header"></h2>

                <div>
                <h2 className="sub-header">Choose a template to proceed</h2>
                <button>Personal Trainer</button>
                <button>Medical Staff</button>
                <button>Developer</button>
                </div>

                <h4>More templates coming soon!</h4>

                <Link to="/editor" className="styled-button">Test</Link>



            </div>
        </div>
    );
};

export default TemplateSuggestion;