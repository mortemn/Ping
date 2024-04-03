"use client"

import { Loader } from "@googlemaps/js-api-loader";

export default function Coordinates() {
    const loader = new Loader({
        apiKey: "AIzaSyAY8mc3IlmHOWs-W2roWPeItGcYfMIe1cg",
        version: "weekly"
    });
    
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude,
                };
            return pos;
        },
        function (error) { },
        {enableHighAccuracy: true});
    }else{
        //Handle no geolocation
        const defaultPosition = {
            lat: 0,
            lng: 0
        };
        return defaultPosition;
    }
}