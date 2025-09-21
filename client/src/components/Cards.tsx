
import React from 'react';

type Listing = {
  id: number;
  title: string;
  image: string;
  image2?: string;
  image3?: string;
  price: string;
  location: string;
  tags?: string[];
  isNew?: boolean;
  description?: string;
};

interface CardsProp{
  listings: Listing[],
  onCardClick: (newLocation: [number, number]) => void;
}

function Cards({listings,onCardClick}: CardsProp ) {
  return (
    <div className="grid md:grid-cols-1 lg:grid-cols-1 gap-4 w-full">
      {listings.map(listing => (
        <div key={listing.id} className="card bg-white min-w-full max-w-3xl sm:min-w-full border-1 border-gray-300" onClick={() => onCardClick(listing.coords)}>
          {/* Custom image grid */}
          <div className="grid grid-cols-3 grid-rows-2 gap-2 p-4">
            {/* Main cover image: spans 2 cols and 2 rows */}
            <div className="col-span-2 row-span-2">
              <img
                src={listing.image}
                alt={listing.title}
                className="object-cover w-full h-full rounded-xl min-h-[180px] max-h-[260px]"
              />
            </div>
            {/* Top right image (placeholder or extra image) */}
            <div className="col-start-3 row-start-1">
              <img
                src={listing.image2 || listing.image}
                alt={listing.title + ' extra 1'}
                className="object-cover w-full h-full rounded-xl min-h-[85px] max-h-[120px]"
              />
            </div>
            {/* Bottom right image (placeholder or extra image) */}
            <div className="col-start-3 row-start-2">
              <img
                src={listing.image3 || listing.image}
                alt={listing.title + ' extra 2'}
                className="object-cover w-full h-full rounded-xl min-h-[85px] max-h-[120px]"
              />
            </div>
          </div>
          <div className="card-body pt-2">
            <h2 className="card-title">
              {listing.title}
              {listing.isNew && <div className="badge badge-secondary">NEW</div>}
            </h2>
            <p className="text-sm text-gray-500">{listing.location}</p>
            <p className="font-bold text-lg">{listing.price}</p>
            {listing.description && <p className="text-xs mt-1">{listing.description}</p>}
            <div className="card-actions justify-end flex-wrap mt-2">
              {listing.tags?.map(tag => (
                <div key={tag} className="badge badge-outline">{tag}</div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default Cards
