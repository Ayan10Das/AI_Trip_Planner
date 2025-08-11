import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';

function TripCard({ trip }) {
  const [imageUrl, setImageUrl] = useState('');
  const destination = trip?.userSelection?.Destination + " famous landmark tourism scenic";

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const res = await axios.get('https://api.pexels.com/v1/search', {
          headers: {
            Authorization: import.meta.env.VITE_PEXELS_API,
          },
          params: {
            query: destination || 'travel',
            per_page: 1,
          },
        });

        const photo = res.data.photos[0];
        setImageUrl(photo?.src?.large || '/travel-3.jpg');
      } catch (err) {
        console.error('Failed to fetch image from Pexels:', err);
        setImageUrl('/travel-3.jpg');
      }
    };

    fetchImage();
  }, [destination]);

  return (
    <div className='mt-5 hover:scale-[1.03] rounded-xl min-h-[380px] w-full sm:w-auto border shadow-xl transition-all duration-150 ease-out'>
      <Link to={'/view-trip/' + trip?.docId}>
        
        {/* Image */}
        <img
          src={imageUrl}
          alt="travel"
          className='h-[200px] sm:h-[220px] md:h-[250px] w-full rounded-t-xl object-cover'
          onError={(e) => {
            e.target.onerror = null
            e.target.src = "/travel-3.jpg"
          }}
        />

        {/* Content */}
        <div className='mt-2 flex flex-col gap-2 p-2'>
          <h3 className='font-bold text-sm sm:text-base md:text-lg truncate'>✈️ {trip?.userSelection?.Destination}</h3>

          <div className='transition hover:bg-gray-500 hover:text-white hover:scale-105 hover:translate-y-1 text-xs sm:text-sm md:text-lg p-2 border font-medium rounded-xl flex justify-center items-center'>
            📅 Days : {trip?.userSelection?.noOfDays}
          </div>

          <div className='transition hover:bg-gray-500 hover:text-white hover:scale-105 hover:translate-y-1 text-xs sm:text-sm md:text-lg p-2 border font-medium rounded-xl flex justify-center items-center'>
            💰 Budget : {trip?.userSelection?.budget}
          </div>

          <div className='transition hover:bg-gray-500 hover:text-white hover:scale-105 hover:translate-y-1 text-xs sm:text-sm md:text-lg p-2 border font-medium rounded-xl flex justify-center items-center'>
            🥂 Traveler : {trip?.userSelection?.traveler}
          </div>
        </div>
      </Link>
    </div>
  )
}

export default TripCard
