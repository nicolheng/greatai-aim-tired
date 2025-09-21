import Map from './Map';
import React from 'react';
import { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import CardCarousel from './CardCarousel';
import DetailsAmenities from './DetailsAmenities';

// Property data that matches the favorites array from MasonaryCards
const propertyData = {
    1: {
        id: 1,
        image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb',
        images: [
            'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&h=600',
            'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600',
            'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&h=600',
            'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&h=600',
            'https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800&h=600'
        ],
        title: 'Downtown Apartment',
        address: 'Menara UOA Bangsar, Jalan Bangsar Utama 1, 59000 Kuala Lumpur, Malaysia',
        description: 'A quiet place in the heart of the city with modern amenities and great access to public transportation. This spacious apartment features high ceilings, large windows, and a beautiful view of the city skyline. Residents enjoy a vibrant urban lifestyle with nearby cafes, parks, and shopping centers. The building offers 24/7 security, a fully equipped gym, and a rooftop garden for relaxation. Ideal for professionals and families seeking convenience and comfort in Kuala Lumpur.',
        price: '$2,500,000',
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
        amenities: ['Hospital - 0.5 miles', 'Elementary School - 0.3 miles', 'Grocery Store - 0.2 miles', 'Shopping Mall - 1.2 miles'],
        developer: 'Sime Darby Property',
        developerLogo: 'https://upload.wikimedia.org/wikipedia/commons/4/4b/Sime_Darby_Property_logo.png'
    },
    2: {
        id: 2,
        image: 'https://images.unsplash.com/photo-1494526585095-c41746248156',
        images: [
            'https://images.unsplash.com/photo-1494526585095-c41746248156?w=800&h=600',
            'https://images.unsplash.com/photo-1560184897-ae75f418493e?w=800&h=600',
            'https://images.unsplash.com/photo-1571547942658-b747d7b2e3e8?w=800&h=600',
            'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&h=600'
        ],
        title: 'Walkers Delight',
        address: 'Residensi Desa ParkCity, Jalan Residen 3, Desa ParkCity, 52200 Kuala Lumpur, Malaysia',
        description: 'Perfect for those who love to stroll through tree-lined streets and enjoy neighborhood charm. This cozy apartment offers an open-concept living area, modern kitchen appliances, and a private balcony overlooking lush greenery. The community is pet-friendly and features walking trails, playgrounds, and a vibrant local market. With excellent schools and healthcare facilities nearby, this property is ideal for singles or couples looking for a peaceful yet connected lifestyle.',
        price: '$1,800,000',
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
        amenities: ['Hospital - 1.2 miles', 'High School - 0.4 miles', 'Grocery Store - 0.1 miles', 'Coffee Shop - 0.05 miles'],
        developer: 'SP Setia',
        developerLogo: 'https://upload.wikimedia.org/wikipedia/commons/c/cf/S_P_Setia_logo.png'
    },
    3: {
        id: 3,
        image: 'https://images.unsplash.com/photo-1460518451285-97b6aa326961',
        images: [
            'https://images.unsplash.com/photo-1460518451285-97b6aa326961?w=800&h=600',
            'https://images.unsplash.com/photo-1541123603104-512919d6a96c?w=800&h=600',
            'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=800&h=600',
            'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600',
        ],
        title: 'Country Cottage',
        address: 'Eco Majestic, Jalan Eco Majestic 1, 43500 Semenyih, Selangor, Malaysia',
        description: 'Escape to peaceful countryside living with this charming cottage surrounded by nature. The home boasts rustic wooden finishes, a spacious garden, and a sunlit breakfast nook. Enjoy weekends exploring nearby nature trails, local farms, and artisanal markets. The property is perfect for families or retirees seeking tranquility, fresh air, and a close-knit rural community. Modern amenities blend seamlessly with classic cottage charm, making this a true sanctuary.',
        price: '$1,200,000',
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
        amenities: ['Hospital - 5.2 miles', 'Country School - 2.1 miles', 'Farm Market - 1.5 miles', 'Nature Trail - 0.3 miles'],
        developer: 'EcoWorld',
        developerLogo: 'https://upload.wikimedia.org/wikipedia/commons/3/39/EcoWorld.png'
    },
    4: {
        id: 4,
        image: 'https://images.unsplash.com/photo-1472220625704-91e1462799b2',
        images: [
            'https://images.unsplash.com/photo-1472220625704-91e1462799b2?w=800&h=600',
            'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600',
            'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=800&h=600'
        ],
        title: 'Lakeside Haven',
        address: 'Sunway South Quay, Jalan Lagoon Selatan, 47500 Subang Jaya, Selangor, Malaysia',
        description: 'Serenity by the water\'s edge awaits you in this lakeside haven. Wake up to stunning sunrise views over the lake and enjoy evenings on your private terrace. The property features contemporary interiors, energy-efficient appliances, and access to exclusive marina facilities. Residents benefit from a vibrant social scene, water sports, and scenic jogging paths. This is an exceptional opportunity for those who appreciate nature, recreation, and a relaxed lifestyle.',
        price: '$220,000',
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
        amenities: ['Hospital - 2.1 miles', 'Lake Access - 0.1 miles', 'Marina - 0.5 miles', 'Hiking Trail - 0.2 miles'],
        developer: 'Sunway Property',
        developerLogo: 'https://upload.wikimedia.org/wikipedia/commons/7/76/Sunway_logo.png'
    },
    5: {
        id: 5,
        image: 'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd',
        images: [
            'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?w=800&h=600',
            'https://images.unsplash.com/photo-1574362848149-11496d93a7c7?w=800&h=600',
            'https://images.unsplash.com/photo-1562438668-bcf0ca6578f0?w=800&h=600',
            'https://images.unsplash.com/photo-1585128792020-803d29415281?w=800&h=600',
            'https://images.unsplash.com/photo-1527772482340-7895c3f2b3f7?w=800&h=600'
        ],
        title: 'Modern Loft',
        address: 'The Troika, Persiaran KLCC, 50450 Kuala Lumpur, Malaysia',
        description: 'Chic urban vibes with modern comfort define this stylish loft. The open-plan layout is complemented by floor-to-ceiling windows, designer lighting, and smart home technology. Located in the heart of the city, you are steps away from world-class dining, entertainment, and cultural attractions. The building offers concierge services, a rooftop pool, and secure parking. Perfect for young professionals or couples who value sophistication and convenience.',
        price: '$300,000',
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
        amenities: ['Hospital - 0.8 miles', 'Art Gallery - 0.2 miles', 'Rooftop Bar - 0.1 miles', 'Subway - 0.3 miles'],
        developer: 'IJM Land',
        developerLogo: 'https://en.wikipedia.org/wiki/IJM_Corporation#/media/File:IJM_Corporation.png'
    },
    6: {
        id: 6,
        image: 'https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a',
        images: [
            'https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?w=800&h=600',
            'https://images.unsplash.com/photo-1551632436-cbf8dd35adfa?w=800&h=600',
            'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800&h=600',
            'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=800&h=600',
            'https://images.unsplash.com/photo-1464822759844-d150baec93e5?w=800&h=600'
        ],
        title: 'Mountain Retreat',
        address: 'Cameron Highlands Resort, Tanah Rata, 39000 Cameron Highlands, Pahang, Malaysia',
        description: 'Breathtaking views and fresh air await at this mountain retreat. The spacious home features a cozy fireplace, expansive decks, and large windows that frame panoramic mountain vistas. Enjoy hiking, skiing, and exploring local tea plantations just minutes from your door. The property is designed for comfort and relaxation, with modern amenities and rustic charm. Ideal for families or anyone seeking a peaceful escape from city life.',
        price: '$1,500,000',
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
        amenities: ['Hospital - 10 miles', 'Mountain Trail - 0.1 miles', 'Ski Resort - 5 miles', 'General Store - 2 miles'],
        developer: 'Mah Sing Group',
        developerLogo: 'https://upload.wikimedia.org/wikipedia/commons/2/2c/Mahsing_logo.png'
    },
    7: {
        id: 7,
        image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb',
        images: [
            'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&h=600',
            'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&h=600',
            'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&h=600',
            'https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800&h=600'
        ],
        title: 'Downtown Apartment',
        address: 'The Face Suites, Jalan Sultan Ismail, 50250 Kuala Lumpur, Malaysia',
        description: 'A quiet place in the heart of the city, this apartment offers a blend of luxury and convenience. Enjoy elegant interiors, a gourmet kitchen, and access to premium building facilities including a swimming pool and fitness center. The location provides easy access to business districts, shopping malls, and public transport. Whether you are a busy professional or a small family, this property delivers comfort, security, and a vibrant urban lifestyle.',
        price: '$2,000,000',
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
        amenities: ['Hospital - 0.5 miles', 'Elementary School - 0.3 miles', 'Grocery Store - 0.2 miles', 'Shopping Mall - 1.2 miles'],
        developer: 'UEM Sunrise',
        developerLogo: 'https://upload.wikimedia.org/wikipedia/commons/b/b4/UEM_Sunrise_Logo.png'
    }
} as const;

function FocusedFav() {

    const { id } = useParams<{ id: string }>();

    // Get property data based on ID from URL
    const propertyId = parseInt(id || '1') as keyof typeof propertyData;
    const property = propertyData[propertyId] || propertyData[1];

   

    return (
    <>
    <div className="flex flex-col md:w-[90vw] w-[100vw] mx-auto m-0 p-0 min-h-screen justify-self-center md:p-10 pt-0 mt-10 gap-0 md:gap-4 ">
        <div className="relative justify-center w-full h-auto ">
            {/* <img src={property.image} alt={property.title} className="object-cover w-full h-full rounded-4xl" />
            <div className="absolute flex bottom-0 right-0 w-[15vw] h-[10vw] rounded-4xl bg-cyan-200 z-2 mb-4 mr-4 overflow-hidden justify-center items-center place-items-center m-auto border-2 border-gray-600">
                <Map newLocation={[101.7001903848135,3.055492032127826]} isIdle={isIdle} setZoom={15.3} setPitch={70}/> */}
            {/* add newLocation coords into Map when backend provides */}
            {/* </div>  */}
            <CardCarousel images={property.images} />
        </div>
        {/* Responsive grid: 1 col on mobile, 3 on md+ */}
        <div className="grid md:grid-cols-3 grid-cols-1 gap-0 md:gap-8 w-full h-auto items-start">
            <div className="grid items-start justify-start text-white text-xl md:text-2xl border-1 col-span-2 border-gray-300 rounded-xl p-4 md:p-6 ">
                <h2 className="font-bold pb-1 text-black">{property.title}</h2>
                <p className="text-sm text-gray-700 mt-1">{property.address}</p>
                
                <p className="text-lg font-semibold text-gray-500 mt-2">{property.price}</p>
            </div>
            <div className="border-1 border-gray-300 rounded-xl items-start justify-start text-white text-xl md:text-2xl p-4">
                <h2 className="text-black text-lg font-bold">Attributes</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 text-base pb-4 gap-2 md:gap-4">
                    <div className="text-black badge badge-md"><span className="font-semibold ">Bedrooms:</span> {property.bedrooms}</div>
                    <div className="text-black badge badge-md"><span className="font-semibold">Bathrooms:</span> {property.bathrooms}</div>
                    <div className="text-black badge badge-md"><span className="font-semibold">Sq Ft:</span> {property.sqft}</div>
                    <div className="text-black badge badge-md"><span className="font-semibold">Parking:</span> {property.parking}</div>
                    <div className={`text-black badge badge-md badge-soft ${property.petFriendly ? 'badge-success' : 'badge-error'}`}>
                        <span className="font-semibold">Pet Friendly</span> 
                    </div>
                    <div className={`text-black badge badge-md badge-soft ${property.furnished ? 'badge-success' : 'badge-error'}`}>
                        <span className="font-semibold">Furnished</span>
                    </div>
                </div>
            </div>
        </div>
        {/* Responsive grid: 1 col on mobile, 3 on md+ */}
        <div className='grid md:grid-cols-3 grid-cols-1 gap-0 md:gap-8 w-full h-auto items-start'>
            <div className="flex items-start justify-start text-white text-xl md:text-2xl col-span-2">
                <div className='border-1 border-gray-300 rounded-xl p-4 md:p-6 w-full gap-8'>
                    <h4 className="text-lg font-bold text-black mb-2">About This Home</h4>
                    <h4 className="text-base text-black">{property.description}</h4>
                    <div className='mt-8'><DetailsAmenities amenities={[...property.amenities]} /></div>
                </div>
            </div>
            <div className="flex text-white text-xl md:text-2xl mt-1 border-1 border-gray-300 rounded-xl p-4 w-full">
                <div className='w-full'>
                    <h4 className="text-lg font-bold text-black">Agent Contact</h4><br/>
                    <div className="text-base text-black ">
                        <div className='flex flex-col sm:flex-row gap-4'>
                            <div className="skeleton h-24 w-24 md:h-32 md:w-32 rounded-full"/>
                            <div className='my-auto'>
                                <p className="font-bold"><span></span> {property.agent.name}</p>
                                <p ><span>Phone:</span> {property.agent.phone}</p>
                                <p ><span>Email:</span> {property.agent.email}</p>
                            </div>
                        </div>
                    </div>
                    <button className="mt-4 w-full px-4 btn text-white bg-indigo-600 hover:bg-indigo-700">Contact Now</button>
                </div>
            </div>
        </div>
        {/* Responsive grid: 1 col on mobile, 3 on md+ */}
        <div className='grid md:grid-cols-3 grid-cols-1 gap-0 md:gap-8 w-full h-auto'>
            <div className="flex items-start justify-start text-white text-xl md:text-2xl col-span-2">
                <div className='border-1 border-gray-300 rounded-xl md:mb-0 mb-[15vh] p-4 md:p-6 w-full gap-8'>
                    <h4 className="text-lg font-bold text-black mb-2">Developer</h4>
                    <div className="flex items-center gap-4">
                        <img
                            src={property.developerLogo}
                            alt={property.developer + " logo"}
                            className="h-auto w-32 md:w-52 object-contain bg-white rounded p-1 border"
                        /><br/>
                    </div>
                    <p className="text-base text-black">{property.developer}</p>
                </div>
            </div>
        </div>
    </div>
    </>
    )
}

export default FocusedFav