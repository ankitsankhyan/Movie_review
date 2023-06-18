import React from 'react'

const Submit = ({label, className}) => {
  console.log(className)
  return (
    <button className={'dark:bg-secondary bg-white border  border-black dark:border-white px-[4.70rem] py-2 rounded-md dark:hover:bg-slate-300 hover:bg-black dark:hover:border-black hover:text-white dark:hover:text-black dark:text-white text-black font-semibold transition ' + className}  type='submit'>
        {label} 
   </button>
  )
}

export default Submit