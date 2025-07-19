import { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Login.css';

const Login = () => {
    const [form, setForm] = useState({ email: '', password: '' });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:5000/api/login', form);
            localStorage.setItem('token', res.data.token);
            window.location.href = '/profile';
        } catch (err) {
            alert('Login failed');
        }
    };

    return (
        <div className="login-bg">
            <div className="login-container">
                <h2 className="title">SIGN IN</h2>

                <form onSubmit={handleSubmit}>
                    <input
                        name="email"
                        placeholder="Email"
                        className="input"
                        onChange={handleChange}
                        required
                    />
                    <input
                        name="password"
                        type="password"
                        placeholder="Password"
                        className="input"
                        onChange={handleChange}
                        required
                    />
                    <button type="submit" className="login-btn">Log In</button>
                </form>

                <p className="text">
                    Don't have an Account? <Link to="/register" className="link">Sign Up</Link>
                </p>

              
            </div>
        </div>
    );
};

export default Login;
