
import React from 'react';
import { Link } from 'react-router-dom';
import {
  BsCart3, BsGrid1X2Fill, BsFillArchiveFill, BsFillGrid3X3GapFill, BsPeopleFill,
  BsListCheck, BsMenuButtonWideFill, BsFillGearFill, BsHouseDoorFill
} from 'react-icons/bs';

const Sidebar = ({ openSidebarToggle, OpenSidebar }) => {
  return (
    <aside id="sidebar" className={openSidebarToggle ? "sidebar-responsive" : ""}>
      <div className='sidebar-title'>
        <div className='sidebar-brand'>
          <BsCart3 className='icon_header' /> Iticket
        </div>
        <span className='icon close_icon' onClick={OpenSidebar}>X</span>
      </div>
      <ul className='sidebar-list'>
        <li className='sidebar-list-item'>
          <Link to="/">
            <BsHouseDoorFill className='icon' /> Home
          </Link>
        </li>
        <li className='sidebar-list-item'>
          <Link to="/dashboard">
            <BsGrid1X2Fill className='icon' /> Dashboard
          </Link>
        </li>
        <li className='sidebar-list-item'>
          <Link to="/events">
            <BsFillArchiveFill className='icon' /> Events
          </Link>
        </li>
        <li className='sidebar-list-item'>
          <Link to="/orders">
            <BsFillGrid3X3GapFill className='icon' /> Orders
          </Link>
        </li>
        <li className='sidebar-list-item'>
          <Link to="/customers">
            <BsPeopleFill className='icon' /> Customers
          </Link>
        </li>
        <li className='sidebar-list-item'>
          <Link to="/add-ticket">
            <BsListCheck className='icon' /> Add Event
          </Link>
        </li>
        <li className='sidebar-list-item'>
          <Link to="/add-hall">
            <BsListCheck className='icon' /> Add Hall
          </Link>
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;
