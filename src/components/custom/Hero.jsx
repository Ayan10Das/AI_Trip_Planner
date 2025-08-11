import React from 'react'
import { Button } from '../ui/button'
import { Link } from 'react-router-dom'

function Hero() {
  return (
    <div className='flex flex-col gap-8 items-center px-4 md:px-16 lg:px-32 max-w-7xl mx-auto mt-10'>

      <h2 className='font-extrabold text-2xl md:text-5xl text-center mt-6 leading-snug'>
        <span className='text-[#cb3009]'>Discover Your Next Adventure With AI:</span>{" "}
        Personalized Itineraries at Your Fingertips
      </h2>

      <p className='text-lg md:text-2xl text-center font-medium text-gray-700 max-w-3xl'>
        Your personal trip planner and travel curator, creating custom itineraries tailored to your interests and budget.
      </p>

      <Link to={'/create-trip'}>
        <Button className='px-6 py-3 text-base md:text-lg transition transform delay-75 duration-100 hover:scale-105 cursor-pointer'>
          Get Started, it&apos;s FREE!
        </Button>
      </Link>

      <img
        src="/image2.png"
        alt="Adventure"
        className='w-full max-w-md md:max-w-full h-auto rounded-lg shadow-lg mt-4'
      />

    </div>
  )
}

export default Hero
