import { createContext, useEffect } from "react";
import { useState } from "react";
import { getIsAuth, signin } from "../api/auth";

export const AuthContext = createContext();
const defaultAuthInfo = {
    profile:null,
    isLoggedIn:false,
    isPending:false,
    error:''
};

export const AuthProvider = ({ children }) => {

   
    const [authInfo, setAuthInfo] = useState({...defaultAuthInfo});
   
    
    // handle Login
    const handleLogin = async(email, password)=>{
           setAuthInfo({...authInfo, isPending:true});
           let data =await signin({email, password});
           console.log(data, 'data from context')
        const {user,error} = data; 
        console.log(error);
        console.log(user, error, 'inside context');
        if(error){
               
                setAuthInfo({...authInfo, error, isPending:false});
                return {error, success:false}
          }
        if(user){
            setAuthInfo({...authInfo, profile:{...user}, isLoggedIn:true, isPending:false});
          
         
        localStorage.setItem('auth-token', user.jwt_token);
        return {err:null, success:true}
        }
          

    };
// ###################################Logout###################################################

const handleLogout = ()=>{
    setAuthInfo({...defaultAuthInfo});
    localStorage.removeItem('auth-token');
}

    // checks if user token is present in local storage
    const isAuth = async()=>{
        const token = localStorage.getItem('auth-token');
        console.log(token);
        if(!token){
           
            return;
        }
       
        setAuthInfo({...authInfo, isPending:true});
        
        const {error, user} =  token?await getIsAuth(token):{error:'token not found'};
      
        if(error){
            setAuthInfo({...authInfo, error, isPending:false});
            return;
      }
      setAuthInfo({...authInfo, profile:{...user}, isLoggedIn:true, isPending:false});

    }

    useEffect(()=>{
        isAuth();
    },[]);
    return (
        <AuthContext.Provider value={{authInfo, handleLogin,isAuth,handleLogout}}>{children}</AuthContext.Provider>
    );

};