import React from 'react'

const Submit = ({label}) => {
  return (
    <button className='my-12 bg-secondary border border-white px-[4.70rem] py-2 rounded-md hover:bg-slate-300 hover:border-black hover:text-black font-semibold transition'   type='submit'>
        {label} 
   </button>
  )
}

export default Submit