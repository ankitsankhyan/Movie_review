// ###############################################imports##########################################################
import React, { useEffect, useRef } from 'react'
import Container from '../container'

import Title from '../form/title'
import Submit from '../form/Submit'
import CustomLink from '../form/CustomLink'
import {useState} from 'react'
import { CommonModalClass } from '../../utils/theme'
import FormContainer from '../form/formContainer'
import { useLocation , useNavigate} from 'react-router-dom'
import { verifyEmail } from '../../api/auth'
import { useNotification } from '../../hooks/theme'
import { useAuth } from '../../hooks/theme'



// ##############################################EmailVerification####################################################

const Verification = () => {
 
  const updateNotification = useNotification()
 const {isAuth,authInfo} = useAuth();
 const navigate = useNavigate()
 useEffect(() => {
  if(authInfo.isLoggedIn){
    navigate('/', {replace:true});
  }
},[ authInfo.isLoggedIn, isAuth, navigate])
 
  const {state} = useLocation();
 
  const user = state?.user;

  useEffect(() => {

  if(!user){
  
    navigate('/not-found');
  }
  },[state?.data, navigate, user]);
  const otp_length = 6
  const isValidOTP = (otp) => {
    const otpRegex = /^[0-9]{6}$/;
    return otpRegex.test(otp);

  }

  
  const [otp, setOtp] = useState(new Array(otp_length).fill('1'));
  const [activeOtpIndex, setActiveOtpIndex] = useState(0);
  const inputRef = useRef(null);
  const onsubmitHandler = async(e) => {
    e.preventDefault();
    const otpString = otp.join('');
    if(!isValidOTP(otpString)) return console.log('Invalid OTP');
   
    console.log(user.id);
    const data = await verifyEmail({user_id: user.id, otp: otpString});
    
    console.log(data.user.jwt_token);
    if(data.user.jwt_token){
      localStorage.setItem('auth-token', data.user.jwt_token);
    }
      
      isAuth();
      // authInfo.isLoggedIn = true;

    
    updateNotification('success', 'Email verified successfully');

    navigate('/auth/signin', { state: data }, { replace: true});
  }


  const handleNextInput = (index) => {
    if(index !== otp_length - 1){
      setActiveOtpIndex(index + 1);
    }else{
      setActiveOtpIndex(0);
    }
  }

  const handleprvInput = (index, key) => {
     if(key === 'Backspace'){
      const newOtp = [...otp];
      newOtp[index] = '';
      setOtp([...newOtp]);
     }
    if(index !== 0){
      setActiveOtpIndex(index - 1);
      
    }else{
      setActiveOtpIndex(otp_length - 1);
    }
  }
 
  const handleOtpChange = ({target},index) => {
    // console.log(e.target.value);
    console.log(target.value);
    const {value} = target;
    const newOtp = [...otp];
    // either we can use this line to restrict size of input 1 digit only or maxlength
    newOtp[index] = value.substr(value.length-1, value.length);
  
    setOtp([...newOtp]);

     if(value){
      handleNextInput(index);
      
     }
    
  }
  useEffect(() => {
    inputRef.current?.focus();
  }
  ,[activeOtpIndex])
  return (
   <FormContainer>
    <Container>
   
      
     
      <form onSubmit={onsubmitHandler} className={  CommonModalClass +' w-84 px-4 pt-10 pb-4 rounded-md gap-y-4 '}>
      <Title>Please Enter OTP to verify your account</Title>
      <p className='text-center text-dark-subtle'>OTP has been sent to your email</p>
      <div>
      {otp.map((_,index)=>{
        return (<input
           key={index}
           ref={activeOtpIndex === index ? inputRef : null}
           value={otp[index] || ''}
           
           onChange={(e)=>handleOtpChange(e,index)}
           maxLength={1}
          //  this is code to enter one digit only
            onKeyDown={(e)=>{
              if(e.key === 'Backspace'){
                console.log(index);
                handleprvInput(index,e.key);
              }else if(e.key === 'ArrowRight'){
                handleNextInput(index);
              }else if(e.key === 'ArrowLeft'){
                handleprvInput(index);
              }
            }}
           className='w-12 h-12 border-2 bg-transparent text-black dark:text-white rounded-sm mx-1 outline-none text-center  border-dark-subtle focus:border-white'   />
     
      );
})}
      </div>
   
    
       
        <Submit name = 'submit' label = 'Verify' className='w-full'/>
       

         <div className='flex justify-between w-full'>
         <CustomLink url='/auth/signin'>Sign in</CustomLink>
      <CustomLink url='/auth/signup'>Sign up</CustomLink>
        </div>
      </form>
          
        
        </Container>
        </FormContainer>
  )
}

export default Verification