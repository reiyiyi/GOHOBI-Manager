import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <div>
            <p>ごほうびマネージャー</p>
            <Link to='/logout'>ログアウト </Link>
        </div>
    );
  };

export default Navbar;