import React, { useState, useEffect } from "react";
import { FaMapMarked } from "react-icons/fa";
import { Link } from "react-router-dom";
import axios from "axios";

function PlaceCard({ places, currency }) {
  if (!places?.place) return;

  const [imageUrl, setImageUrl] = useState("");
  const destination = places?.place;

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const res = await axios.get("https://api.pexels.com/v1/search", {
          headers: {
            Authorization: import.meta.env.VITE_PEXELS_API,
          },
          params: {
            query: places?.place || "travel",
            per_page: 1,
          },
        });

        const photo = res.data.photos[0];
        setImageUrl(photo?.src?.large2x || "/travel-3.jpg");
      } catch (err) {
        console.error("Failed to fetch image from Pexels:", err);
        setImageUrl("/travel-3.jpg");
      }
    };

    fetchImage();
  }, [destination]);

  return (
    <Link
      to={
        "https://www.google.com/maps/search/?api=1&query=" + `${places?.place}`
      }
      target="_blank"
    >
      <div className="flex flex-col sm:flex-row bg-neutral-200 rounded-2xl shadow-lg hover:shadow-2xl overflow-hidden transition-transform duration-200 hover:scale-[1.02] w-full max-w-md mx-1">
        {/* Image */}
        <div className="relative w-full sm:w-[180px] h-[200px] sm:h-auto">
          <img
            src={imageUrl || "/travel-3.jpg"}
            alt={places?.place}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "/travel-3.jpg";
            }}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Content */}
        <div className="flex flex-col justify-between p-4 sm:p-5 flex-1">
          {/* Title & Description */}
          <div>
            <h2 className="text-lg sm:text-xl font-semibold text-gray-800 leading-snug">
              {places?.place}
            </h2>
            <p className="text-sm text-gray-600 mt-1 sm:whitespace-normal sm:overflow-visible sm:text-clip">{places?.details}</p>
          </div>

          {/* Info Pills */}
          <div className="mt-3 space-y-2">
            <div className="bg-gray-50 hover:bg-gray-500 transition delay-75 duration-100 hover:text-white rounded-lg px-3 py-2 text-sm font-medium text-gray-700 flex items-center">
              🕙 Travel time: {places?.travel_time_minutes} min
            </div>
            <div className="bg-gray-50 hover:bg-gray-500 transition delay-75 duration-100 hover:text-white rounded-lg px-3 py-2 text-sm font-medium text-gray-700 flex items-center">
              🎟️ Ticket price: {places?.ticket_price} {currency}
            </div>
            <div className="bg-gray-50 hover:bg-gray-500 transition delay-75 duration-100 hover:text-white rounded-lg px-3 py-2 text-sm font-medium text-gray-700 flex items-center">
              ⭐ Rating: {places?.rating}
            </div>
          </div>

          {/* Map Icon */}
          <div className="mt-3 flex items-center text-indigo-600 hover:text-indigo-800">
            <FaMapMarked className="text-lg sm:text-xl" />
            <span className="ml-1 text-sm font-medium">View on Map</span>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default PlaceCard;

