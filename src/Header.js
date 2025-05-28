import React, { useContext } from 'react'
import { FaLaptop, FaTabletAlt, FaMobileAlt } from 'react-icons/fa'
import { DataContext } from './context/Datacontext'

const Header = ({title}) => {
  const {width} =useContext(DataContext);
  return (
    <header className='Header'>
      <h1>{title}</h1>
      {width >= 1024 ? <FaMobileAlt/>
      : width >= 768 ? <FaTabletAlt/>
      : <FaLaptop/>}

    </header>
  )
}

export default Header
