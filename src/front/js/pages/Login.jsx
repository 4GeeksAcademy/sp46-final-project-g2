import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import { Alert } from "../component/Alert.jsx";
import { useNavigate } from "react-router-dom";


export const Login = () => {
    const { store, actions } = useContext(Context);
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [viewPassword, setViewPassword] = useState(false)
    const [alert, setAlert] = useState({ show: false, message: '' })
    const navigate = useNavigate();

    const handleEmail = (event) => setEmail(event.target.value);
    const handlePassword = (event) => setPassword(event.target.value);

    const login = async () => {
        setAlert({ show: false, message: '' })
        const url = process.env.BACKEND_URL + '/api/login';
        const options = {
            method: 'POST',
            body: JSON.stringify({ email, password }),
            headers: { 'Content-Type': 'application/json' }
        }
        const response = await fetch(url, options);
        if (response.ok) {
            const data = await response.json();
            localStorage.setItem('token', data.token);
            store.user = data.results;
            setAlert({ show: true, message: 'User logged' });
            console.log(data)
            setEmail('');
            setPassword('');
            navigate("/");
        } else {
            if (response.status == 404) {
                const error = await response.text();
                setAlert({ show: true, message: 'Bad user or password' });
            }
            console.log('Error: ', response.status, response.statusText);
            /* tratar el error */
            return { error: 'error en el response', status: response.status, statusText: response.statusText }
        }
    }

    return (
        <div className="d-flex align-items-center justify-content-center" style={{ minHeight: '610px' }}>
            <form style={{ width: "400px" }}>
                <div className="form-group">
                    <label htmlFor="exampleInputEmail1">Email </label>
                    <input type="email" value={email} onChange={handleEmail}
                        className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Escribe tu email" />
                </div>
                <div className="form-group">
                    <label htmlFor="exampleInputPassword1">Contraseña</label>
                    <input type="password" value={password} onChange={handlePassword}
                        className="form-control" id="exampleInputPassword1" placeholder="Escribe tu contraseña" />
                </div>
                {/* 
                <div className="form-group">
                    <div className="form-check">
                        <input type="checkbox" className="form-check-input" id="dropdownCheck" />
                        <label className="form-check-label" htmlFor="dropdownCheck">
                            Remember me
                        </label>
                    </div>
                    {/* 
                    <div className="form-group">
                        <div className="form-check">
                            <input type="checkbox" className="form-check-input" id="dropdownCheck" />
                            <label className="form-check-label" htmlFor="dropdownCheck">
                                Remember me
                            </label>
                        </div>
                    </div>
                */}
                <button type="button" onClick={login} className="btn btn-warning fw-bold text-dark mt-4 mb-4">Log in</button>
                <div className="dropdown-divider"></div>
                <p>¿No estás registrado?</p>
                <Link className="dropdown-item" to="/signup">
                    <button type="button" className="btn btn-primary btn-block">
                        Sign up
                    </button>
                </Link>
                {/* <Link className="dropdown-item" to="/signup">New around here? Sign up</Link>
            <Link className="dropdown-item" href="#">Forgot password?</Link> */}
            </form>
        </div>
    );
};