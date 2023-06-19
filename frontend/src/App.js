
import './App.css';

import Signin from './components/auth/signin';
import Signup from './components/auth/signup';
import { Route,Routes } from 'react-router-dom';
import Home from './components/user/Home';
import EmailVerification from './components/auth/EmailVerification';
import ForgotPassword from './components/auth/ForgotPassword';
import ConfirmPassword from './components/auth/ConfirmPassword';
function App() {
  return (
  <>

  <Routes>
    <Route path="/" element={<Home/>}>
    <Route path="/auth/signin" element={<Signin/>}/>
    <Route path="/auth/signup" element={<Signup/>}/>
    <Route path="/auth/verification" element={<EmailVerification/>}/>
    <Route path="/auth/forgot-password" element={<ForgotPassword/>}/>
    <Route path="/auth/confirm-password" element={<ConfirmPassword/>}/>
    <Route path="*" element={<h1>404 Not Found</h1>}/>
    </Route>
    
  </Routes>
  
  </>
  

 
  );
}

export default App;
