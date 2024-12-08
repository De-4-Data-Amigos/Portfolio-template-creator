import React from "react";
import NavbarItem from "./NavbarItem";

function Navbar({ links = [] }) { 
    return (
        <div className="Navbar">
            {links.map((link) => (
                <NavbarItem key={link.id} text={link.text} link={link.href} />
            ))}
        </div>
    );
}

export default Navbar;
