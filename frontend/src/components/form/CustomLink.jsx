import React from 'react'
import { Link } from 'react-router-dom'

function CustomLink({children, url}) {
  return (
  <Link to={url} className='text-white hover:text-dark-subtle transition'>
  {children}
  </Link>
  )
}

export default CustomLink
