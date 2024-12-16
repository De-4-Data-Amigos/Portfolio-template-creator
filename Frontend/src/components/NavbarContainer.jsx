import React, { useState } from "react";
import GridContainer from "./GridContainer";

function NavbarContainer({ children }) {
        return (
        <div className="navbar-container">
            <nav className="navbar">
                {children}
            </nav>
        </div>
    );
}

export default NavbarContainer;
