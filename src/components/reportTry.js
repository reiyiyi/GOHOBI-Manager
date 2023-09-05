import React from 'react';
import { Link } from 'react-router-dom';
import ReportTryRequest from '../api-access/reportTry';

const ReportTry = () => {
    return (
        <div>
            <p>時間報告成功時</p>
            <Link to='/'>TOPページへ </Link>
        </div>
    );
  };

export default ReportTry;