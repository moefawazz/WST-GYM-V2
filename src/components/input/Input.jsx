import React from 'react'

const Input = ({type, placeholder, width, onChange, value}) => {
  return (
    <input type={type} placeholder={placeholder} onChange={onChange} value={value}
    className={`px-[1.25rem] py-[0.63rem] border-2 border-red rounded-[0.25rem] ${width} bg-transparent`}/>
  )
}

export default Input