import React from 'react'

const Button = ({title, onClick, width}) => {
  return (
    <button className={`rounded-[3.125rem] bg-orange px-[1.5rem] py-[0.43rem] text-white hover:bg-orange2 ${width}`} onClick={onClick}>{title}</button>
  )
}

export default Button