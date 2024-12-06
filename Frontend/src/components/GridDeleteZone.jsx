import React from "react";
function GridDeleteZone({onDrop}) {
    return (
        <div
        onDragOver={e => e.preventDefault()}
        onDragEnd={e => e.preventDefault()}
        onDrop={onDrop}
        className="GridDeleteZone">
            <p className="GridDeleteZoneText">Delete Zone</p>
        </div>
    );
}

export default GridDeleteZone;