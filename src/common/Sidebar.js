import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/Sidebar.css'

const Folder = ({ folder, level = 0 }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const hasSubFolders = folder.subFolders && folder.subFolders.length > 0;

  return (
    <div style={{ marginLeft: `${level * 20}px` }}>
      <p onClick={hasSubFolders ? handleToggle : null} style={{ cursor: hasSubFolders ? 'pointer' : 'default' }}>
        {hasSubFolders && (isOpen ? '▾' : '▸')} {folder.name}
      </p>
      {isOpen && hasSubFolders && folder.subFolders.map(subFolder => 
        <Folder key={subFolder.id} folder={subFolder} level={level + 1} />
      )}
    </div>
  );
};

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
