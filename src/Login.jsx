import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from './api';
import './App.css';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isInvalid, setIsInvalid] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault(); // Prevent page reload
        try {
            const response = await api.post('/login', { email, password });

            if (response.data.token) {
                localStorage.setItem('auth_token', response.data.token);
                navigate('/users');
            }
        } catch {
            setError('Invalid login credentials');
            setIsInvalid(true);
            setTimeout(() => setIsInvalid(false), 500);
        }
    };

    return (
        <div className="container">
            <div className="left-section" style={{ textAlign: 'center', marginTop: '20px' }}>
                <h1 style={{ color: 'red', fontSize: '50px' }}>EVENT REMINDER</h1>
                <p style={{ color: 'purple' }}>Set your day with us!</p>
            </div>
            <div className="right-section" style={{ backgroundColor: '#eee', padding: '10px', margin: '50px', boxShadow: 'none' }}>
                <h2>Login</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className={isInvalid ? 'invalid' : ''}
                        style={{ width: '100%', padding: '10px', border: '1px solid red' }}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className={isInvalid ? 'invalid' : ''}
                        style={{ width: '100%', padding: '10px', border: '1px solid red' }}
                    />
                    <button
                        type="submit"
                        style={{ width: '100%', padding: '10px', backgroundColor: 'blue', color: 'white' }}
                    >
                        Login
                    </button>
                    {error && <p style={{ color: 'red' }}>{error}</p>}
                </form>
            </div>
        </div>
    );
};

export default Login;
