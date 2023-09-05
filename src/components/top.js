import React from 'react';
import { Link } from 'react-router-dom';

const Top = () => {
    return (
        <div>
            <p>ログインしていない場合</p>
            <Link to='/login'>ログイン </Link>
            <Link to='/signup'>新規登録 </Link>
            <p>ログインしている場合</p>
            <Link to='/cycle/create'>サイクルを作る </Link>
            <Link to='/report/try'>時間を報告する </Link>
            <Link to='/report/gohobi'>使ったご褒美を報告する </Link>
        </div>
    );
  };

export default Top;