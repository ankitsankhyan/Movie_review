import { createContext } from "react";
import { useState } from "react";
import { signin } from "../api/auth";
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
        const {error,user} = await signin({email, password});
          if(error){
                setAuthInfo({...authInfo, error, isPending:false});
                return;
          }
            setAuthInfo({...authInfo, profile:{...user}, isLoggedIn:true, isPending:false});
        localStorage.setItem('auth-token', user.token);

    };
    return (
        <AuthContext.Provider value={{authInfo, handleLogin}}>{children}</AuthContext.Provider>
    );

};