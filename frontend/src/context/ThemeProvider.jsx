import React, { useEffect } from 'react'
import { createContext } from 'react'
export const ThemeContext = createContext()

export default function ThemeProvider({children}) {
 const toggleTheme = ()=>{
  document.documentElement.classList.toggle('dark');
  localStorage.setItem('theme', document.documentElement.classList.contains('dark') ? 'dark' : 'light');

 }
 useEffect(() => {
  const theme = localStorage.getItem('theme');
   document.documentElement.classList.add(theme);

 },[]);
  return (
      
    <ThemeContext.Provider value={{toggleTheme}}>
        {children}
    </ThemeContext.Provider>
        )
}

