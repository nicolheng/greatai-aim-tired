
import React from 'react'

type Listing = {
  id: number;
  title: string;
  image: string;
  price: string;
  location: string;
  tags?: string[];
  isNew?: boolean;
  description?: string;
  coords: [number,number];
};
interface CardsProps {
  listings: Listing[]; 
  onCardClick: (newLocation: [number, number]) => void;
}

function Cards({listings,onCardClick}:CardsProps) {

  return (
    <div className={"grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-2  w-auto"}>
      {listings.map(listing => (
        <button onClick={() => onCardClick(listing.coords)}>
          <div key={listing.id} className="card bg-base-100 min-w-full max-w-xs sm:min-w-full shadow-sm">
            <figure>
              <img
                src={listing.image}
                alt={listing.title}
                className="object-cover h-40 w-full"
              />
            </figure>
            <div className="card-body">
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
        </button>
      ))}
    </div>
  )
}

export default Cards
