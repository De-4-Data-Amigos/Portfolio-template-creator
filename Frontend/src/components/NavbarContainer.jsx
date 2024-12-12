import React, { useState } from "react";
import GridContainer from "./GridContainer";

function NavbarContainer({ linkMap, onUpdateLinks }) {
    const links = Array.from(linkMap.values());

    const [draggedIndex, setDraggedIndex] = useState(null);


    const handleDragStart = (index) => {
        setDraggedIndex(index);
    };

    const handleDragOver = (event) => {
        event.preventDefault();
    };

    const handleDrop = (index) => {
        if (draggedIndex === null || draggedIndex === index) return;


        const updatedLinks = [...links];
        const [draggedItem] = updatedLinks.splice(draggedIndex, 1);
        updatedLinks.splice(index, 0, draggedItem);

        onUpdateLinks(updatedLinks);
        setDraggedIndex(null);
    };

    const handleDelete = () => {
        if (draggedIndex !== null) {
            
            const updatedLinks = [...links];
            updatedLinks.splice(draggedIndex, 1);
            onUpdateLinks(updatedLinks);
            setDraggedIndex(null);
        }
    };

    return (
        <div className="navbar-container">
            <nav className="navbar">
                <GridContainer columns={4} rows={1}>
                {links.map((link, index) => (
                    <div
                        key={link.id}
                        data-pos={link.pos}
                        draggable
                        onDragStart={() => handleDragStart(index)}
                        onDragOver={handleDragOver}
                        onDrop={() => handleDrop(index)}
                        className="navbar-item"
                    >
                        {link.text}
                    </div>
                ))}
                </GridContainer>
            </nav>

            <div
                className="delete-zone-navbar"
                onDrop={handleDelete}
                onDragOver={(event) => event.preventDefault()}
            >
                <span className="delete-navbarText">
                    Delete Zone
                </span>
            </div>
        </div>
    );
}

export default NavbarContainer;
