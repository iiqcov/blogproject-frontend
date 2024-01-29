import React, { useState, useEffect } from 'react';
import {useApi} from '../api/api';

import Folder from '../components/folder/Folder';
import UserInfo from '../components/UserInfo';

import menuicon from '../assets/menu_FILL0_wght400_GRAD0_opsz24.svg'

import '../styles/Sidebar.css'


const Sidebar = () => {
  const [folders, setFolders] = useState([]);
  const [isOpen, setIsOpen] = useState(window.innerWidth > 1000); 

  const api=useApi();

  useEffect(() => {
    const handleResize = () => {
      setIsOpen(window.innerWidth > 1000);
    };
  
    window.addEventListener('resize', handleResize);
  
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  
  

  useEffect(() => {
    api.get('/folders')
      .then(response => {
        setFolders(response.data);
      })
      .catch(error => {
        console.error('Failed to fetch folders', error);
      });
  }, [api]);

  return (
    <>
      <div className="menu-icon" onClick={() => setIsOpen(!isOpen)}>
        <img src={menuicon} alt="Menu Icon" />
      </div>
      <div className={`side-bar ${isOpen ? 'open' : ''}`}> 
        <UserInfo/>
        {folders && folders.map(folder => 
          <Folder key={folder.id} folder={folder} />
        )}
      </div>
    </>
  );
};

export default Sidebar;
