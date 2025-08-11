import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';

function TripCard({ trip }) {

  const [imageUrl, setImageUrl] = useState('');
  const destination = trip?.userSelection?.Destination + "famous landmark tourism scenic";
  useEffect(() => {
    const fetchImage = async () => {
      try {
        const res = await axios.get('https://api.pexels.com/v1/search', {
          headers: {
            Authorization: import.meta.env.VITE_PEXELS_API, // 🔁 Replace with your key
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
        setImageUrl('/travel-3.jpg'); // fallback if API fails
      }
    };

    fetchImage();
    // console.log(typeof destination)
  }, [destination]);


  return (
    <div className='mt-5 hover:scale-103 rounded-xl min-h-[380px] border shadow-xl transition-all duration-105 delay-75 ease-out'>

      <Link to={'/view-trip/'+trip?.docId}>

      <img
        src={imageUrl}
        alt="travel"
        className='h-[250px] w-full object-cover rounded-xl mt-0 shadow'
        onError={(e) => {
          e.target.onerror = null
          e.target.src = "/travel-3.jpg"
        }}
        />
      <div className='mt-2 flex flex-col gap-2 justify-center p-1'>
        <h3 className='font-bold text-lg'>✈️{trip?.userSelection?.Destination}</h3>
        
      <div className='transition delay-150 duration-300 ease-in-out hover:bg-gray-500 hover:text-white hover:scale-x-105 hover:translate-y-1 mh-[120px] mw-[560px] p-2 border font-medium rounded-xl flex justify-center'> 📅Days : {trip?.userSelection?.noOfDays} </div>
      <div className='transition delay-150 duration-300 ease-in-out hover:bg-gray-500 hover:text-white hover:scale-x-105 hover:translate-y-1 mh-[120px] mw-[560px] p-2 border font-medium rounded-xl flex justify-center'> 💰Budget : {trip?.userSelection?.budget} </div>
      <div className='transition delay-150 duration-300 ease-in-out hover:bg-gray-500 hover:text-white hover:translate-y-1 mh-[120px] mw-[560px] p-2 border font-medium rounded-xl flex justify-center'> 🥂Traveler : {trip?.userSelection?.traveler} </div>
       
      </div>

        </Link>

        

    </div>
  )
}

export default TripCard