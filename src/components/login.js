import React from 'react';
import { Link } from 'react-router-dom';

const Login = () => {
    return (
        <div>
            <p>ログイン成功時</p>
            <Link to='/'>TOPページへ </Link>
        </div>
    );
  };

export default Login;