import React from 'react'
import Container from '../container'
const signin = () => {
  return (
    <div className='bg-secondary w-screen h-screen -z-10 inset-0 fixed'>
    <Container>
    
      <div className='flex flex-col-reverse items-center w-full h-screen justify-center gap-1 text-white -z-10 '>
      <form action="" className='flex flex-col-reverse items-center bg-primary px-12 py-20 rounded-md'>
      <button className='my-12 bg-secondary border border-white px-[4.70rem] py-2 rounded-md hover:bg-slate-300 hover:border-black hover:text-black font-semibold'   type='submit'>
          Submit
         </button>
          <input type="text" id='passowrd'  className='peer bg-transparent border border-dark-subtle px-2 py-1 rounded-md'/>
        <label htmlFor="passowrd" className='peer-focus:text-white'>Password</label>
          <input type="text" id='email' className='peer bg-transparent border border-dark-subtle px-2 py-1 rounded-md'/>
        <label htmlFor="email" className='peer-focus:text-white'>Email</label>
      </form>
          
        </div>
     
          
        
         
    
          
        
        </Container>
    </div>
      
      
  )
}

export default signin