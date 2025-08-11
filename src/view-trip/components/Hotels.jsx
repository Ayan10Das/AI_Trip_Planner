import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

function Hotels({ trip }) {
  const [imageUrls, setImageUrls] = useState([]);

  useEffect(() => {
    const accessKey = import.meta.env.VITE_UNPLASH_API;

    const fetchImages = async () => {
      if (!trip?.TripData?.hotels) return;

      const fetchPromises = trip.TripData.hotels.map(async (hotel) => {
        const query = `${hotel?.name} ${hotel?.address}`;
        try {
          const res = await fetch(
            `https://api.unsplash.com/photos/random?query=hotel+${encodeURIComponent(query)}&client_id=${accessKey}`
          );
          const data = await res.json();
          return data?.urls?.regular || '/src/assets/travel-3.jpg';
        } catch (error) {
          console.error('Image fetch error:', error);
          return '/travel-3.jpg'; // fallback
        }
      });

      const urls = await Promise.all(fetchPromises);
      setImageUrls(urls);
    };

    fetchImages();
  }, [trip?.TripData?.hotels]);

  return (
    <div>
      <h2 className="font-sans text-2xl font-medium mt-8">Hotels Recommendation</h2>

      {/* Responsive grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 mt-5">
        {trip?.TripData?.hotels?.map((hotel, idx) => (
          <div
            key={idx}
            className="shadow-xl rounded-xl p-0.5 hover:scale-105 transition-all delay-50 duration-100 hover:shadow-2xl"
          >
            <Link
              to={
                'https://www.google.com/maps/search/?api=1&query=' +
                `${hotel?.name}+","+${hotel?.address} `
              }
              target="_blank"
            >
              <div className="absolute z-10 transition-all duration-300 delay-75 ease-in-out bg-gray-600 rounded p-0.5 cursor-pointer hover:bg-gray-500 ">
                🔗
              </div>

              <img
                src={imageUrls[idx] || '/travel-3.jpg'}
                alt={hotel?.name}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = '/travel-3.jpg';
                }}
                className="rounded-xl shadow-2xl w-full h-[200px] sm:h-[230px] object-cover transition-all delay-75 duration-300 ease-in-out hover:scale-105"
              />
            </Link>

            <h2 className="mt-4 text-lg sm:text-xl font-medium px-0.5">🏨 {hotel?.name}</h2>
            <h2 className="mt-2 text-gray-600 font-medium px-0.5 text-sm sm:text-base">
              🗒️ {hotel?.description}
            </h2>
            <h2 className="my-2 text-gray-600 font-medium px-0.5 text-sm sm:text-base">
              📍 {hotel?.address}
            </h2>

            {/* Price and Rating Badges */}
            <div className="flex flex-wrap w-full gap-2 mt-1">
              <div className="flex-1 min-w-[120px] transition delay-50 duration-200 ease-in-out hover:bg-gray-600 hover:text-white hover:scale-105 hover:translate-y-0.5 p-2 border font-medium rounded-xl text-center">
                🏷️ {hotel?.price} {trip?.TripData?.currency}
              </div>
              <div className="flex-1 min-w-[120px] transition delay-50 duration-200 ease-in-out hover:bg-gray-600 hover:text-white hover:scale-105 hover:translate-y-0.5 p-2 border font-medium rounded-xl text-center">
                ⭐ {hotel?.rating}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Hotels;
