import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SignupRequest from '../api-access/signup';

const Signup = () => {
    const navigate = useNavigate();
    const [user_id, setUserId] = useState("")
    const [user_name, setUserName] = useState("")
    const [password, setPassword] = useState("")

    const doChangeUserId = (event) => {
        setUserId(event.target.value)
    }
    const doChangeUserName = (event) => {
        setUserName(event.target.value)
    }
    const doChangePassword = (event) => {
        setPassword(event.target.value)
    }

    const doSubmit = (event) => {
        const data = SignupRequest(user_id, user_name, password)
        if (data.status == true) {
            document.cookie = 'session=' + data.session;
            navigate('/login')
        }
        else {
            navigate('/signup')
        }
    }

    return (
        <div>
            <h4 className="my-3">新規登録</h4>
            <div className="container">
                <form onSubmit={doSubmit}>
                    <div className="form-group">
                        <label>ユーザーID:</label>
                        <input type="text" className="form-control"
                            onChange={doChangeUserId} />
                    </div>
                    <div className="form-group">
                        <label>名前:</label>
                        <input type="text" className="form-control"
                            onChange={doChangeUserName} />
                    </div>
                    <div className="form-group">
                        <label>パスワード:</label>
                        <input type="password" className="form-control"
                            onChange={doChangePassword} />
                    </div>
                    <input type="submit" className="btn btn-primary"
                        value="Click" />
                </form>
            </div>
        </div>
    )
};

export default Signup;