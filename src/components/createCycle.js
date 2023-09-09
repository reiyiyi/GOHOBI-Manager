import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import GetSession from '../api-access/getSession';
import CreateCycleRequest from '../api-access/createCycle';

const CreateCycle = () => {
    const navigate = useNavigate();
    const [try_, setTry] = useState("")
    const [time_, setTime] = useState(0)
    const [gohobi, setGohobi] = useState("")

    const doChangeTry = (event) => {
        setTry(event.target.value)
    }
    const doChangeTime = (event) => {
        setTime(event.target.value)
    }
    const doChangeGohobi = (event) => {
        setGohobi(event.target.value)
    }

    const doSubmit = (event) => {
        var session = GetSession()
        const data = CreateCycleRequest(try_, time_, gohobi, session)
        if ('message' in data) {
            navigate('/login')
        }
        else if (data.status == true) {
            document.cookie = 'session=' + data.session;
            navigate('/')
        }
    }

    return (
        <div>
            <h4 className="my-3">サイクルを作ろう</h4>
            <div className="container">
                <form onSubmit={doSubmit}>
                    <div className="form-group">
                        <input type="text" className="form-control"
                            onChange={doChangeTry} />
                    </div>
                    <div className="form-group">
                        <input type="number" className="form-control"
                            onChange={doChangeTime} />
                    </div>
                    <div className="form-group">
                        <input type="text" className="form-control"
                            onChange={doChangeGohobi} />
                    </div>
                    <input type="submit" className="btn btn-primary"
                        value="Click" />
                </form>
            </div>
        </div>
    )
};

export default CreateCycle;