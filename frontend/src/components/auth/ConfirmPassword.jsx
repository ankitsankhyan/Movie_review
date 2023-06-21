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
  const token = String(searchParams.get('token'));
  const id = String(searchParams.get('id'));
  const navigate = useNavigate();
  console.log(token,id);
  const [password, setPassword] = useState({
    one:'',
    two:''
  });
  const submitHandler = (e)=>{
    e.preventDefault();
    console.log(password);
    password.one = password.one.trim();
    password.two = password.two.trim();
    if(password.one.length === 0){
      return updateNotification('error','Password cannot be empty');
    }
    if(password.one.length < 8){
      return updateNotification('error','Password must be atleast 8 characters');
    }
    if(password.one !== password.two){
      return updateNotification('error','Password does not match');
    }
  }
  const handleChange = (e)=>{
    console.log(e.target.name);
    setPassword({...password,[e.target.name]:e.target.value});
    console.log(password);

  }
  // isvalid token , isVerifying, !isValid
  useEffect(()=>{
     
   isValidToken();
   
  },[]);
  const isValidToken = async()=>{
  
    if(!token || !id){ 
      console.log('running ');
      if(isVerifying){
        setIsVerifying(false);
      }
      
       
      return navigate('/auth/reset-password',{replace:true});
    }
    console.log(token,id, 'near post');
    const {err, valid} = await verifyPasswordResetToken(token, id);
    setIsVerifying(false);
   
  
    if (err) {
      navigate("/auth/reset-password", { replace: true });
      return updateNotification("error", err);
    }

    if (!valid) {
      setIsValid(false);
   
      return navigate("/auth/reset-password", { replace: true });
    }else{
      setIsValid(true);
      updateNotification("success", "Token verified successfully");
    }
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


  if(!isValid){
  return(  <FormContainer>
    <Container>
    <h1 className='text-4xl font-semibold dark:text-white text-primary'>Invalid Token Please Try Again</h1>
      </Container>
    </FormContainer>
  );
  }

  return (
   
    <FormContainer>
    <Container>
   
      
     
      <form action="" onSubmit={submitHandler} className={ CommonModalClass + ' w-80 px-4 pt-10 pb-4 rounded-md gap-y-2 '}>
      <Title className='mb-9'>Enter New Password</Title>
      <Forminput onChange = {handleChange} label = 'New Password' type = 'password' name='one'  placeholder='*********' />
      <Forminput onChange = {handleChange} label = 'confirm Password' type='password' name = 'two' placeholder='*********'/>
       
        <Submit name = 'Confirm' label = 'submit' className='m-12' />
      </form>
        </Container>
    </FormContainer>
  )
}

export default ConfirmPassword