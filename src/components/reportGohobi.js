import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import GetSession from '../api-access/getSession';
import ReportGohobiRequest from '../api-access/reportGohobi';

const ReportGohobi = () => {
    const navigate = useNavigate();
    const [use_gohobi, setUseGohobi] = useState(0)

    const doChangeUseGohobi = (event) => {
        setUseGohobi(event.target.value)
    }

    const doSubmit = async (event) => {
        var session = GetSession()
        event.preventDefault();
        const data = await ReportGohobiRequest(use_gohobi, session)
        .then(data => {
            return data
        })
        if ('message' in data) {
            navigate('/login')
        }
        else if (data.status == true) {
            navigate('/')
        }
    }

    return (
        <div>
            <h4 className="my-3">ごほうびを楽しんだことを報告！</h4>
            <div className="container">
                <form onSubmit={doSubmit}>
                    <div className="form-group">
                        <input type="number" className="form-control"
                            onChange={doChangeUseGohobi} />
                    </div>
                    <p>回も楽しんだ！</p>
                    <input type="submit" className="btn btn-success"
                        value="報告！" />
                </form>
            </div>
        </div>
    );
};

export default ReportGohobi;