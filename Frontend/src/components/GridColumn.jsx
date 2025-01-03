import React from "react";

function GridColumn({children}) {
    return(
        <div className="GridColumn" data-testid="GridColumn">
            {children}
        </div>
    );    
}

export default GridColumn;