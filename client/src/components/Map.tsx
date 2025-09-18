import React, { useEffect, useRef, useCallback } from 'react'
import mapboxgl from 'mapbox-gl'

import 'mapbox-gl/dist/mapbox-gl.css';

interface MapProps {
  newLocation: [number,number]
  isIdle: boolean;
}

function Map({newLocation, isIdle}:MapProps) {
  const mapContainerRef = useRef(null)
  const mapRef = useRef(null)
  const isRotating = useRef(false)

  const rotateCamera = useCallback((timestamp:number) => {
      if (mapRef.current && isRotating.current) {
        mapRef.current.rotateTo((timestamp / 100) % 360, { duration: 0 });
        requestAnimationFrame(rotateCamera);
      }
    },
    [],
  );

  const startRotation = useCallback(() => {
    if (!isRotating.current && mapRef.current) {
      console.log('Starting rotation');
      isRotating.current = true;
      requestAnimationFrame(rotateCamera);
    }
  }, [rotateCamera]);

  const stopRotation = useCallback(() => {
      console.log('Stopping rotation');
      cancelAnimationFrame(rotateCamera);
      isRotating.current = false;
  }, []);
  
  if (isIdle == true){
    console.log("User is idling on map")
    startRotation()
  }else {
    stopRotation()
  }
  
  useEffect(() => {
    mapboxgl.accessToken = 'pk.eyJ1Ijoid2VpcmRvcmFuZ2UiLCJhIjoiY21mbnU0bTUzMGp2czJrcXozczVvNThoZCJ9.xKGXMz-BhPC4zj_Nh7FqAQ'
    if (mapContainerRef.current || !mapRef) {
      mapRef.current = new mapboxgl.Map({
        container: mapContainerRef.current,
        center: newLocation,
        zoom: 16.00,
        pitch: 60
      });
    }
  },[]);

    useEffect(() => {
    if (mapRef.current) {
      console.log('Updating map center to:', newLocation);
      mapRef.current.flyTo({
        center: newLocation,
        zoom: 16.80,
        pitch: 60,
        essential: true, // Smooth animation
      });
    } else {
      console.log('Map instance not initialized');
    }
  }, [newLocation]);
  

  return (
    <div
      ref={mapContainerRef}
      className="absolute inset-0 w-full h-full bg-gray-200"
    />
  )
}

export default Map;