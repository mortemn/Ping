import React, { useState, useEffect } from 'react';

export default function WindowDimensions() {
    const [windowDimensions, setWindowDimensions] = useState({ wid: null, hei: null });

    useEffect(() => {
        function handleResize() {
            setWindowDimensions({ 
                wid: window.innerWidth,
                hei: window.innerHeight
            });
        }

        // Call handleResize once manually to set the initial window dimensions
        handleResize();

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []); // Empty array ensures that effect is only run on mount and unmount

    return windowDimensions;
}