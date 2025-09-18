import React, { useEffect, useRef } from 'react'
import mapboxgl from 'mapbox-gl'

import 'mapbox-gl/dist/mapbox-gl.css';


function Map() {
  const mapContainerRef = useRef<HTMLDivElement>(null)
  const mapRef = useRef<mapboxgl.Map | null>(null)

  
  useEffect(() => {
    mapboxgl.accessToken = 'pk.eyJ1Ijoid2VpcmRvcmFuZ2UiLCJhIjoiY21mbnU0bTUzMGp2czJrcXozczVvNThoZCJ9.xKGXMz-BhPC4zj_Nh7FqAQ'
    if (mapContainerRef.current) {
      mapRef.current = new mapboxgl.Map({
        container: mapContainerRef.current,
        center: [101.7006, 3.0550], //Google map has it in reverse
        zoom: 16.00,
        pitch: 60
      });
    }
    return () => {
      if (mapRef.current) mapRef.current.remove();
    }
  },[])

  return (
    <div
      ref={mapContainerRef}
      className="inset-0 w-[100vw] h-[100vh] bg-gray-200"
    />
  )
}

export default Map;