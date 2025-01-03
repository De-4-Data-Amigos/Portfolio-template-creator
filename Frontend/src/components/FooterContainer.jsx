import React from "react";

function FooterContainer({ children }) {
    return (
        <div className="footer-container">
            <footer className="footer">
                {children}
            </footer>
        </div>
    );
}

export default FooterContainer;
