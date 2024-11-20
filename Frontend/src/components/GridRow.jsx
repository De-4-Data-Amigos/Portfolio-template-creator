import React from "react";

function GridRow({ 
        /* EVENTS */ 
            onDragStart,
            onDragEnd,
            onDragEnter,
            onDragLeave,
            onDrop,
        /* PROPERTIES */ 
            isSelecting, 
            isSelected, 
            isTarget, 
            draggable,
        /* MISC */
            children
        }) 
        {
        const calculateStyle = () => {
            let style = {
                backgroundColor: '',
                opacity: '1'
            };

            if(isSelecting){
                if(!isSelected){
                    //style.backgroundColor = '#00ff00';
                    if(isTarget){
                        //style.backgroundColor = '#ff00ff';
                        style.opacity = "0.5";
                    }
                }
            }
            return style;

        };
    return (
        <div 
            /* DRAG AND DROP */
            draggable={draggable} 
            onDragStart={onDragStart} 
            onDragEnd={onDragEnd} 
            onDrop={onDrop}
            onDragEnter={onDragEnter}
            onDragLeave={onDragLeave}
            onDragOver={e => e.preventDefault()}

            className="GridRow" 
            data-testid="GridRow" 
            style={calculateStyle()}
        >
            {children}
        </div>
    );
}

export default GridRow;