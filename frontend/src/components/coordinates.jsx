"use client"

import { Loader } from "@googlemaps/js-api-loader";

export default function Coordinates() {
    const loader = new Loader({
        apiKey: "AIzaSyAY8mc3IlmHOWs-W2roWPeItGcYfMIe1cg",
        version: "weekly"
    });
    
    // Create WebSocket connection.
    const socket = new WebSocket('ws://your-websocket-server.com');

    // Connection opened
    socket.addEventListener('open', (event) => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const pos = {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude,
                    };
                    // Send the position data as a JSON string
                    socket.send(JSON.stringify(pos.lat, pos.lng));
                },
                function (error) { },
                {enableHighAccuracy: true}
            );
        } else {
            // Handle no geolocation
            const defaultPosition = {
                lat: 0,
                lng: 0
            };
            // Send the default position data as a JSON string
            socket.send(JSON.stringify(defaultPosition));
        }
    });
}