"use client"

import React, { useEffect } from "react";
import { Loader } from "@googlemaps/js-api-loader";

export function Map({w, h}) {
  
    const mapRef = React.useRef(null);

    useEffect(() => {

        const initMap = async () => {
            
            
            const loader = new Loader({
                apiKey: process.env.NEXT_PUBLIC_MAPS_API_KEY,
                version: "weekly"
            });
            
            const { Map } = await loader.importLibrary('maps')

            //initialise marker
            const { Marker } = await loader.importLibrary('marker');

            const position = {
                lat: 5,
                lng: -79
            }

            //map Options
            const mapOptions = {
                center: position,
                zoom: 17,
                mapId: 'MY_NEXTJS_MAPID'
            }

            // Map setup

            const map = new Map(mapRef.current, mapOptions);

            //Place marker
            const marker = new Marker({
                position: position,
                map: map
            });
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                      const pos = {
                     lat: position.coords.latitude,
                     lng: position.coords.longitude,
                   };
                   map.setCenter(pos);
                   marker.setPosition(pos);
                 }
                );
            }else{
                //Handle no geolocation
                const defaultPosition = {
                    lat: 0,
                    lng: 0
                };
                map.setCenter(defaultPosition);
                marker.setPosition(defaultPosition);
            }
        }

        initMap();
    }, []);

    return (
        <div style={{ height: h, width: w}} ref={mapRef} />
    )
}