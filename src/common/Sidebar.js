import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Folder from '../components/folder/Folder';
import '../styles/Sidebar.css'

const Sidebar = () => {
  const [folders, setFolders] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8080/folders')
      .then(response => {
        setFolders(response.data);
      })
      .catch(error => {
        console.error('Failed to fetch folders', error);
      });
  }, []);

  return (
    <div className="sidebar">
      {folders && folders.map(folder => 
        <Folder key={folder.id} folder={folder} />
      )}
    </div>
  );
};

export default Sidebar;
