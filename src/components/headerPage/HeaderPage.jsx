import React from 'react'

const HeaderPage = ({title}) => {
  return (
    <div className='border-b-2 border-red flex justify-start py-[1.5rem] px-[5rem] text-[1.5rem] pt-[6.2rem]'>
        <h1>{title}</h1>
    </div>
  )
}

export default HeaderPage