import React from 'react'
import Container from '../container'
import Forminput from '../form/Forminput'
import Title from '../form/title'
import Submit from '../form/Submit'
import CustomLink from '../form/CustomLink'
import { CommonModalClass } from '../../utils/theme'
import FormContainer from '../form/formContainer'
import { useState } from 'react'
import axios from 'axios'
const Signup = () => {
  const [userInfo , setUserInfo] = useState({}) 

  const validateUserInfo = ({ name, email, password }) => {
    const isValidEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    const isValidName = /^[a-z A-Z]+$/;
  
    if (!name.trim()) return { ok: false, error: "Name is missing!" };
    if (!isValidName.test(name)) return { ok: false, error: "Invalid name!" };
  
    if (!email.trim()) return { ok: false, error: "Email is missing!" };
    if (!isValidEmail.test(email)) return { ok: false, error: "Invalid email!" };
  
    if (!password.trim()) return { ok: false, error: "Password is missing!" };
    if (password.length < 8)
      return { ok: false, error: "Password must be 8 characters long!" };
  
    return { ok: true };
  };
  var onsubmitHandler = async(e) => {
   const {ok,error}  = validateUserInfo(userInfo);
    console.log(userInfo);
    e.preventDefault();
    if (!ok) return console.log(error);
    console.log(userInfo);
//  const data = await axios.post('/api/auth/signup', userInfo)
  //  console.log(data);
  }
  const handleChange = (e) => {
    console.log(e.target.value);
    // this is updating the state
    setUserInfo({...userInfo, [e.target.name]: e.target.value})
  }
  return (
   <FormContainer>
    <Container>
   
      
     
      <form action="" onSubmit={onsubmitHandler} className={ CommonModalClass + ' w-80 px-4 pt-10 pb-4 rounded-md gap-y-2 '}>
      <Title>Sign up</Title>
      <Forminput label = 'Name' type = 'text' name='name' onChange = {handleChange} />
      <Forminput label = 'Email' type = 'text' name='email' onChange={handleChange}/>
      <Forminput label = 'Password' type='password' name = 'password' onChange = {handleChange}/>
       
        <Submit name = 'submit' label = 'submit'className='my-12' />
       

         <div className='flex justify-between w-full'>
         <CustomLink url='/auth/forgot-password'>Forgot Password</CustomLink>
      <CustomLink url='/auth/signin'>Sign in</CustomLink>
        </div>
      </form>
          
        
        </Container>
        </FormContainer>
  )
}

export default Signup