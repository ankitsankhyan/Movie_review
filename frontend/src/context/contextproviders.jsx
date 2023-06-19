import React from 'react'
import { AuthProvider } from './auth'
import { NotificationProvider } from './notificationProvider'
import  ThemeProvider  from './ThemeProvider'
function Contextprovider({children}) {
  return (
    <AuthProvider>
    <NotificationProvider>
    <ThemeProvider>
    {children}
    </ThemeProvider>
    </NotificationProvider>
    </AuthProvider>
  )
}

export default Contextprovider
