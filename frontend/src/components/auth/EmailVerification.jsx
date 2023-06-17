import React, { useEffect, useRef } from 'react'
import Container from '../container'

import Title from '../form/title'
import Submit from '../form/Submit'
import CustomLink from '../form/CustomLink'
import {useState} from 'react'

const Verification = () => {
  const otp_length = 6
  const [otp, setOtp] = useState(new Array(otp_length).fill('1'));
  const [activeOtpIndex, setActiveOtpIndex] = useState(0);
  const inputRef = useRef(null);
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
    <div className='dark:bg-secondary w-screen h-screen -z-10 inset-0 fixed flex flex-col-reverse items-center  justify-center gap-1 text-white'>
    <Container>
   
      
     
      <form action="" className='flex flex-col items-center dark:bg-primary w-84 px-4 pt-10 pb-4 rounded-md gap-y-4 '>
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
           className='w-12 h-12 border-2 bg-transparent rounded-sm mx-1 outline-none text-center  border-dark-subtle focus:border-white'   />
     
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
    </div>
  )
}

export default Verification