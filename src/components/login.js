import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginRequest from '../api-access/login';

const Login = () => {
    const navigate = useNavigate();
    const [user_id, setUserId] = useState("")
    const [password, setPassword] = useState("")

    const doChangeUserId = (event) => {
        setUserId(event.target.value)
    }
    const doChangePassword = (event) => {
        setPassword(event.target.value)
    }

    const doSubmit = (event) => {
        const data = LoginRequest(user_id, password)
        if(data.status == true){
            document.cookie = 'session=' + data.session;
            navigate('/')
        }
        else{
            navigate('/login')
        }
    }

    return(
        <div>
            <h4 className="my-3">ログイン</h4>
            <div className="container">
                <form onSubmit={doSubmit}>
                    <div className="form-group">
                        <label>ユーザーID:</label>
                        <input type="text" className="form-control"
                            onChange={doChangeUserId} />
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

export default Login;