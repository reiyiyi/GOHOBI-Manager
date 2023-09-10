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
                                    <p>{data.try}をがんばっていこう！</p>
                                    <p>今は{data.gohobi}ごほうびが{data.unusedGohobi}回分残っているよ！</p>
                                    <p>次の{data.gohobi}ごほうびGETまであと{data.requiredTime}分！</p>
                                    <Link className="btn btn-success" to='/report/try'>がんばりを報告する！</Link>
                                    <Link className="btn btn-success" to='/report/gohobi'>使ったごほうびを報告する！</Link>
                                    <Link className="btn btn-danger" to='/cycle/create'>サイクルを作り直す</Link>
                                </div>)
                                :
                                (<Link to='/cycle/create'>サイクルを作ってみる！ </Link>)
                        }

                    </div>
                )
                :
                (
                    <div>
                        <h4 className="my-3">このアプリを使ってごほうびライフを楽しもう！</h4>
                        <Link className="btn btn-success" to='/login'>ログイン </Link>
                        <Link className="btn btn-success" to='/signup'>新規登録 </Link>
                    </div>
                )
            }
        </div>
    );
};

export default Top;