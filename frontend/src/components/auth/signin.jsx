import React,{useEffect, useState} from 'react'
import Container from '../container'
import Forminput from '../form/Forminput'
import Title from '../form/title'
import Submit from '../form/Submit'
import CustomLink from '../form/CustomLink'
import { CommonModalClass } from '../../utils/theme'
import FormContainer from '../form/formContainer'
import {CgSpinnerTwoAlt} from 'react-icons/cg'
import { useAuth } from '../../hooks/theme'
import { useNavigate } from 'react-router-dom'
import { useNotification } from '../../hooks/theme'
const Signin = () => {
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const updateNotification = useNotification();
 
  const [userInfo , setUserInfo] = useState({});
  const {handleLogin, authInfo} = useAuth();
  
 

  useEffect(() => {
  
    if(authInfo.isLoggedIn){
      navigate('/', {replace:true});
    }else{
      setLoading(false);
    }
  },[authInfo.isLoggedIn,navigate])

  const {isPending} = authInfo;
   const onsubmitHandler = async(e) => {
    e.preventDefault();
  console.log('handle long is called');
  const {err,success} = await handleLogin(userInfo.email, userInfo.password);
  if(err){
      updateNotification('error', err);
  }
 console.log(success, err, 'sigin check');
  if(success){
    updateNotification('success', 'Login successful');
  }
  //  navigate('/');

 
   }
  const handleChange = (e) => {
  
    setUserInfo({...userInfo, [e.target.name]:e.target.value});
    
  }  
 if(loading){
    return(
      <div className='flex justify-center items-center h-screen'>
        <CgSpinnerTwoAlt className='animate-spin text-5xl'/>
      </div>
    )

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