import React from "react";
import "../assets/GridContainer.css";

function NavbarItem({ text, link }) {
    return (
        <div className="NavbarItem">
            <button>{text}</button>
        </div>
    );
}

export default NavbarItem;
