import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import {useApi} from '../api/api';

import Header from '../common/Header';
import Sidebar from '../common/Sidebar'
import Pagination from './paging/Pagination';

import '../styles/ArticleList.css'; 

const ArticleList = ({ url }) => {
  const [page, setPage] = useState(0); 
  const [articles, setArticles] = useState([]);
  const [nextPageAvailable, setNextPageAvailable] = useState(true); 
  const [token, setToken] = useState(null);

  const api=useApi();

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
    api.get(`${url}?page=${page}`) 
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
  }, [url, page, api]);

  return (
    <div>
      <div className='header'>
        <Header/>
      </div>
      <div className="article-container">
        <div className='sidebar'>
            <Sidebar/>
        </div>
        <div className="content-container">
          {articles.map((article, index) => 
            <Link to={`/article/${article.id}`} key={`article-${index}`} className="link-no-decoration">
              <div className={`article ${index !== articles.length - 1 ? 'has-border' : ''}`}>
                <div className="article-header">
                {article.folderName && <h5 className="folder-name">{article.folderName}</h5>}

                  {token && (article.publicStatus ? <p className="public-status">Public</p> : <p className="private-status">Private</p>)}
                </div>
                {article.thumbnailLink && (
                  <div className="thumbnail-container">
                    <img className="thumbnail-image"
                          src={article.thumbnailLink} 
                          alt="thumbnail" />
                  </div>
                )}
                <h2>{article.title}</h2>
              </div>
            </Link>
          )}
          <div className="pagination-container">
            <Pagination page={page} setPage={setPage} nextPageAvailable={nextPageAvailable} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticleList;
