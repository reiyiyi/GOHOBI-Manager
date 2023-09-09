import React from 'react';
import { Link } from 'react-router-dom';
import GetSession from '../api-access/getSession';
import GetCycleRequest from '../api-access/getCycle';

const Top = () => {
    var session = GetSession()
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