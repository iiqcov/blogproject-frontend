import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import Header from '../common/Header';
import Sidebar from '../common/Sidebar';
import Footer from '../common/Footer';
import Pagination from './paging/Pagination';

const ArticleList = ({ url }) => {
    const [page, setPage] = useState(0); // 페이지를 0으로 초기화
    const [articles, setArticles] = useState([]);
    const [nextPageAvailable, setNextPageAvailable] = useState(true); 

    useEffect(() => {
        setPage(0); // url이 변경될 때마다 페이지를 0으로 설정
    }, [url]);

    useEffect(() => {
        axios.get(`${url}?page=${page}`) // 페이지 번호를 직접 사용
            .then(res => {
                if (res.data && res.data.page && Array.isArray(res.data.page.content)) {
                    setArticles(res.data.page.content);
                    setNextPageAvailable(res.data.hasNext);
                } else {
                    console.error('Data is not a PagedArticleListViewResponse object');
                }
            });
    }, [url, page]);

    return (
        <div>
            <Header/>
            <div style={{ display: 'flex' }}>
                <Sidebar/>
                <div style={{ marginLeft: '320px' }}>
                    {articles.map((article, index) => 
                    <div key={`article-${index}`}>
                        <h5>{article.title}</h5>
                        {article.folderName && <h5>{article.folderName}</h5>}
                        {article.thumbnailLink && (
                            <div style={{width: '500px', height: '300px', overflow: 'hidden', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                                <img src={article.thumbnailLink} alt="thumbnail" style={{width: '100%', height: '100%', objectFit: 'cover'}} />
                            </div>
                        )}
                        <Link to={`/article/${article.id}`}>보러가기</Link>
                    </div>
                    )}
                    <Pagination page={page} setPage={setPage} nextPageAvailable={nextPageAvailable} />
                </div>
            </div>
            <Footer/>
        </div>
    );
}

export default ArticleList;
