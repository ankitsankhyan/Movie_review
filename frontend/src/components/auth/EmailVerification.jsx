import React, { useEffect, useRef } from 'react'
import Container from '../container'
import Forminput from '../form/Forminput'
import Title from '../form/title'
import Submit from '../form/Submit'
import CustomLink from '../form/CustomLink'
import {useState} from 'react'

const Verification = () => {
  const otp_length = 6
  const [otp, setOtp] = useState(new Array(otp_length).fill('1'));
  const [activeOtpIndex, setActiveOtpIndex] = useState(0);
  const inputRef = useRef(null);
 
  const handleOtpChange = ({target},index) => {
    // console.log(e.target.value);
    console.log(target.value);
    const {value} = target;
    const newOtp = [...otp];
    newOtp[index] = value.substr(value.length-1, value.length);
    console.log(value,target);
    setOtp([...newOtp]);

    if(value !== '' && activeOtpIndex < otp_length-1 ){
     
      setActiveOtpIndex(index + 1);
    }
  

    
    
    // this is wrong way as inputRef is a ojbect not value
    // inputRef = otp[activeOtpIndex];
   
    
  }
  useEffect(() => {
    inputRef.current?.focus();
  }
  ,[activeOtpIndex])
  return (
    <div className='bg-secondary w-screen h-screen -z-10 inset-0 fixed flex flex-col-reverse items-center  justify-center gap-1 text-white'>
    <Container>
   
      
     
      <form action="" className='flex flex-col items-center bg-primary w-84 px-4 pt-10 pb-4 rounded-md gap-y-4 '>
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
            onKeyDown={(e)=>{
             
              const val = e.key;
           if(e.key === 'Backspace' && index > 0){
            otp[activeOtpIndex] = '';
                  setOtp([...otp]);
                 
                  // setActiveOtpIndex(index - 1);
                
           }
           
          
           const isNumber = /^\d$/.test(val);
           if(!isNumber && e.key !== 'Backspace'){
              e.preventDefault();
           }
            }}
           className='w-12 h-12 border-2 bg-transparent rounded-sm mx-1 outline-none text-center  border-dark-subtle'   />
     
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