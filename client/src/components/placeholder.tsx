import React from 'react'
import Loader from './ui/loader'

const Placeholder = ({text}: {text ?: string}) => {
  return (
    <div className='flex flex-col justify-center items-center space-y-2'>
      <h1 className='text-3xl text-white font-bold'>{text}</h1>
      <Loader />
    </div>
  )
}

export default Placeholder