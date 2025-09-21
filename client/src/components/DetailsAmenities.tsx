import React from 'react'

interface DetailsAmenitiesProps {
  amenities: string[];
}

function DetailsAmenities({ amenities }: DetailsAmenitiesProps) {
  return (
    <ul className="menu border-1 border-gray-300 text-black lg:menu-horizontal rounded-box  sm:w-[100vw] md:w-[45vw] lg:w-full p-2 gap-2 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {amenities.map((amenity, idx) => (
        <li key={idx}>
          <a>
            {/* Optionally add an icon here if desired */}
            {amenity}
          </a>
        </li>
      ))}
    </ul>
  )
}

export default DetailsAmenities