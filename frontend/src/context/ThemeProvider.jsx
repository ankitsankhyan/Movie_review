import React from 'react'
import { createContext } from 'react'
export const ThemeContext = createContext()

export default function ThemeProvider({children}) {
 const toggleTheme = ()=>{
  document.documentElement.classList.toggle('dark');

 }
  return (
      
    <ThemeContext.Provider value={{toggleTheme}}>
        {children}
    </ThemeContext.Provider>
        )
}

