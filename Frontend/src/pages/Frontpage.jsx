import React from 'react';
import { MouseParallaxContainer, MouseParallaxChild } from 'react-parallax-mouse';
import WaveCanvas from '../components/WaveCanvas';  // Husk at importere WaveCanvas

function Frontpage() {
    return (
        <MouseParallaxContainer className="parallax-container" resetOnLeave>
            <MouseParallaxChild factorX={0.02} factorY={0.04} updateStyles={{ zIndex: 1 }}>
                <WaveCanvas />
            </MouseParallaxChild>
            <div style={{ position: 'relative', zIndex: 2, padding: '20px', color: 'white', textAlign: 'center' }}>
                <h1>Welcome to Our Website!</h1>
                <p>This is the front page of your site. Feel free to explore!</p>
            </div>
        </MouseParallaxContainer>
    );
}

export default Frontpage;
