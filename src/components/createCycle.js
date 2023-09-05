import React from 'react';
import { Link } from 'react-router-dom';
import CreateCycleRequest from '../api-access/createCycle';

const CreateCycle = () => {
    return (
        <div>
            <p>サイクル作成成功時</p>
            <Link to='/'>TOPページへ </Link>
        </div>
    );
  };

export default CreateCycle;