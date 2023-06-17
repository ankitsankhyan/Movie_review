import React from 'react'
import Navbar from './navbar'
import { Outlet } from 'react-router-dom'
const Home = () => {
  return (
   <>
   <Navbar />
    <Outlet/>
   </>
  )
}

export default Home