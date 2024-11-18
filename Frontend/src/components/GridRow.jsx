import React from "react";

function GridRow({ 
        /* EVENTS */ 
            onDragStart,
            onDragEnd,
            onDrop,
        /* PROPERTIES */ 
            isSelecting, isSelected, draggable,
        /* MISC */
            children
    }) 
    {
    return (
        <div 
            /* DRAG AND DROP */
            draggable={draggable} 
            onDragStart={onDragStart} 
            onDragEnd={onDragEnd} 
            onDrop={onDrop}
            onDragEnter={e => e.preventDefault()}
            onDragLeave={e => e.preventDefault()}
            onDragOver={e => e.preventDefault()}

            className="GridRow" 
            data-testid="GridRow" 
            style={{
                backgroundColor: (isSelecting && !isSelected ) ? '#00ff00' : ''
            }}
        >
            {children}
        </div>
    );
}

export default GridRow;