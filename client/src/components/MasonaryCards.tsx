import React, { useState } from 'react'
import { HiHeart } from "react-icons/hi";
import { useNavigate } from 'react-router-dom';

const favorites = [
    {
      id: 1,
      image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb',
      title: 'Downtown Apartment',
      description: 'A quiet place in the heart of the city',
    },
    {
      id: 2,
      image: 'https://images.unsplash.com/photo-1494526585095-c41746248156',
      title: 'Walkers Delight',
      description: 'Perfect for those who love to stroll',
    },
    {
      id: 3,
      image: 'https://images.unsplash.com/photo-1460518451285-97b6aa326961',
      title: 'Country Cottage',
      description: 'Escape to peaceful countryside living',
    },
    {
      id: 4,
      image: 'https://images.unsplash.com/photo-1472220625704-91e1462799b2',
      title: 'Lakeside Haven',
      description: 'Serenity by the water’s edge',
    },
    {
      id: 5,
      image: 'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd',
      title: 'Modern Loft',
      description: 'Chic urban vibes with modern comfort',
    },
    {
      id: 6,
      image: 'https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a',
      title: 'Mountain Retreat',
      description: 'Breathtaking views and fresh air',
    },
    {
      id: 7,
      image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb',
      title: 'Downtown Apartment',
      description: 'A quiet place in the heart of the city',
    },
  ]



function MasonaryCards() {
  // Helper to generate a random height between 180px and 320px
  const getRandomHeight = () => Math.floor(Math.random() * 140) + 180;

  // Use state to manage the list of favorites
  const [cards, setCards] = useState(favorites);
  const navigate = useNavigate();

  // Handler to remove a card by id
  const handleUnfavorite = (id: number) => {
    setCards(cards.filter(card => card.id !== id));
  };

  return (
    <div >
      <div className="p-2 md:p-5">
        {cards.length === 0 ? (
          <div className="text-center text-lg text-gray-500 py-10">
            Go to favourite some homes
          </div>
        ) : (
          <div
            className="
              columns-1
            gap-5

            lg:gap-3
            
            sm:columns-1
            lg:columns-3
            xl:columns-4
            "
          >
            {cards.map((image) => (
              <div
                key={image.id}
                className="group w-full bg-base-100 rounded-xl flex flex-col cursor-pointer break-inside-avoid mb-5 relative"
                onClick={() => navigate(`/details/${image.id}`)}
              >
                <div className="overflow-hidden rounded-xl relative">
                  <figure className="h-auto m-0">
                    <img
                      src={image.image}
                      alt={image.title}
                      // Assign random height to each image
                      style={{ display: 'block', width: '100%', height: `${getRandomHeight()}px`, objectFit: 'cover' }}
                      className="rounded-xl transition-all duration-300 group-hover:opacity-90 group-hover:scale-110"
                    />
                    {/* Unfavorite button at bottom right */}
                    <button
                      onClick={(e) => { e.stopPropagation(); handleUnfavorite(image.id); }}
                      className="absolute bottom-2 right-2 bg-white text-red px-3 py-1 rounded-full border-b-gray-300 cursor-pointer shadow transition-all hover:bg-gray-200 transition-all text-xl text-red-500"
                    >
                      <HiHeart />
                    </button>
                  </figure>
                </div>
                <div className="p-4 hover:opacity-70">
                  <h3 className="text-lg font-semibold">{image.title}</h3>
                  <p className="text-sm text-gray-500">{image.description}</p>
                </div>
                {/* <div className="card-body invisible hover:visible">
                  <h2 className="card-title m-0 gap-0">Uploaded By : {image.userEmail}</h2>
                  <span>Created on : {image.createdAt.toLocaleDateString()}</span>
                </div> */}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default MasonaryCards
