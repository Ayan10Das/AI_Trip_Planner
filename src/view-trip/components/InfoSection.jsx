import React, { useEffect, useState } from 'react'
import axios from 'axios';

function InfoSection({ trip }) {
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
        setImageUrl(photo?.src?.large2x || '/travel-3.jpg');
      } catch (err) {
        console.error('Failed to fetch image from Pexels:', err);
        setImageUrl('/travel-3.jpg');
      }
    };

    fetchImage();
  }, [destination]);

  return (
    <div>
      {/* Main Image */}
      <img
        src={imageUrl}
        alt="travel"
        className="h-[250px] md:h-[370px] w-full object-cover rounded-xl mt-0"
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = "/travel-3.jpg";
        }}
      />

      {/* Info Badges */}
      <div className="my-2 flex flex-wrap gap-2">
        {[
          { label: '🚂Destination', value: trip?.userSelection?.Destination },
          { label: '📅Days', value: trip?.userSelection?.noOfDays },
          { label: '💰Budget', value: trip?.userSelection?.budget },
          { label: '🥂Traveler', value: trip?.userSelection?.traveler },
          { label: '💲Currency', value: trip?.TripData?.currency },
        ].map((item, idx) => (
          <div
            key={idx}
            className="transition delay-150 duration-300 ease-in-out 
              hover:bg-gray-500 hover:text-white hover:scale-105 hover:translate-y-1
              p-1 border font-medium rounded-xl flex-1 min-w-[120px] text-center
              hover:shadow-xl h-auto"
          >
            {item.label} : {item.value}
          </div>
        ))}
      </div>
    </div>
  );
}

export default InfoSection;
