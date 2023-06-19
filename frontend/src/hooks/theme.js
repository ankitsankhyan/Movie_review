
import { ThemeContext } from '../context/ThemeProvider'
import { useContext } from 'react'
import { NotificationContext } from '../context/notificationProvider';
import { AuthContext } from '../context/auth';
// this is custome hook which will be imported and in on shot we can access theme and method
export const useTheme =()=> useContext(ThemeContext);
export const useNotification =()=> useContext(NotificationContext);
export const useAuth =()=> useContext(AuthContext);


