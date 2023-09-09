import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import GetSession from '../api-access/getSession';
import ReportTryRequest from '../api-access/reportTry';

const ReportTry = () => {
    const navigate = useNavigate();
    const [try_time, setTryTime] = useState(0)

    const doChangeTryTime = (event) => {
        setTryTime(event.target.value)
    }

    const doSubmit = (event) => {
        var session = GetSession()
        const data = ReportTryRequest(try_time, session)
        if ('message' in data) {
            navigate('/login')
        }
        else if (data.status == true) {
            navigate('/')
        }
    }

    return (
        <div>
            <h4 className="my-3">がんばりを報告！</h4>
            <div className="container">
                <form onSubmit={doSubmit}>
                    <div className="form-group">
                        <input type="number" className="form-control"
                            onChange={doChangeTryTime} />
                    </div>
                    <input type="submit" className="btn btn-primary"
                        value="Click" />
                </form>
            </div>
        </div>
    );
};

export default ReportTry;