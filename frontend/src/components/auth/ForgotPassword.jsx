import React from 'react'
import Container from '../container'
import Forminput from '../form/Forminput'
import Title from '../form/title'
import Submit from '../form/Submit'
import CustomLink from '../form/CustomLink'
import { CommonModalClass } from '../../utils/theme'
import { useState } from 'react'
import FormContainer from '../form/formContainer'
import { forgetPassword } from '../../api/auth'
import { isValidEmail } from '../../utils/helper'
import { useNotification } from '../../hooks/theme'

// #########################################functional compenent###############################################
const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const handleChange = (e) => {
    setEmail(e.target.value);

  }
  const updateNotification = useNotification();
  const handleSubmit =async (e) => {
    e.preventDefault();
  
    if(!isValidEmail(email)) return updateNotification('error', 'Invalid email');

     const {err,message} = await forgetPassword(email);
  
     if(message){
      updateNotification('success',message);
     }
    
    if(err){
      updateNotification('error', err);
    }
    
    
   
  }
  return (
  <FormContainer>
    <Container>
   
      
     
      <form action="" onSubmit={handleSubmit} className={ CommonModalClass + ' w-80 px-4 pt-10 pb-4 rounded-md gap-y-4 '}>
      <Title>Please Enter your Email</Title>
      <Forminput label = 'Email' onChange = {handleChange} type = 'text' name='Email' className='w-56 py-[0.4rem]'/>
    
       
        <Submit name = 'submit' label = 'Send link'/>
       

         <div className='flex justify-between w-full'>
         <CustomLink url='/auth/signin'>Sign in</CustomLink>
      <CustomLink url='/auth/signup'>Sign up</CustomLink>
        </div>
      </form>
          
        
        </Container>
    
    </FormContainer>
  )
}

export default ForgotPassword