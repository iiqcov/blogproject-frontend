import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';

import Header from '../common/Header';
import Sidebar from '../common/Sidebar';
import Footer from '../common/Footer';
import Pagination from './paging/Pagination';

const ArticleList = ({ url }) => {
    const [page, setPage] = useState(0); 
    const [articles, setArticles] = useState([]);
    const [nextPageAvailable, setNextPageAvailable] = useState(true); 
    const [token, setToken] = useState(null);

    useEffect(() => {
        setPage(0); 
    }, [url]);

    useEffect(() => {
        const storedToken = Cookies.get('token');
        if (storedToken) {
            setToken(storedToken);
        }
    }, []);

    useEffect(() => {
        const source = axios.CancelToken.source(); 
    
        const headers = token 
            ? { Authorization: `Bearer ${token}` } 
            : {};
    
        axios.get(`${url}?page=${page}`, { cancelToken: source.token, headers }) 
            .then(res => {
                if (res.data && res.data.page && Array.isArray(res.data.page.content)) {
                    setArticles(res.data.page.content);
                    setNextPageAvailable(res.data.hasNext);
                } else {
                    console.error('Data is not a PagedArticleListViewResponse object');
                }
            }).catch(function (thrown) {
                if (axios.isCancel(thrown)) {
                    console.log('Request canceled', thrown.message);
                } else {
                    // handle error
                }
            });
    
        return () => {
            source.cancel(); 
        };
    }, [url, page, token]);
    

    return (
        <div>
            <Header/>
            <div style={{ display: 'flex' }}>
                <Sidebar/>
                <div style={{ marginLeft: '320px' }}>
                    {articles.map((article, index) => 
                        <div key={`article-${index}`} style={{ borderBottom: index !== articles.length - 1 ? '1px solid black' : 'none' }}>
                            <h5>{article.title}</h5>
                            {token && (article.publicStatus ? <p>Public</p> : <p>Private</p>)}
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
