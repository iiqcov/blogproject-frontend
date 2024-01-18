import React from "react";
import { useParams } from "react-router-dom"; // 추가
import ArticleList from "../components/ArticleList";

const FolderPage = () => {
  const { folderName } = useParams(); // 추가
  const url = `http://localhost:8080/folder/${folderName}`; // 수정
  console.log(folderName);

  return (
    <div>
      <ArticleList url={url} />
    </div>
  );
}

export default FolderPage;
