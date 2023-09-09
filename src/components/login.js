import React from 'react';
import { Link } from 'react-router-dom';
import LoginRequest from '../api-access/login';

const Login = () => {
    const data = LoginRequest("regi", "regipass")
    return (
        <div>
            <p>{data.user_id}</p>
            <p>{data.password}</p>
            <p>ログイン成功時</p>
            <Link to='/'>TOPページへ </Link>
        </div>
    );
  };

export default Login;