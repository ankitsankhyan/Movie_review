import React from 'react'

// beware of spelling mistakes
// This is the container where we will pass the all html and classNames 

const container = ({className, children}) => {
   
  return (
    <div className={"max-w-screen-xl mx-auto "  + className}>
  {children}
    </div>
  )
}

export default container