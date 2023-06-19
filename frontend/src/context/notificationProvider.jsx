
import { createContext } from 'react'
import { useState } from 'react'
export const NotificationContext = createContext();

export const NotificationProvider = ({children}) => {
  
  const [notification, setNotification] = useState('');
  const [classes, setClasses] = useState('');
  let id = null;
  const updateNotification = (type, value) => {
    if (id) clearTimeout(id);
         switch (type) {
          case 'error':setClasses('bg-red-500');
          break;
          case 'success':setClasses('bg-green-500');
          break;
          case 'warning':setClasses('bg-yellow-500');
          break;
          default:setClasses('bg-gray-500');
  }
  setNotification(value);
  id = setTimeout(() => {
    setNotification('');
  },3000)
}
    return(
        <NotificationContext.Provider  value={updateNotification}>
            {children}
            {notification && 
       (<div className="fixed left-1/2 -translate-x-1/2 top-24 ">
        <div className={"bounce-custom shadow-md shadow-gray-400 rounded "}>
          <p className={"text-white px-4 py-2 font-semibold " + classes }>
            {notification}
          </p>
        </div>
      </div>)}
        </NotificationContext.Provider>
    )
        


}