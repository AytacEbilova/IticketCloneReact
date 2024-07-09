// src/pages/MainRoot.jsx
import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../Sidebar';
import Header from '../Header';

const MainRoot = ({ isAuthenticated }) => {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };

  return (
    <div className='grid-container'>
      {isAuthenticated && <Header OpenSidebar={OpenSidebar} />}
      {isAuthenticated && <Sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar} />}
      <Outlet />
    </div>
  );
};

export default MainRoot;
