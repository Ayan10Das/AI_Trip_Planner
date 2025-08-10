import React, { useState, useEffect } from 'react'
import { FaMapMarked } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import axios from 'axios';


function PlaceCard({ places, currency }) {

    if (!places?.place) return;


    const [imageUrl, setImageUrl] = useState('');

    const destination = places?.place;

    useEffect(() => {
        const fetchImage = async () => {
            try {
                const res = await axios.get('https://api.pexels.com/v1/search', {
                    headers: {
                        Authorization: import.meta.env.VITE_PEXELS_API, // 🔁 Replace with your key
                    },
                    params: {
                        query: places?.place || 'travel',
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
        <Link to={'https://www.google.com/maps/search/?api=1&query=' + `${places?.place}`} target='_blank'>
            <div className='flex flex-col md:flex-row gap-2 transition-all duration-105 delay-50 ease-out hover:scale-x-105 shadow-xl hover:shadow-2xl border p-3 rounded-xl'>
                <img src={imageUrl || "/travel-3.jpg"}
                    alt='image'
                    onError={(e) => {
                        e.target.onerror = null
                        e.target.src = "/travel-3.jpg"
                    }}
                    className='h-[153px] w-[165px] rounded-xl ' />
                <div className='flex  gap-1 flex-wrap'>
                    <h2 className='font-bold text-lg text-gray-700'> {places?.place} </h2>
                    <p className='font-medium text-sm text-gray-600'> {places?.details} </p>
                    <p className='font-bold text-sm w-full text-gray-600 mt-1 border rounded-xl hover:bg-gray-500 transition-all delay-50 duration-100 ease-out hover:text-white p-1'> 🕙Travel time : {places?.travel_time_minutes} min</p>
                    <p className='font-bold text-sm text-gray-600 mt-1 w-full border rounded-xl hover:bg-gray-500 transition-all delay-50 duration-100 ease-out hover:text-white p-1'>🎟️ Ticket price : {places?.ticket_price} {currency} </p>
                    <p className='font-bold text-sm text-gray-600 mt-1 w-full border rounded-xl hover:bg-gray-500 transition-all delay-50 duration-100 ease-out hover:text-white p-1'> ⭐ Rating : {places?.rating} </p>
                    <div className='mx-1 mt-1'><FaMapMarked /></div>
                </div>
            </div>
        </Link>
    )
}

export default PlaceCard