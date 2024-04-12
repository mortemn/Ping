"use client"

// import React, { useRef, useEffect } from "react";
// import { Loader } from "@googlemaps/js-api-loader";
// import WindowDimensions from '../hooks/WindowDimensions';

// export function Map() {
  
//     const mapRef = React.useRef(null);
//     const socketRef = useRef(null);
//     const { wid, hei } = WindowDimensions();

//     useEffect(() => {
//         const initMap = async () => {
//             const loader = new Loader({
//                 apiKey: "AIzaSyAY8mc3IlmHOWs-W2roWPeItGcYfMIe1cg",
//                 version: "weekly"
//             });

//             //initialise map
//             const { Map } = await loader.importLibrary('maps')
//             //initialise marker
//             const { Marker } = await loader.importLibrary('marker');

//             const position = {
//                 lat: 5,
//                 lng: -79
//             }

//             //map Options
//             const mapOptions = {
//                 center: position,
//                 zoom: 17,
//                 mapTypeControl: false,
//                 fullscreenControl: false,
//                 streetViewControl: false,
//                 zoomControl: false,
//                 mapId: 'MY_NEXTJS_MAPID'
//             }

//             // Map setup
//             const map = new Map(mapRef.current, mapOptions);

//             //Place marker
//             const marker = new Marker({
//                 position: position,
//                 map: map
//             });

//             //initialise websocket connection once
//             if (!socketRef.current || socketRef.current.readyState === WebSocket.CLOSED) {
//                 const ws = new WebSocket('ws://localhost:8080/ws/joinRoom/1?clientId=1&username=user1');
//                 socketRef.current = ws;
            
//                 socketRef.current.addEventListener('open', () => {
//                     console.log('WebSocket connected??');
//                 });
            
//                 socketRef.current.addEventListener('error', (error) => {
//                     console.log('WebSocket error:', error);
//                     // Handle WebSocket connection error
//                 });
            
//                 socketRef.current.addEventListener('close', () => {
//                     console.log('WebSocket connection closed???');
//                 });
//             }

//             const delay = (delayInms) => {
//                 return new Promise(resolve => setTimeout(resolve, delayInms));
//             };

//             const trackLocation = async () => {
//                 if (navigator.geolocation) {
//                     navigator.geolocation.getCurrentPosition(
//                         (position) => {
//                             const pos = {
//                             lat: position.coords.latitude,
//                             lng: position.coords.longitude,
//                             };
//                         console.log(pos);
//                         map.setCenter(pos);
//                         marker.setPosition(pos);
//                     },
//                     function (error) { },
//                     {enableHighAccuracy: true});
//                 }else{
//                     //Handle no geolocation
//                     const defaultPosition = {
//                         lat: 0,
//                         lng: 0
//                     };
//                     map.setCenter(defaultPosition);
//                     marker.setPosition(defaultPosition);
//                 }
//                 let delayres = await delay(1000);
//                 // await trackLocation();
//                 trackLocation();
//             }

//             trackLocation();
//         }

//         initMap();
//         console.log(wid, hei);
//     }, []);

//     return (
//         <div style={{ height: hei, width: wid}} ref={mapRef} />
//     )
// }

// Map.jsx

import React, { useEffect, useRef, useContext } from 'react';
import { Loader } from '@googlemaps/js-api-loader';
import WindowDimensions from '../hooks/WindowDimensions';
import { WebSocketContext } from './WebSocketProvider';

export function Map() {
  const mapRef = useRef(null);
  const { conn, setConn } = useContext(WebSocketContext);
  const { wid, hei } = WindowDimensions();

  useEffect(() => {
    const initMap = async () => {
        try {
          const loader = new Loader({
            apiKey: "AIzaSyAY8mc3IlmHOWs-W2roWPeItGcYfMIe1cg",
            version: "weekly"
          });
      
          const { google } = await loader.load();
          if (!google) {
            console.error('Failed to load Google Maps library');
            return;
          }
      
          const map = new google.maps.Map(mapRef.current, {
            center: { lat: 5, lng: -79 },
            zoom: 17,
            mapTypeControl: false,
            fullscreenControl: false,
            streetViewControl: false,
            zoomControl: false,
            mapId: 'MY_NEXTJS_MAPID',
          });
      
          const marker = new google.maps.Marker({
            position: { lat: 5, lng: -79 },
            map: map,
          });
      
          if (!conn || conn.readyState === WebSocket.CLOSED) {
            const ws = new WebSocket('ws://localhost:8080/ws/joinRoom/1?clientId=1&username=user1');
            ws.addEventListener('open', () => {
              console.log('WebSocket connected');
              setConn(ws);
            });
            ws.addEventListener('error', (error) => {
              console.error('WebSocket error:', error);
            });
            ws.addEventListener('close', () => {
              console.log('WebSocket connection closed');
            });
          }
      
          const trackLocation = async () => {
            // Your geolocation tracking code here
          };
      
          trackLocation();
        } catch (error) {
          console.error('Error loading Google Maps library:', error);
        }
      };

    initMap();
    console.log(wid, hei);
  }, []);

  return <div style={{ height: hei, width: wid }} ref={mapRef} />;
}
