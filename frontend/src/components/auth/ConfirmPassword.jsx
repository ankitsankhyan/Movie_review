import React, { useEffect } from 'react'
import Container from '../container'
import Forminput from '../form/Forminput'
import Title from '../form/title'
import Submit from '../form/Submit'
import { CommonModalClass } from '../../utils/theme'
import FormContainer from '../form/formContainer'
import { Navigate, useSearchParams } from 'react-router-dom'
import { useState } from 'react'
import { CgSpinnerTwoAlt } from 'react-icons/cg'
import { verifyPasswordResetToken } from '../../api/auth'
import { useNotification } from '../../hooks/theme'
import { useNavigate } from 'react-router-dom'
// ###########################  component ##############################


const ConfirmPassword = () => {
  const [isVerifying, setIsVerifying] = useState(true);
  const [isValid, setIsValid] = useState(false);
  const updateNotification = useNotification();
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const id = searchParams.get('id');
  const navigate = useNavigate();
  console.log(token, id);
  // isvalid token , isVerifying, !isValid
  useEffect(()=>{

    isValidToken();
  });
  const isValidToken = async()=>{
    console.log(isValid);
    if(!token || !id){ 
      console.log('running ');
      if(isVerifying){
        setIsVerifying(false);
      }
      
      
      return navigate('/auth/reset-password',{replace:true});
    }
    const {err, valid} = await verifyPasswordResetToken({token, id});
   
    if(err) return updateNotification({type:'error', message:err});
    if(!valid) return navigate('/auth/reset-password',{replace:true});
    console.log('running and changing state');
    setIsValid(true);
  }

  if(!isValid){
  return(  <FormContainer>
    <Container>
    <h1 className='text-4xl font-semibold dark:text-white text-primary'>Invalid Token Please Try Again</h1>
      </Container>
    </FormContainer>
  );
  }
 if(isVerifying){
  return (
    <FormContainer>
    <Container>
      <div className="flex space-x-2 items-center">
      <h1 className='text-4xl font-semibold dark:text-white text-primary'>Please  wait we are verifying token</h1>
      <CgSpinnerTwoAlt className='animate-spin text-5xl'/>
      </div>

      </Container>
    </FormContainer>
  )
 }
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