import ArticleList from "../components/ArticleList";

const BlogHome = () => {
    const url = "http://localhost:8080/articles";

    return (
        <div>
            <ArticleList url={url} />
        </div>
      );
}

export default BlogHome;
