import React from 'react'
import Container from '../container'
import Forminput from '../form/Forminput'
import Title from '../form/title'
import Submit from '../form/Submit'
import CustomLink from '../form/CustomLink'
const ForgotPassword = () => {
  return (
    <div className='bg-secondary w-screen h-screen -z-10 inset-0 fixed flex flex-col-reverse items-center  justify-center gap-1 text-white'>
    <Container>
   
      
     
      <form action="" className='flex flex-col items-center bg-primary w-80 px-4 pt-10 pb-4 rounded-md gap-y-4 '>
      <Title>Please Enter your Email</Title>
      <Forminput label = 'Email' type = 'text' name='Email' className='w-56 py-[0.4rem]'/>
    
       
        <Submit name = 'submit' label = 'Send link'/>
       

         <div className='flex justify-between w-full'>
         <CustomLink url='/auth/signin'>Sign in</CustomLink>
      <CustomLink url='/auth/signup'>Sign up</CustomLink>
        </div>
      </form>
          
        
        </Container>
    </div>
  )
}

export default ForgotPassword