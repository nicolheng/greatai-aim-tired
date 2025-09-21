import React, { useState, useEffect } from 'react'
import { HiHeart } from "react-icons/hi";
import { LuHeartCrack } from "react-icons/lu";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

// Add address to each favorite
const favorites = [
    {
      id: 1,
      image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb',
      title: 'Downtown Apartment',
      description: 'A quiet place in the heart of the city',
      address: '123 Main St, Downtown, NY',
    },
    {
      id: 2,
      image: 'https://images.unsplash.com/photo-1494526585095-c41746248156',
      title: 'Walkers Delight',
      description: 'Perfect for those who love to stroll',
      address: '456 Park Ave, Midtown, NY',
    },
    {
      id: 3,
      image: 'https://images.unsplash.com/photo-1460518451285-97b6aa326961',
      title: 'Country Cottage',
      description: 'Escape to peaceful countryside living',
      address: '789 Country Rd, Upstate, NY',
    },
    {
      id: 4,
      image: 'https://images.unsplash.com/photo-1472220625704-91e1462799b2',
      title: 'Lakeside Haven',
      description: 'Serenity by the water’s edge',
      address: '101 Lakeview Dr, Lakeside, NY',
    },
    {
      id: 5,
      image: 'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd',
      title: 'Modern Loft',
      description: 'Chic urban vibes with modern comfort',
      address: '202 Urban St, City Center, NY',
    },
    {
      id: 6,
      image: 'https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a',
      title: 'Mountain Retreat',
      description: 'Breathtaking views and fresh air',
      address: '303 Mountain Rd, Hilltown, NY',
    },
    {
      id: "sale-4377301",
      image: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308',
      title: 'Luxury Sale Home',
      description: 'Exclusive property available for sale',
      address: '555 Sale Ave, Uptown, NY',
    },
  ]

// IndexedDB utilities
const DB_NAME = 'FavoritesDB';
const DB_VERSION = 1;
const STORE_NAME = 'favorites';

const openDB = (): Promise<IDBDatabase> => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);
    
    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(request.result);
    
    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: 'id' });
      }
    };
  });
};

const addFavorite = async (id: number | string): Promise<void> => {
  const db = await openDB();
  const transaction = db.transaction([STORE_NAME], 'readwrite');
  const store = transaction.objectStore(STORE_NAME);
  await store.add({ id, timestamp: Date.now() });
};

const removeFavorite = async (id: number | string): Promise<void> => {
  const db = await openDB();
  const transaction = db.transaction([STORE_NAME], 'readwrite');
  const store = transaction.objectStore(STORE_NAME);
  await store.delete(id);
};

const getFavorites = async (): Promise<(number | string)[]> => {
  const db = await openDB();
  const transaction = db.transaction([STORE_NAME], 'readonly');
  const store = transaction.objectStore(STORE_NAME);
  const request = store.getAll();
  
  return new Promise((resolve, reject) => {
    request.onsuccess = () => resolve(request.result.map(item => item.id));
    request.onerror = () => reject(request.error);
  });
};

// Define the PropertyData interface to match the API response structure
interface PropertyData {
  id: string;
  title: string;
  description: string;
  address: {
    formattedAddress: string;
  };
  cover: {
    url: string;
  };
}

// Fetch property data from the API
const fetchPropertyData = async (id: string): Promise<PropertyData | null> => {
  try {
    const response = await axios.get(`http://localhost:5000/api/properties/${id}`);
    if (response.data.success) {
      return response.data.property;
    }
    return null;
  } catch (error) {
    console.error(`Failed to fetch property data for ID ${id}:`, error);
    return null;
  }
};

function MasonaryCards() {
  // Helper to generate a random height between 180px and 320px
  const getRandomHeight = () => Math.floor(Math.random() * 140) + 180;

  // Use state to manage the list of favorites
  const [cards, setCards] = useState(favorites);
  const [search, setSearch] = useState('');
  const [favoriteIds, setFavoriteIds] = useState<Set<number | string>>(new Set());
  const [propertyData, setPropertyData] = useState<PropertyData[]>([]);
  const navigate = useNavigate();

  // Load favorites and fetch property data on component mount
  useEffect(() => {
    const loadFavoritesAndFetchData = async () => {
      try {
        const savedFavorites = await getFavorites();
        setFavoriteIds(new Set(savedFavorites));

        // Fetch property data for each favorite ID
        const fetchedData = await Promise.all(
          savedFavorites.map(async (id) => {
            const data = await fetchPropertyData(id.toString());
            return data;
          })
        );

        // Filter out null values and update state
        setPropertyData(fetchedData.filter((data) => data !== null) as PropertyData[]);
      } catch (error) {
        console.error('Failed to load favorites and fetch property data:', error);
      }
    };

    loadFavoritesAndFetchData();
  }, []);

  // Handler to toggle favorite status
  const handleToggleFavorite = async (id: number | string) => {
    try {
      if (favoriteIds.has(id)) {
        // Remove from favorites
        await removeFavorite(id);
        setFavoriteIds(prev => {
          const newSet = new Set(prev);
          newSet.delete(id);
          return newSet;
        });
        // Remove from displayed cards
        setCards(cards.filter(card => card.id !== id));
      } else {
        // Add to favorites
        await addFavorite(id);
        setFavoriteIds(prev => new Set(prev).add(id));
      }
    } catch (error) {
      console.error('Failed to update favorite:', error);
    }
  };

  // Filter cards to only show favorited ones
  const filteredCards = propertyData.filter((card) =>
    card.title.toLowerCase().includes(search.toLowerCase()) ||
    card.description.toLowerCase().includes(search.toLowerCase()) ||
    card.address.formattedAddress.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <div className="p-2 md:p-5">
        {/* Search bar */}
        <div className="mb-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-2 top-0 z-10 bg-white">
          <input
            type="text"
            placeholder="Search by title, description, or address..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full sm:w-96 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
          />
        </div>
        {filteredCards.length === 0 ? (
          <div className="text-center text-xl text-gray-500 py-10">
            {favoriteIds.size === 0 ? 'No Favorites Added Yet' : 'No Favorites Found'}
            <div className="flex justify-center items-center mt-4">
              <LuHeartCrack className="text-xl " />
            </div>
          </div>
        ) : (
          <div className="columns-1 gap-5 lg:gap-3 sm:columns-1 lg:columns-3 xl:columns-4">
            {filteredCards.map((property) => (
              <div
                key={property.id}
                className="group w-full bg-base-100 rounded-xl flex flex-col cursor-pointer break-inside-avoid mb-5 relative"
                onClick={() => navigate(`/details/${property.id}`)}
              >
                <div className="overflow-hidden rounded-xl relative">
                  <figure className="h-auto m-0">
                    <img
                      src={property.cover.url}
                      alt={property.title}
                      // Assign random height to each image
                      style={{ display: 'block', width: '100%', height: `${getRandomHeight()}px`, objectFit: 'cover' }}
                      className="rounded-xl transition-all duration-300 group-hover:opacity-90 group-hover:scale-110"
                    />
                    {/* Unfavorite button at bottom right */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleToggleFavorite(property.id);
                      }}
                      className="absolute bottom-2 right-2 bg-white px-3 py-1 rounded-full border-b-gray-300 cursor-pointer shadow transition-all hover:bg-gray-200 text-xl text-red-500"
                    >
                      <HiHeart />
                    </button>
                  </figure>
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold mb-2">{property.title}</h3>
                  <p className="text-sm text-gray-600">{property.description}</p>
                  <p className="text-sm text-gray-500 mt-1">{property.address.formattedAddress}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default MasonaryCards
