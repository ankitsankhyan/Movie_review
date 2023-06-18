import React from 'react'

const 
FormContainer = ({children}) => {
  return (
    <div className='dark:bg-secondary bg-level-1 w-screen h-screen -z-10 inset-0 fixed flex flex-col-reverse items-center  justify-center gap-1 '>
        {children}
    </div>
  )
}

export default FormContainer;