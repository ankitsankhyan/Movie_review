import React from 'react'

const Forminput = ({label ,type, name, placeholder, className,...rest}) => {
  console.log(type);
  return (
    <div className='flex flex-col-reverse'>
    <input type={type}
     id={name} 
     name={name}
     className={'peer bg-transparent border foucs:border-md text-black dark:text-white dark:border-dark-subtle px-2 py-1 rounded-md transition ' + className}
     placeholder={placeholder}
     {...rest}/>

   <label htmlFor={label}
    className={'peer-focus:font-semibold transition text-black dark:text-white ' + className}>{label}</label>
    </div>

  )
}

export default Forminput