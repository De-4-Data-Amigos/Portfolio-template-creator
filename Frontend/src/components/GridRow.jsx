import React from "react";

function GridRow({onClick, children}) {
    return (
        <div onClick={onClick} className="GridRow" data-testid="GridRow">
            {children}
        </div>
    );
}

export default GridRow;