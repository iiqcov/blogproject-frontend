import React from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

import writearticle from '../assets/edit_note_FILL0_wght400_GRAD0_opsz24.svg'
import githublogo from '../assets/github-mark.svg'
import logoutlogo from '../assets/exit_to_app_FILL0_wght400_GRAD0_opsz24.svg'
import maillogo from '../assets/mail_FILL0_wght400_GRAD0_opsz24.svg'
import personlogo from '../assets/mindfulness_FILL0_wght400_GRAD0_opsz24.svg'

import '../styles/UserInfo.css'; 
import { useApi } from '../api/api';

const UserInfo = () => {
  const token = Cookies.get('token');
  const navigate = useNavigate(); 
  const api=useApi();

  const goToLogout = async() => {
    try {
      await api.post('/api/logout', {}, {
        withCredentials: true
      });
      Cookies.remove('token');
      navigate('/'); 
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="userInfo">
      <div className="userIcon">
        <img src={personlogo} alt="Writer" />
      </div>
      
      <div className="userName">
        <h2>QCOV</h2> 
      </div>
      <div className="userRole">
        <p>Developer</p>
      </div>
      <div className="userContact">
        <a href="mailto:qcov@gmail.com"><img src={maillogo} alt="GMail" /></a>
        <a href="https://github.com/iiqcov"><img src={githublogo} alt="Github" /></a>
      </div>

      {token && (
        <div className="userActions">
          <img src={writearticle} alt="Write Article" onClick={() => navigate('/write-article')} /> 
          <img src={logoutlogo} alt="Logout" onClick={goToLogout} />
        </div>
      )}
    </div>
  );
};

export default UserInfo;
