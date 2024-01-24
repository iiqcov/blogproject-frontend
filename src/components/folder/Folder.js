import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import '../../styles/Folder.css'

const Folder = ({ folder, level = 0 }) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleToggle = (e) => {
    e.stopPropagation();
    setIsOpen(!isOpen);
  };

  const handleClick = (e) => {
    e.stopPropagation();
    navigate(`/${folder.name}`);
  };

  const hasSubFolders = folder.subFolders && folder.subFolders.length > 0;

  return (
    <div className={`folder level${level}`} style={{ marginLeft: `${level * 20}px` }} onClick={handleClick}>
      <p>
        {hasSubFolders && <span className="toggle" onClick={handleToggle}>{isOpen ? '▾' : '▸'}</span>} 
        <span className="name">{folder.name}</span>
      </p>
      {isOpen && hasSubFolders && folder.subFolders.map(subFolder => 
        <Folder key={subFolder.id} folder={subFolder} level={level + 1} />
      )}
    </div>
  );
};

export default Folder;
