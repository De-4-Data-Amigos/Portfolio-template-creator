import React from "react";

function GridRow({onClick,  isSelecting, isSelected, children}) {
    return (
        <div onClick={onClick} className="GridRow" data-testid="GridRow" 
            style={{
                backgroundColor: (isSelecting && !isSelected ) ? '#00ff00' : ''
            }}
        >
            {children}
        </div>
    );
}

export default GridRow;