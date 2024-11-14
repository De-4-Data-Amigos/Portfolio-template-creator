import React, { useRef, useEffect } from 'react';

function WaveCanvas() {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        let waveOffset = 0;

        function drawWaves() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = '#000';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.lineWidth = 2;
            ctx.strokeStyle = '#FFF';
            ctx.beginPath();

            for (let i = 0; i < canvas.width; i++) {
                ctx.lineTo(i, 200 + Math.sin(i * 0.02 + waveOffset) * 20);
            }

            ctx.stroke();
            waveOffset += 0.1; // Speed of wave animation
            requestAnimationFrame(drawWaves);
        }

        drawWaves();
    }, []);

    return <canvas ref={canvasRef} style={{ position: 'absolute', top: 0, left: 0 }} />;
}

export default WaveCanvas;
