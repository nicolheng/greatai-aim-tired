import Map from './Map';
import React from 'react';
import { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';

// Property data that matches the favorites array from MasonaryCards
const propertyData = {
    1: {
        id: 1,
        image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb',
        title: 'Downtown Apartment',
        description: 'A quiet place in the heart of the city with modern amenities and great access to public transportation. This spacious apartment features high ceilings, large windows, and a beautiful view of the city skyline.',
        price: '$2,500/month',
        bedrooms: 2,
        bathrooms: 2,
        sqft: 1200,
        parking: 1,
        petFriendly: true,
        furnished: false,
        agent: {
            name: 'Sarah Johnson',
            phone: '(555) 123-4567',
            email: 'sarah@realestate.com'
        },
        amenities: ['Hospital - 0.5 miles', 'Elementary School - 0.3 miles', 'Grocery Store - 0.2 miles', 'Shopping Mall - 1.2 miles']
    },
    2: {
        id: 2,
        image: 'https://images.unsplash.com/photo-1494526585095-c41746248156',
        title: 'Walkers Delight',
        description: 'Perfect for those who love to stroll through tree-lined streets and enjoy neighborhood charm.',
        price: '$1,800/month',
        bedrooms: 1,
        bathrooms: 1,
        sqft: 850,
        parking: 0,
        petFriendly: false,
        furnished: true,
        agent: {
            name: 'Mike Chen',
            phone: '(555) 987-6543',
            email: 'mike@realestate.com'
        },
        amenities: ['Hospital - 1.2 miles', 'High School - 0.4 miles', 'Grocery Store - 0.1 miles', 'Coffee Shop - 0.05 miles']
    },
    3: {
        id: 3,
        image: 'https://images.unsplash.com/photo-1460518451285-97b6aa326961',
        title: 'Country Cottage',
        description: 'Escape to peaceful countryside living with this charming cottage surrounded by nature.',
        price: '$1,200/month',
        bedrooms: 3,
        bathrooms: 2,
        sqft: 1800,
        parking: 2,
        petFriendly: true,
        furnished: false,
        agent: {
            name: 'Emily Davis',
            phone: '(555) 456-7890',
            email: 'emily@realestate.com'
        },
        amenities: ['Hospital - 5.2 miles', 'Country School - 2.1 miles', 'Farm Market - 1.5 miles', 'Nature Trail - 0.3 miles']
    },
    4: {
        id: 4,
        image: 'https://images.unsplash.com/photo-1472220625704-91e1462799b2',
        title: 'Lakeside Haven',
        description: 'Serenity by the water\'s edge',
        price: '$2,200/month',
        bedrooms: 2,
        bathrooms: 2,
        sqft: 1100,
        parking: 1,
        petFriendly: true,
        furnished: false,
        agent: {
            name: 'John Smith',
            phone: '(555) 234-5678',
            email: 'john@realestate.com'
        },
        amenities: ['Hospital - 2.1 miles', 'Lake Access - 0.1 miles', 'Marina - 0.5 miles', 'Hiking Trail - 0.2 miles']
    },
    5: {
        id: 5,
        image: 'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd',
        title: 'Modern Loft',
        description: 'Chic urban vibes with modern comfort',
        price: '$3,000/month',
        bedrooms: 1,
        bathrooms: 1,
        sqft: 900,
        parking: 0,
        petFriendly: false,
        furnished: true,
        agent: {
            name: 'Lisa Wang',
            phone: '(555) 345-6789',
            email: 'lisa@realestate.com'
        },
        amenities: ['Hospital - 0.8 miles', 'Art Gallery - 0.2 miles', 'Rooftop Bar - 0.1 miles', 'Subway - 0.3 miles']
    },
    6: {
        id: 6,
        image: 'https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a',
        title: 'Mountain Retreat',
        description: 'Breathtaking views and fresh air',
        price: '$1,500/month',
        bedrooms: 4,
        bathrooms: 3,
        sqft: 2200,
        parking: 2,
        petFriendly: true,
        furnished: false,
        agent: {
            name: 'David Brown',
            phone: '(555) 456-7890',
            email: 'david@realestate.com'
        },
        amenities: ['Hospital - 10 miles', 'Mountain Trail - 0.1 miles', 'Ski Resort - 5 miles', 'General Store - 2 miles']
    },
    7: {
        id: 7,
        image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb',
        title: 'Downtown Apartment',
        description: 'A quiet place in the heart of the city',
        price: '$2,500/month',
        bedrooms: 2,
        bathrooms: 2,
        sqft: 1200,
        parking: 1,
        petFriendly: true,
        furnished: false,
        agent: {
            name: 'Sarah Johnson',
            phone: '(555) 123-4567',
            email: 'sarah@realestate.com'
        },
        amenities: ['Hospital - 0.5 miles', 'Elementary School - 0.3 miles', 'Grocery Store - 0.2 miles', 'Shopping Mall - 1.2 miles']
    }
} as const;

function FocusedFav() {
    const { id } = useParams<{ id: string }>();
    const [isIdle, setIsIdle] = useState<boolean>(false);
    const idleTimeoutRef = React.useRef<NodeJS.Timeout | null>(null);

    // Get property data based on ID from URL
    const propertyId = parseInt(id || '1') as keyof typeof propertyData;
    const property = propertyData[propertyId] || propertyData[1];

    // Idle detection
    const IDLE_TIMEOUT = 5000; // 5 seconds

    const resetIdleTimer = useCallback(() => {
    console.log('User activity detected, resetting idle timer');
    setIsIdle(false);
    if (idleTimeoutRef.current) {
        clearTimeout(idleTimeoutRef.current);
    }
    idleTimeoutRef.current = setTimeout(() => {
        console.log('User is idle');
        setIsIdle(true);
    }, IDLE_TIMEOUT);
    }, []);

    useEffect(() => {
    const events = ['click', 'touchstart'];
    events.forEach((event) => {
        window.addEventListener(event, resetIdleTimer);
    });

    resetIdleTimer(); // Start timer on mount

    return () => {
        events.forEach((event) => {
        window.removeEventListener(event, resetIdleTimer);
        });
        if (idleTimeoutRef.current) {
        clearTimeout(idleTimeoutRef.current);
        }
    };
    }, [resetIdleTimer]);


    return (
    <>
    <div className="flex flex-col w-[90vw] min-h-screen justify-self-center p-10 pt-0 mt-10 gap-4 ">
        <div className="relative justify-center w-full h-[70vh] ">
            <img src={property.image} alt={property.title} className="object-cover w-full h-full rounded-4xl" />
            <div className="absolute flex bottom-0 right-0 w-[15vw] h-[10vw] rounded-4xl bg-cyan-200 z-2 mb-4 mr-4 overflow-hidden justify-center items-center place-items-center m-auto border-2 border-gray-600">
                <Map newLocation={[101.7001903848135,3.055492032127826]} isIdle={isIdle} setZoom={15.3} setPitch={70}/>
            {/* add newLocation coords into Map when backend provides */}
            </div> 
        </div>
        <div className="grid grid-cols-3 gap-8 w-full h-auto">
            <div className=" h-auto grid grid-row  items-start justify-start text-white text-2xl border-1 col-span-2 border-gray-300 rounded-xl p-6 ">
                <h2 className="row-span-1 font-bold text-black">{property.title}</h2>
                <h4 className="row-span-4 text-base text-black">{property.description}</h4>
                <p className="text-lg font-semibold text-green-600 mt-2">{property.price}</p>
            </div>
            <div className="  h-auto gap-1 grid grid-row border-1 border-gray-300 rounded-xl items-start justify-start text-white text-2xl pl-4 pt-4">
                <h2 className="row-span-1 text-black text-lg font-bold">Attributes</h2>
                <div className="row-span-1 grid grid-cols-3 text-base pb-4 gap-4">
                    <div className="text-black"><span className="font-semibold">Bedrooms:</span> {property.bedrooms}</div>
                    <div className="text-black"><span className="font-semibold">Bathrooms:</span> {property.bathrooms}</div>
                    <div className="text-black"><span className="font-semibold">Sq Ft:</span> {property.sqft}</div>
                    <div className="text-black"><span className="font-semibold">Parking:</span> {property.parking}</div>
                    <div className="text-black"><span className="font-semibold">Pet Friendly:</span> {property.petFriendly ? 'Yes' : 'No'}</div>
                    <div className="text-black"><span className="font-semibold">Furnished:</span> {property.furnished ? 'Yes' : 'No'}</div>
                </div>
            </div>
        </div>
        <div className=" w-full h-auto flex items-start justify-start text-white text-2xl ">
            <div className='border-1 border-gray-300 rounded-xl p-6 w-1/2 gap-8'>
                <h4 className="text-lg font-bold text-black mb-2">Nearby Amenities</h4>
                <ul className="text-base text-black">
                    {property.amenities.map((amenity, index) => (
                        <li key={index} className="mb-1">• {amenity}</li>
                    ))}
                </ul>
            </div>
        </div>
        <div className=" h-auto flex items-start justify-start text-white text-2xl mt-1 border-1 border-gray-300 rounded-xl p-6 w-1/2">
            <div>
                <h4 className="text-lg font-bold text-black mb-2 ">Agent Contact</h4>
                <div className="text-base text-black">
                    <p><span className="font-semibold">Name:</span> {property.agent.name}</p>
                    <p><span className="font-semibold">Phone:</span> {property.agent.phone}</p>
                    <p><span className="font-semibold">Email:</span> {property.agent.email}</p>
                </div>
            </div>
        </div>
    </div>
    </>
    )
}

export default FocusedFav