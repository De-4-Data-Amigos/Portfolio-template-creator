import React from 'react';
import { Link } from 'react-router-dom';
import '../assets/Frontpage.css'; // Sørg for at denne linje matcher placeringen af din CSS-fil

function Frontpage() {
    return (
        <div className="frontpage-container">
            <h1 className="welcome-title">
                Velkommen til DIN portfølje
                                                                                

            </h1>
            <div className="content-container">
                <div className="boxes">
                    <Link to="/editor" className="box link-box">LAV DIN PORTFOLIE</Link>
                    <Link to="/contact" className="box link-box">BRUG FOR HJÆLP?</Link>
                </div>
                <div className="text-box">
                    <p>Dette er en fyldetekst, der kan indeholde information om siden eller andet relevant indhold for besøgende. Brug denne sektion til at give en kort introduktion eller velkomstbesked.</p>
                </div>
            </div>
        </div>
    );
}

export default Frontpage;
