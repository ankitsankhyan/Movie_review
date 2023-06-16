import React from 'react'
import {BsFillSunFill} from 'react-icons/bs'
import Container from '../container'
const navbar = () => {
  return (
    <>
    <div className="bg-primary shadow-2xl  shadow-dark-subtle/5 ">
    
    <Container className="p-2">
      <div className="flex flex-row justify-between items-center text-white font-sans text-xl font-semibold">
        <img src="./logo.png" alt="" className="h-10" />
        <ul className="flex justify-between items-center md:gap-2">
          <li>
            <button className="bg-dark-subtle p-1 rounded-sm">
              <BsFillSunFill className="text-secondary" size={24} />
            </button>
          </li>
          <li>
            <input
              type="text"
              placeholder="search..."
              className="bg-black border-2 border-dark-subtle focus:border-white py-1 px-2 w-20 md:w-60 md:px-4 mx-[0.8rem] rounded-md text-white"
            />
          </li>
          <li>Log in</li>
        </ul>
      </div>
    </Container>
    </div>
  
  </>
      
  )
}

export default navbar