"use client"

import React, { useRef, useState, useEffect } from "react";
import { Loader } from "@googlemaps/js-api-loader";
import WindowDimensions from '../hooks/WindowDimensions';

export function Map() {
  
    const mapRef = React.useRef(null);
    
    const { wid, hei } = WindowDimensions();


    useEffect(() => {
        const initMap = async () => {
            const loader = new Loader({
                apiKey: "AIzaSyAY8mc3IlmHOWs-W2roWPeItGcYfMIe1cg",
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
                    console.log(pos);
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

            const delay = (delayInms) => {
                return new Promise(resolve => setTimeout(resolve, delayInms));
            };

            const trackLocation = async () => {
                if (navigator.geolocation) {
                    navigator.geolocation.getCurrentPosition(
                        (position) => {
                            const pos = {
                            lat: position.coords.latitude,
                            lng: position.coords.longitude,
                            };
                        console.log(pos);
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
                let delayres = await delay(3000);
                trackLocation();
            }
    
            trackLocation();
        }

        initMap();
        console.log(wid, hei);
    }, []);

    return (
        <div style={{ height: hei, width: wid}} ref={mapRef} />
    )
}