import React from 'react'
import {ImSpinner3} from 'react-icons/im'
const Submit = ({label, className,busy}) => {

  return (
    <button className={'dark:bg-secondary bg-white border  border-black dark:border-white px-[4.70rem] py-2 rounded-md dark:hover:bg-slate-300 hover:bg-black dark:hover:border-black hover:text-white dark:hover:text-black dark:text-white text-black font-semibold transition ' + className}  type='submit'>
        {busy?<ImSpinner3 className='animate-spin'/>:label}
   </button>
  )
}

export default Submit