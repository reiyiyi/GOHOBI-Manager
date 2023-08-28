import React from 'react';
import { Link } from 'react-router-dom';

const Signup = () => {
    return (
        <div>
            <p>新規登録成功時</p>
            <Link to='/'>ログインしてTOPページへ </Link>
        </div>
    );
  };

export default Signup;