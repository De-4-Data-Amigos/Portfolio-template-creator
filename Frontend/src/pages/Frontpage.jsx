import React from 'react';
import '../assets/Frontpage.css'; 

function Frontpage() {
    return (
        <div className="frontpage-container">
            <div className="background-image"></div>
            <div className="text-box">
                <h1 className="welcome-title">Lav nemt en professionel hjemmeside</h1>
                <p className="description">
                    Nemt træk & placer-værktøj til at tilpasse billeder, tekst og design – uden brug for kodning.
                </p>
                <p className="description">
                    Vælg dit eget domæne og få sikker hosting til din hjemmeside.
                </p>
                <button className="cta-button">Kom i gang</button>
            </div>
        </div>
    );
}

export default Frontpage;
