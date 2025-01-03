import React from "react";
import { Link } from "react-router-dom";
import maleDev from "../assets/maleDev.png";
import "../assets/TemplateSuggestion.css";
import "../assets/Frontpage.css";

const TemplateSuggestion = () => {
    return (
        <div className="frontpage" style={{ backgroundImage: `url(${maleDev})` }}>
            <div className="content-box">
                <h2 className="sub-header"></h2>

                <div>
                    <h2 className="sub-header"><i>Choose a template to proceed</i></h2>

                    {/* Link til skal rettes til korrekt flow */}

                    <Link to="/editor" className="template-suggest-button">
                        <span>Personal Trainer</span>
                    </Link>

                    <Link to="/editor" className="template-suggest-button">
                        <span>Medical Staff</span>
                    </Link>

                    <Link to="/editor" className="template-suggest-button">
                        <span>Developer</span>
                    </Link>
                </div>

                <h4><i>More templates coming soon..</i></h4>

            </div>
        </div>
    );
};

export default TemplateSuggestion;