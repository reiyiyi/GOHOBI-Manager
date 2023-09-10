import React from 'react';
import { Link } from 'react-router-dom';
// import GetSession from '../api-access/getSession';
// import GetCycleRequest from '../api-access/getCycle';

const Navbar = () => {
    // var session = GetSession()
    // const data = GetCycleRequest(session)

    // return (
    //     <div>
    //         {
    //             'status' in data ?
    //                 (<nav className="navbar sticky-top navbar-expand-lg navbar-dark bg-success">
    //                     <Link className="navbar-brand" to='/'>ごほうびマネージャー</Link>
    //                     <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    //                         <span className="navbar-toggler-icon"></span>
    //                     </button>
    //                     <div className="collapse navbar-collapse" id="navbarSupportedContent">
    //                         <ul className="navbar-nav ml-auto">
    //                             <li className="nav-item active">
    //                                 <Link className="nav-link" to='/logout'>ログアウト</Link>
    //                             </li>
    //                         </ul>
    //                     </div>
    //                 </nav>) :
    //                 (<nav className="navbar sticky-top navbar-expand-lg navbar-dark bg-success">
    //                     <Link className="navbar-brand" to='/'>ごほうびマネージャー</Link>
    //                 </nav>)
    //         }
    //     </div>
    // );

    return (
        <nav className="navbar sticky-top navbar-expand-lg navbar-dark bg-success">
            <Link className="navbar-brand" to='/'>ごほうびマネージャー</Link>
        </nav>
    )
};

export default Navbar;