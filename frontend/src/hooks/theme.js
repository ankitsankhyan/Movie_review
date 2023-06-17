
import { ThemeContext } from '../context/ThemeProvider'
import { useContext } from 'react'

// this is custome hook which will be imported and in on shot we can access theme and method
export const useTheme =()=> useContext(ThemeContext);


