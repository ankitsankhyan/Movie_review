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
    const handleLogin = async(email, password)=>{
           setAuthInfo({...authInfo, isPending:true});
        const {user,error} = await signin({email, password});
        
        if(error){
            console.log(error);
                setAuthInfo({...authInfo, error, isPending:false});
                return;
          }
        if(user){
            setAuthInfo({...authInfo, profile:{...user}, isLoggedIn:true, isPending:false});
            console.log(user);
        // console.log(data);
        localStorage.setItem('auth-token', user.jwt_token);
        }
          

    };

    const isAuth = async()=>{
        const token = localStorage.getItem('auth-token');
        if(!token){
            return;
        }
        setAuthInfo({...authInfo, isPending:true});
        const {error, user} = await getIsAuth(token);
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
        <AuthContext.Provider value={{authInfo, handleLogin,isAuth}}>{children}</AuthContext.Provider>
    );

};