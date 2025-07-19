import { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Register.css'; // Import custom CSS for shine & grid

const Register = () => {
    const [form, setForm] = useState({
        full_name: '', email: '', password: '', age: '', gender: '', dob: ''
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:5000/api/register', form);
            localStorage.setItem('token', res.data.token);
            window.location.href = '/profile';
        } catch (err) {
            alert('Registration failed');
        }
    };

    return (
        <div className="register-bg">

            <div className="register-container">
                <div className="shine"></div>

                <h2 className="title">SIGN UP</h2>

                <form onSubmit={handleSubmit}>
                    <input
                        name="full_name"
                        placeholder="Full Name"
                        onChange={handleChange}
                        required
                        className="input"
                    />
                    <input
                        name="email"
                        type="email"
                        placeholder="Email"
                        onChange={handleChange}
                        required
                        className="input"
                    />
                    <input
                        name="password"
                        type="password"
                        placeholder="Password"
                        onChange={handleChange}
                        required
                        className="input"
                    />
                    <input
                        name="age"
                        type="number"
                        placeholder="Age"
                        onChange={handleChange}
                        className="input"
                    />
                    <select
                        name="gender"
                        onChange={handleChange}
                        required
                        className="input"
                    >
                        <option value="">Select Gender</option>
                        <option>Male</option>
                        <option>Female</option>
                        <option>Other</option>
                    </select>
                    <input
                        name="dob"
                        type="date"
                        onChange={handleChange}
                        required
                        className="input"
                    />
                    <button type="submit" className="register-btn">Register</button>
                </form>

                <div className="text">
                    Already have an account? <Link to="/login" className="link">Sign In</Link>
                </div>
            </div>
        </div>
    );
};

export default Register;
