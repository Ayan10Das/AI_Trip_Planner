import React from 'react'
import { FaRegCopyright } from 'react-icons/fa6';

function Footer() {
  return (
    <div className='mt-7 w-full flex justify-center'>
        <div className='flex gap-1 justify-center align-middle min-w-[190px] max-h-[50px]'>

      <FaRegCopyright/><p>All copyright's reserved</p> 
        </div>
    </div>
  )
}

export default Footer