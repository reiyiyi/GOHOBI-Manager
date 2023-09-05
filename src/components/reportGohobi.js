import React from 'react';
import { Link } from 'react-router-dom';
import ReportGohobiRequest from '../api-access/reportGohobi';

const ReportGohobi = () => {
    return (
        <div>
            <p>ご褒美報告成功時</p>
            <Link to='/'>TOPページへ </Link>
        </div>
    );
  };

export default ReportGohobi;