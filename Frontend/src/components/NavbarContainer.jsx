import React, { useState } from "react";

function NavbarContainer({ links, onUpdateLinks }) {
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
                {links.map((link, index) => (
                    <div
                        key={link.id}
                        draggable
                        onDragStart={() => handleDragStart(index)}
                        onDragOver={handleDragOver}
                        onDrop={() => handleDrop(index)}
                        className="navbar-item"
                    >
                        {link.text}
                    </div>
                ))}
            </nav>
           
            <div
                className="delete-zone-navbar"
                onDrop={handleDelete}
                onDragOver={(event) => event.preventDefault()}
            >
                <span className="delete-navbarText">
                    Træk et link her for at fjerne
                </span>
            </div>
        </div>
    );
}

export default NavbarContainer;
