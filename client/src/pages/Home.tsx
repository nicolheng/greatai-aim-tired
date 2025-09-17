import React from 'react'
import Sidebar from '../components/Sidebar'
import Cards from '../components/Cards'

const listings = [
  {
    id: 1,
    title: 'Modern Family Home',
    image: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&w=400&q=80',
    price: '$450,000',
    location: 'Suburbia, Springfield',
    tags: ['4 Bed', '3 Bath', 'Garage'],
    isNew: true,
    description: 'Spacious modern home with open plan living and large backyard.'
  },
  {
    id: 2,
    title: 'Downtown Apartment',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80',
    price: '$320,000',
    location: 'Downtown, Metropolis',
    tags: ['2 Bed', '1 Bath', 'City View'],
    isNew: false,
    description: 'Cozy apartment in the heart of the city, close to all amenities.'
  },
  {
    id: 3,
    title: 'Country Cottage',
    image: 'https://images.unsplash.com/photo-1460518451285-97b6aa326961?auto=format&fit=crop&w=400&q=80',
    price: '$275,000',
    location: 'Countryside, Greenfield',
    tags: ['3 Bed', '2 Bath', 'Garden'],
    isNew: true,
    description: 'Charming cottage surrounded by nature, perfect for a quiet retreat.'
  },
  {
    id: 3,
    title: 'Country Cottage',
    image: 'https://images.unsplash.com/photo-1460518451285-97b6aa326961?auto=format&fit=crop&w=400&q=80',
    price: '$275,000',
    location: 'Countryside, Greenfield',
    tags: ['3 Bed', '2 Bath', 'Garden'],
    isNew: true,
    description: 'Charming cottage surrounded by nature, perfect for a quiet retreat.'
  },
  {
    id: 3,
    title: 'Country Cottage',
    image: 'https://images.unsplash.com/photo-1460518451285-97b6aa326961?auto=format&fit=crop&w=400&q=80',
    price: '$275,000',
    location: 'Countryside, Greenfield',
    tags: ['3 Bed', '2 Bath', 'Garden'],
    isNew: true,
    description: 'Charming cottage surrounded by nature, perfect for a quiet retreat.'
  },
  {
    id: 3,
    title: 'Country Cottage',
    image: 'https://images.unsplash.com/photo-1460518451285-97b6aa326961?auto=format&fit=crop&w=400&q=80',
    price: '$275,000',
    location: 'Countryside, Greenfield',
    tags: ['3 Bed', '2 Bath', 'Garden'],
    isNew: true,
    description: 'Charming cottage surrounded by nature, perfect for a quiet retreat.'
  },
]

function Home() {
  return (
    <div className='m-4 flex gap-4'>
      <Sidebar/>
      <div className='flex-1 justify-center items-center'>
        <Cards listings={listings}/>
      </div>

    </div>
  )
}

export default Home

