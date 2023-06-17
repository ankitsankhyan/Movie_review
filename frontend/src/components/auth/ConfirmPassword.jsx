import React from 'react'
import Container from '../container'
import Forminput from '../form/Forminput'
import Title from '../form/title'
import Submit from '../form/Submit'
import CustomLink from '../form/CustomLink'
const ConfirmPassword = () => {
  return (
    <div className='bg-secondary w-screen h-screen -z-10 inset-0 fixed flex flex-col-reverse items-center  justify-center gap-1 text-white'>
    <Container>
   
      
     
      <form action="" className='flex flex-col items-center bg-primary w-80 px-4 pt-10 pb-4 rounded-md gap-y-2 '>
      <Title>Enter New Password</Title>
      <Forminput label = 'New Password' type = 'password' name='Email' placeholder='*********'/>
      <Forminput label = 'confirm Password' type='password' name = 'Email' placeholder='*********'/>
       
        <Submit name = 'Confirm' label = 'submit' className='m-12' />
       

         <div className='flex justify-between w-full'>
     <CustomLink url='/auth/signin'>Sing in</CustomLink>
      <CustomLink url='/auth/signup'>Sign up</CustomLink>
        </div>
      </form>
          
        
        </Container>
    </div>
  )
}

export default ConfirmPassword