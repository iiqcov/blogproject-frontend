import React from "react";
import ArticleList from "../components/ArticleList";

const HomePage = () => {
    const url = "http://localhost:8080/articles";

    return (
      <div>
        <ArticleList url={url} />
      </div>
    
    );
}

export default HomePage;
