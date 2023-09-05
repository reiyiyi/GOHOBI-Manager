import React from 'react';
import { Link } from 'react-router-dom';
import LogoutRequest from '../api-access/logout';

const Logout = () => {
    return (
        <div>
            <p>ログアウト成功時</p>
            <Link to='/'>ログアウトしてTOPページへ </Link>
        </div>
    );
  };

export default Logout;