import React, { useEffect, useState } from 'react'
import axios from 'axios';
// import { useEffect, useState } from 'react';
// import {useState, useEffect} from 'react'


function InfoSection({ trip }) {

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
        setImageUrl(photo?.src?.large2x || '/travel-3.jpg');
      } catch (err) {
        console.error('Failed to fetch image from Pexels:', err);
        setImageUrl('/travel-3.jpg'); // fallback if API fails
      }
    };

    fetchImage();
  }, [destination]);

  return (

    <div >


      <img src={imageUrl}
        alt="travel"
        className='h-[370px] w-full object-cover rounded-xl mt-0'
        onError={(e) => {
          e.target.onerror = null
          e.target.src = "/travel-3.jpg"
        }}
      />



      <div className='my-2 flex gap-2'>
        <div className='transition delay-150 duration-300 ease-in-out hover:bg-gray-500 hover:text-white hover:scale-x-105 hover:translate-y-1  mh-[120px] mw-[560px] p-2 border font-medium rounded-xl flex justify-center hover:shadow-xl'> 🚂Destination : {trip?.userSelection?.Destination} </div>
        <div className='transition delay-150 duration-300 ease-in-out hover:bg-gray-500 hover:text-white hover:scale-x-105 hover:translate-y-1 mh-[120px] mw-[560px] p-2 border font-medium rounded-xl flex justify-center'> 📅Days : {trip?.userSelection?.noOfDays} </div>
        <div className='transition delay-150 duration-300 ease-in-out hover:bg-gray-500 hover:text-white hover:scale-x-105 hover:translate-y-1 mh-[120px] mw-[560px] p-2 border font-medium rounded-xl flex justify-center'> 💰Budget : {trip?.userSelection?.budget} </div>
        <div className='transition delay-150 duration-300 ease-in-out hover:bg-gray-500 hover:text-white hover:scale-x-105 hover:translate-y-1 mh-[120px] mw-[560px] p-2 border font-medium rounded-xl flex justify-center'> 🥂Traveler : {trip?.userSelection?.traveler} </div>
        <div className='transition delay-150 duration-300 ease-in-out hover:bg-gray-500 hover:text-white hover:scale-x-105 hover:translate-y-1 mh-[120px] mw-[560px] p-2 border font-medium rounded-xl flex justify-center'> 💲Currency : {trip?.TripData?.currency} </div>
      </div>



    </div>
  )
}


export default InfoSection;