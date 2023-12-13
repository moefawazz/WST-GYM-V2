import React from 'react'

const HeaderPage = ({title}) => {
  return (
    <div className='border-b-2 border-black flex justify-start py-[1.5rem] px-[1.5rem] text-[1.5rem] pt-[5.5rem]'>
        <h1 className='text-[1.7rem]'>{title}</h1>
    </div>
  )
}

export default HeaderPage