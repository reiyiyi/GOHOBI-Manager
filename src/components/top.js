import React from 'react';
import { Link } from 'react-router-dom';
import Test from '../api-access/test';
import GetCycleRequest from '../api-access/getCycle';

const Top = () => {
    var session = ''
    if (document.cookie != '') {
        var cookies = document.cookie.split('; ');
        for (var i = 0; i < cookies.length; i++) {
            var cookie_data = cookies[i].split('=');
            if (cookie_data[0] == 'session') {
                session = decodeURIComponent(cookie_data[1]);
                break;
            }
        }
    }
    const data = GetCycleRequest(session)
    return (
        <div>
            {'status' in data ?
                (
                    <div>
                        <h4 className="my-3">TOP</h4>
                        {
                            data.is_created == true ?
                                (<div>
                                    <p>{data.try}をあと{data.requiredTime}分頑張ったら{data.gohobi}GET!!</p>
                                    <Link to='/cycle/create'>サイクルを作り直す</Link>
                                    <Link to='/report/try'>がんばりを報告する</Link>
                                    <Link to='/report/gohobi'>使ったごほうびを報告する</Link>
                                </div>)
                                :
                                (<Link to='/cycle/create'>サイクルを作ってみる！ </Link>)
                        }

                    </div>
                )
                :
                (
                    <div>
                        <Link to='/login'>ログイン </Link>
                        <Link to='/signup'>新規登録 </Link>
                    </div>
                )
            }
        </div>
    );
};

export default Top;