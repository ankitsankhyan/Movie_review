import React from 'react'
import Container from '../container'
import Forminput from '../form/Forminput'
import Title from '../form/title'
import Submit from '../form/Submit'
const signin = () => {
  return (
    <div className='bg-secondary w-screen h-screen -z-10 inset-0 fixed'>
    <Container>
   
      <div className='flex flex-col-reverse items-center w-full h-screen justify-center gap-1 text-white -z-10 '>
     
      <form action="" className='flex flex-col items-center bg-primary w-80 px-4 pt-10 pb-4 rounded-md gap-y-2 '>
      <Title>Sign in</Title>
      <Forminput label = 'Email' type = 'text' name='Email' />
      <Forminput label = 'Password' type='password' name = 'Email'/>
       
        <Submit name = 'submit' label = 'submit' />
       

         <div className='flex justify-between w-full'>
          <a href="google.com"  className='text-white hover:text-dark-subtle transition' >
            Forget Password
          </a>
         <a href="google.com" className='text-white hover:text-dark-subtle transition'>
            Sign up
         </a>
        </div>
      </form>
          
        </div>
     
          
        
         
    
          
        
        </Container>
    </div>
      
      
  )
}

export default signin