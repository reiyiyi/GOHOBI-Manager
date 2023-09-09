import React from 'react';
import { useNavigate } from 'react-router-dom';
import GetSession from '../api-access/getSession';
import ReportGohobiRequest from '../api-access/reportGohobi';

const ReportGohobi = () => {
    const navigate = useNavigate();
    const [use_gohobi, setUseGohobi] = useState(0)

    const doChangeUseGohobi = (event) => {
        setUseGohobi(event.target.value)
    }

    const doSubmit = (event) => {
        var session = GetSession()
        const data = ReportGohobiRequest(use_gohobi, session)
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
                    <input type="submit" className="btn btn-primary"
                        value="Click" />
                </form>
            </div>
        </div>
    );
};

export default ReportGohobi;