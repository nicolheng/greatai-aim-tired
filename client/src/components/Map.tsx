import React, { useEffect, useRef, useCallback } from 'react'
import mapboxgl from 'mapbox-gl'

import 'mapbox-gl/dist/mapbox-gl.css';

interface MapProps {
  newLocation: [number,number]
  isIdle: boolean;
}

mapboxgl.accessToken = 'pk.eyJ1Ijoid2VpcmRvcmFuZ2UiLCJhIjoiY21mbnU0bTUzMGp2czJrcXozczVvNThoZCJ9.xKGXMz-BhPC4zj_Nh7FqAQ'

function Map({newLocation, isIdle}:MapProps) {
  const mapContainerRef = useRef(null)
  const mapRef = useRef(null)
  const isRotating = useRef(false)
  const markerRef = useRef(null)

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
    if (mapContainerRef.current || !mapRef) {
      mapRef.current = new mapboxgl.Map({
        container: mapContainerRef.current,
        center: newLocation,
        zoom: 16.00,
        pitch: 60
      });

      markerRef.current = new mapboxgl.Marker({
        color: '#6353ee', 
        scale: 1.5, // Larger marker
      })
      .setLngLat(newLocation)
      .addTo(mapRef.current);
    }

    return () => {
      if (markerRef.current) {
        markerRef.current.remove()
      }
    }
  },[]);

    useEffect(() => {
    if (mapRef.current) {
      console.log('Updating map center to:', newLocation);
      // Update marker position
      if (markerRef.current) {
        markerRef.current.setLngLat(newLocation);
      } else {
        markerRef.current = new mapboxgl.Marker({
          color: '#6353ee',
          scale: 1.5,
        })
          .setLngLat(newLocation)
          .addTo(mapRef.current);
      }
      
      mapRef.current.flyTo({
        center: newLocation,
        zoom: 16.80,
        pitch: 60,
        essential: true,
      });
    } else {
      console.log('Map instance not initialized');
    }
  }, [newLocation]);
  

  return (
    <div
      ref={mapContainerRef}
      className="inset-0 w-[100vw] h-[100vh] bg-gray-200"
    />
  )
}

export default Map;