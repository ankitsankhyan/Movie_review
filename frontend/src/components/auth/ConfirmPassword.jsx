import React from 'react'
import Container from '../container'
import Forminput from '../form/Forminput'
import Title from '../form/title'
import Submit from '../form/Submit'
import { CommonModalClass } from '../../utils/theme'
import FormContainer from '../form/formContainer'
const ConfirmPassword = () => {
  return (
    <FormContainer>
    <Container>
   
      
     
      <form action="" className={ CommonModalClass + ' w-80 px-4 pt-10 pb-4 rounded-md gap-y-2 '}>
      <Title className='mb-9'>Enter New Password</Title>
      <Forminput label = 'New Password' type = 'password' name='Email' placeholder='*********' />
      <Forminput label = 'confirm Password' type='password' name = 'Email' placeholder='*********'/>
       
        <Submit name = 'Confirm' label = 'submit' className='m-12' />
       

    
      </form>
          
        
        </Container>
    </FormContainer>
  )
}

export default ConfirmPassword