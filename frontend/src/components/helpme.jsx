"use client"

import React, { useState, useRef, useEffect } from "react";
import { Loader } from "@googlemaps/js-api-loader";
import WindowDimensions from '../hooks/WindowDimensions';


export function Map() {
  
    const mapRef = useRef(null);
    const socketRef = useRef(null);
    const { wid, hei } = WindowDimensions();
    
    useEffect(() => {        
        const initMap = async () => {
            const loader = new Loader({
                apiKey: "AIzaSyAY8mc3IlmHOWs-W2roWPeItGcYfMIe1cg",
                version: "weekly"
            });

            //initialise map
            const { Map } = await loader.importLibrary('maps')

            //initialise marker
            const { Marker } = await loader.importLibrary('marker');

            const position = {
                lat: 5,
                lng: -79
            }

            const mapOptions = {
                center: position,
                zoom: 17,
                mapTypeControl: false,
                fullscreenControl: false,
                streetViewControl: false,
                zoomControl: false,
                mapId: 'MY_NEXTJS_MAPID'
            }

            // Map setup
            const map = new Map(mapRef.current, mapOptions);
            // Place marker
            const marker = new Marker({
                position: position,
                map: map
            });
        
            //initialise websocket connection once
            if (!socketRef.current || socketRef.current.readyState === WebSocket.CLOSED) {
                const ws = new WebSocket('ws://localhost:8080/ws/joinRoom/1?clientId=1&username=user1');
                socketRef.current = ws;
            
                socketRef.current.addEventListener('open', () => {
                    console.log('WebSocket connected??');
                });
            
                socketRef.current.addEventListener('error', (error) => {
                    console.log('WebSocket error:', error);
                    // Handle WebSocket connection error
                });
            
                socketRef.current.addEventListener('close', () => {
                    console.log('WebSocket connection closed???');
                    // Attempt to reconnect WebSocket after a delay
                    setTimeout(() => {
                        initMap();
                    }, 1000); // Adjust the delay as needed
                });
            }

            const sendCoordinates = () => {
                if (socketRef.current.readyState === WebSocket.OPEN) {
                    if (navigator.geolocation) {
                        navigator.geolocation.getCurrentPosition(
                            (position) => {
                                const { latitude, longitude } = position.coords;
                                const coordinates = { lat: latitude, lng: longitude };
                                // Send coordinates to the server via WebSocket
                                socketRef.current.send(JSON.stringify(coordinates));
                            },
                            (error) => {
                                console.error('Error getting geolocation:', error);
                            }
                        );
                    } else {
                        console.error('Geolocation is not supported by this browser.');
                    }
                } else {
                    console.error('WebSocket connection is not open.??');
                }
            };

            // Fetch and send coordinates to the server periodically (e.g., every 5 seconds)
            const fetchCoordinates = async () => {
                // Fetch coordinates
                await sendCoordinates();
                // Call fetchCoordinates again after a delay (e.g., 5 seconds)
                setTimeout(fetchCoordinates, 5000);
            };

            // Start fetching coordinates
            fetchCoordinates();            
        }

        initMap();
        console.log(wid, hei);
    }, []);

    return (
        <div style={{ height: hei, width: wid}} ref={mapRef} />
    )
}