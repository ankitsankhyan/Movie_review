import React,{useEffect, useState} from 'react'
import Container from '../container'
import Forminput from '../form/Forminput'
import Title from '../form/title'
import Submit from '../form/Submit'
import CustomLink from '../form/CustomLink'
import { CommonModalClass } from '../../utils/theme'
import FormContainer from '../form/formContainer'

import { useAuth } from '../../hooks/theme'
import { useNavigate } from 'react-router-dom'
const Signin = () => {
  const navigate = useNavigate();

 
  const [userInfo , setUserInfo] = useState({});
  const {handleLogin, authInfo} = useAuth();
  
  useEffect(() => {
    if(authInfo.isLoggedIn){
      navigate('/', {replace:true});
    }
  });

  const {isPending} = authInfo;
   const onsubmitHandler = async(e) => {
    e.preventDefault();
    console.log(userInfo);
   handleLogin(userInfo.email, userInfo.password);
  //  navigate('/');

 
   }
  const handleChange = (e) => {
    console.log(userInfo);
    setUserInfo({...userInfo, [e.target.name]:e.target.value});
    
  }
      
  return (

   <FormContainer>
    <Container>
      <form onSubmit={onsubmitHandler} className={ CommonModalClass +' w-80 px-4 pt-10 pb-4 rounded-md gap-y-2 '}>
      <Title>Sign in</Title>
      <Forminput label = 'Email' type = 'text' onChange={handleChange} name='email' />
      <Forminput label = 'Password' type='password' onChange={handleChange} name = 'password'/>
       
        <Submit name = 'submit' label = 'submit' className='m-12' busy = {isPending} />
       

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