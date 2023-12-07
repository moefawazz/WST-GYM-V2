import React from 'react'

const Cards = ({ text, icon, count }) => {
  return (
    <div className='w-full p-[1.5rem] border-2 border-red rounded-[1rem]'>
        <div className='flex items-center justify-between text-[1.5rem]'>
            <div>{text}</div>
            <div className='text-[2.5rem]'>{icon}</div>
        </div>
        <div className='mt-5 text-[1.25rem]'>
            {count}
        </div>
    </div>
  )
}

export default Cards