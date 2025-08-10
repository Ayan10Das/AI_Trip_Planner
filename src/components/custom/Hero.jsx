import React from 'react'
import { Button } from '../ui/button'
import {Link} from 'react-router-dom'

function Hero() {
  return (
    <div className='flex flex-col gap-10 items-center mx-50'>
      <h2
      className='font-extrabold text-[50px] text-center mt-15'
      ><span className='text-[#cb3009] custom'>Discover Your Next Adventure With AI:</span> 
      {" "}Personalized Itineraries at Your Fingerprint
      </h2>
      <p className='text-2xl text-center font-medium text-gray-700'>
        Your personal trip planner and travel curator,creating custom itineraries tailored to your interests and budget.
      </p>

      <Link to={'/create-trip'}>
      <Button className="transition delay-80 duration-105 place-self-end-safe hover:scale-102 cursor-pointer">Get Started, it's FREE!</Button>
      </Link>
      <img src="/image2.png" alt="img" className='w-full rounded shadow'/>

    </div>
  )
}

export default Hero