import React from 'react'
import PlaceCard from './PlaceCard'


function PlacesToVisit({trip}) {
  return (
    <div>
    <h2 className='font-sans text-xl md:text-2xl font-light md:font-medium mt-8'>Places To Visit</h2>

    <div>
    {trip?.TripData?.itinerary.map((item,idx)=>(
        <div key={idx} className='mt-2 p-2'>
            <h2 className='font-medium text-black text-xl'> Day :{item?.day} </h2>

            <div className='grid grid-cols-2 gap-5 mt-2'>
                {item?.plan?.map((places,idx)=>(
                   <div key={idx} className='mt-1'>
                   <div className='my-1.5'>🕧 Best time: {places.best_time}</div>
                    <PlaceCard places={places} currency={trip?.TripData?.currency}/>
                   </div> 
                ))}
            </div>
        </div>
    ))}
    </div>

    </div>
  )
}

export default PlacesToVisit