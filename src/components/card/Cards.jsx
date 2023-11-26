import React from 'react'

const Cards = ({ text, icon, count }) => {
  return (
    <div className='w-[30rem] p-[3rem] border-[0.2rem] border-red rounded-[1rem]'>
        <div className='flex items-center justify-between text-[1.5rem] font-semibold'>
            <div>{text}</div>
            {icon}
        </div>
        <div className='mt-5 text-[1.25rem]'>
            {count}
        </div>
    </div>
  )
}

export default Cards