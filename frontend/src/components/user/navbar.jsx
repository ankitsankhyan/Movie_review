import React from 'react'
import {BsFillSunFill} from 'react-icons/bs'
import Container from '../container'
import { Link } from 'react-router-dom'
import { useTheme } from '../../hooks/theme'


const Navbar = () => {

  const {toggleTheme} = useTheme();


  return (
    <>
    <div className=" bg-white  dark:bg-primary shadow-2xl  shadow-dark-subtle/5 ">
    
    <Container className="p-2">
      <div className="flex flex-row justify-between items-center text-white font-sans text-xl font-semibold">
        <Link to = '/'>
        <img src="/logo.png" alt="" className="h-10 w-20" />
        </Link>
       
        <ul className="flex justify-between items-center md:gap-2">
          <li>
            <button onClick={toggleTheme} className="bg-dark-subtle p-1 rounded-sm">
              <BsFillSunFill className="text-secondary" size={24} />
            </button>
          </li>
          <li>
            <input
              type="text"
              placeholder="search..."
              className="  dark:bg-black border-2 border-dark-subtle focus:border-white py-1 px-2 w-20 md:w-60 md:px-4 mx-[0.8rem] rounded-md text-white"
            />
          </li>
          <li><Link to='auth/signin'>Log in</Link></li>
        </ul>
      </div>
    </Container>
    </div>
  
  </>
      
  )
}

export default Navbar