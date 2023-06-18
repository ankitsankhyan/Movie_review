import React from 'react'
import Container from '../container'
import Forminput from '../form/Forminput'
import Title from '../form/title'
import Submit from '../form/Submit'
import CustomLink from '../form/CustomLink'
import { CommonModalClass } from '../../utils/theme'
import FormContainer from '../form/formContainer'
const Signin = () => {
 
    
      
  return (

   <FormContainer>
    <Container>
   
      
     
      <form action="" className={ CommonModalClass +' w-80 px-4 pt-10 pb-4 rounded-md gap-y-2 '}>
      <Title>Sign in</Title>
      <Forminput label = 'Email' type = 'text' name='Email' />
      <Forminput label = 'Password' type='password' name = 'Email'/>
       
        <Submit name = 'submit' label = 'submit' className='m-12' />
       

         <div className='flex justify-between w-full'>
     <CustomLink url='/auth/forgot-password'>Forgot Password</CustomLink>
      <CustomLink url='/auth/signup'>Sign up</CustomLink>
        </div>
      </form>
          
        
        </Container>
    </FormContainer>
      
      
  )
}

export default Signin;