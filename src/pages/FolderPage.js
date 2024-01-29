import React from "react";
import { useParams } from "react-router-dom"; 
import ArticleList from "../components/ArticleList";

const FolderPage = () => {
  const { folderName } = useParams(); 
  const url = `/folder/${folderName}`; 

  return (
    <div>
      <ArticleList url={url} />
    </div>
  );
}

export default FolderPage;