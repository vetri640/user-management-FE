import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import Profile from './components/Profile';
import './index.css';

function App() {
    return (
        <div className="min-h-screen bg-3d flex items-center justify-center p-10">
            <div className="glass-box w-full max-w-3xl p-8 relative">
                <div className="shine"></div>

                <Router>
                    <Routes>
                        <Route path="/" element={<Navigate to="/login" />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/profile" element={<Profile />} />
                    </Routes>
                </Router>
            </div>
        </div>
    );
}

export default App;
