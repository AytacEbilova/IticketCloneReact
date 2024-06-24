import React from 'react'
import Sidebar from '../Sidebar';
import Header from '../Header';
import { useState } from 'react';
import { Outlet } from 'react-router-dom';
const MainRoot = () => {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);
  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };
  return (
    <div>
       <div className='grid-container'>
        <Header OpenSidebar={OpenSidebar} />
        <Sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar} />
        <Outlet/>
      </div>
    </div>
  )
}

export default MainRoot