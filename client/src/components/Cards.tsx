
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
};

function Cards({ listings }: { listings: Listing[] }) {
  return (
    <div className="grid md:grid-cols-1 lg:grid-cols-1 gap-4  w-full">
      {listings.map(listing => (
        <div key={listing.id} className="card bg-base-100 min-w-full max-w-xs sm:min-w-full border-1 border-gray-300">
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
      ))}
    </div>
  )
}

export default Cards
