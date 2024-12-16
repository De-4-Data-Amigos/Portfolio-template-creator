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

    const handleDelete = (event) => {

        const dropTargetElement = event.target.firstChild;
        console.log("handleDelete", event)
        const index = dropTargetElement.getAttribute("data-id");

        if (index !== null) {
            
            const updatedLinks = [...links];
            updatedLinks.splice(index, 1);
            onUpdateLinks(updatedLinks);
            setDraggedIndex(null);
        }
    };
    const gridStyle = {
        height: '100%',
        margin: 0
    };
    return (
        <div className="navbar-container">
            <nav className="navbar">
                <GridContainer columns={4} rows={1} style={gridStyle}>
                {links.map((link, index) => (
                    <span
                        key={link.id}
                        data-pos={link.pos}
                        data-id={index}
                        /*
                        draggable
                        onDragStart={() => handleDragStart(index)}
                        onDragOver={handleDragOver}
                        onDrop={() => handleDrop(index)}
                        */
                        className="navbar-item"
                    >
                        {link.text}
                    </span>
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
