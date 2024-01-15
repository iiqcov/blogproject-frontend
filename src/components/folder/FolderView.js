import React, { useState, useEffect } from 'react';
import axios from 'axios';

const FolderList = ({ folderInput, setFolderInput }) => {
    const [data, setData] = useState([]);
    const [input, setInput] = useState('');
    let firstSlashInput = false;

    useEffect(() => {
        const fetchData = async () => {
            const result = await axios('http://localhost:8080/folders');
            console.log(result.data);
            setData(result.data);
        };
        fetchData();
    }, []);

    const handleInputChange = (e) => {
        setFolderInput(e.target.value);
    };

    const flattenFolders = (data) => {
        let allFolders = [...data];
        data.forEach(folder => {
          if (folder.subFolders) {
            allFolders = [...allFolders, ...flattenFolders(folder.subFolders)];
          }
        });
        return allFolders;
      };
      

    const renderContentBasedOnInput = () => {
        if (input) {
            const inputParts = input.split('/');
            if (inputParts.length === 2) {
                if (!firstSlashInput) {
                    firstSlashInput = true;
                    return data.map((item) => {
                        if (item.name && item.name.startsWith(inputParts[1])) {
                            return <div key={item.id}>{item.name}</div>;
                        }
                        return null;
                    });
                }
            } else if (inputParts.length > 2) {
                const parentFolderName = inputParts[inputParts.length - 2];
                const currentInput = inputParts[inputParts.length - 1];
                const folders = flattenFolders(data);
                const parentFolder = folders.find((item) => item.name === parentFolderName);
                if (parentFolder && parentFolder.subFolders) {
                    const subFolders = parentFolder.subFolders.map((subFolder) => {
                        if (subFolder && subFolder.name && subFolder.name.startsWith(currentInput)) {
                            return <div key={subFolder.id}>{subFolder.name}</div>;
                        }
                        return null;
                    });
                    return subFolders.some(subFolder => subFolder !== null) ? subFolders : <div>null</div>;
                } else {
                    return <div>null</div>;
                }
            } else {
                return data.map((item) => {
                    if (item.name && item.name.includes(input)) {
                        return <div key={item.id}>{item.name}</div>;
                    }
                    return null;
                });
            }
        }
        return null;
    };

    return (
        <div>
            <input type="text" value={input} onChange={handleInputChange} />
            {renderContentBasedOnInput()}
        </div>
    );
};

export default FolderList;