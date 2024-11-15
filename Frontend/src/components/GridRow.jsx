import React from "react";

function GridRow({children}) {
    return (
        <div className="GridRow" data-testid="GridRow">
            {children}
        </div>
    );
}

export default GridRow;