import ArticleList from "../components/ArticleList";

const BlogHome = () => {
    const url = "/articles";

    return (
        <div>
            <ArticleList url={url} />
        </div>
      );
}

export default BlogHome;
