import { useState, useEffect } from 'react';
import axios from 'axios';
import './Profile.css';

const Profile = () => {
    const [user, setUser] = useState(null);
    const [editMode, setEditMode] = useState(false);
    const [form, setForm] = useState({});
    const [preview, setPreview] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) return window.location.href = '/login';

        const payload = JSON.parse(atob(token.split('.')[1]));
        const userId = payload.id;

        axios.get(`http://localhost:5000/api/users/${userId}`, {
            headers: { Authorization: token }
        }).then(res => {
            setUser(res.data);
            setForm(res.data);

            // Fix preview image with full URL
            if (res.data.profile_photo) {
                setPreview(`http://localhost:5000${res.data.profile_photo}`);
            } else {
                setPreview(null);
            }
        });
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedFile(file);
            setPreview(URL.createObjectURL(file));
        }
    };

    const handleSave = async () => {
        const token = localStorage.getItem('token');
        const payload = JSON.parse(atob(token.split('.')[1]));
        const userId = payload.id;

        const formData = new FormData();
        formData.append('full_name', form.full_name);
        formData.append('email', form.email);
        formData.append('age', form.age);
        formData.append('gender', form.gender);
        formData.append('dob', form.dob);
        formData.append('current_photo', user.profile_photo || '');

        if (selectedFile) {
            formData.append('profile_photo', selectedFile);
        }

        await axios.put(`http://localhost:5000/api/users/${userId}`, formData, {
            headers: {
                Authorization: token,
                'Content-Type': 'multipart/form-data'
            }
        });

        window.location.reload(); // Refresh to reflect changes
    };

    const handleCancel = () => {
        setForm(user);
        setEditMode(false);
        setSelectedFile(null);

        if (user.profile_photo) {
            setPreview(`http://localhost:5000${user.profile_photo}`);
        } else {
            setPreview(null);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        window.location.href = '/login';
    };

    if (!user) return (
        <div className="login-bg">
            <p className="title">Loading...</p>
        </div>
    );

    return (
        <div className="login-bg">
            <div style={{
                display: 'flex',
                maxWidth: '850px',
                width: '100%',
                background: 'rgba(255,255,255,0.05)',
                padding: '30px',
                borderRadius: '10px',
                boxShadow: '0 8px 32px rgba(255,165,0,0.2)',
                border: '1px solid rgba(255,255,255,0.1)',
                flexWrap: 'wrap',
                justifyContent: 'center',
                gap: '20px'
            }}>
                {/* Left Profile Card */}
                <div style={{
                    width: '240px',
                    background: 'rgba(255,255,255,0.05)',
                    padding: '20px',
                    borderRadius: '10px',
                    textAlign: 'center',
                    boxShadow: '0 4px 16px rgba(255,165,0,0.15)',
                    border: '1px solid rgba(255,255,255,0.1)'
                }}>
                    <img
                        src={preview || "/default-avatar.png"}
                        alt="Profile"
                        style={{
                            width: '100px',
                            height: '100px',
                            borderRadius: '50%',
                            objectFit: 'cover',
                            border: '4px solid #ff5c00',
                            marginBottom: '10px'
                        }}
                    />

                    {editMode && (
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            style={{
                                marginTop: '10px',
                                color: '#fff',
                                fontSize: '12px'
                            }}
                        />
                    )}

                    <h3 style={{
                        color: '#ff5c00',
                        fontSize: '18px',
                        marginBottom: '5px',
                        fontWeight: 'bold'
                    }}>{user.full_name}</h3>
                    <p style={{ color: '#fff', fontSize: '12px', margin: '4px 0' }}>Email: {user.email}</p>
                    <p style={{ color: '#fff', fontSize: '12px', margin: '4px 0' }}>Age: {user.age}</p>
                    <p style={{ color: '#fff', fontSize: '12px', margin: '4px 0' }}>Gender: {user.gender}</p>
                    <p style={{ color: '#fff', fontSize: '12px', margin: '4px 0' }}>DOB: {user.dob}</p>
                </div>

                {/* Right Edit Form */}
                <div style={{
                    flex: 1,
                    minWidth: '300px',
                    background: 'rgba(255,255,255,0.05)',
                    padding: '20px',
                    borderRadius: '10px',
                    boxShadow: '0 4px 16px rgba(255,165,0,0.15)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    color: '#fff'
                }}>
                    <h2 style={{
                        fontSize: '20px',
                        marginBottom: '15px',
                        color: '#ff5c00',
                        textAlign: 'center',
                        fontWeight: 'bold'
                    }}>
                        Profile Settings
                    </h2>

                    {['full_name', 'email', 'age', 'gender', 'dob'].map(field => (
                        <div key={field} style={{
                            marginBottom: '10px',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center'
                        }}>
                            <label style={{ color: '#ff5c00', fontWeight: 'bold', width: '120px' }}>
                                {field.replace('_', ' ')}:
                            </label>
                            {editMode ? (
                                <input
                                    name={field}
                                    value={form[field]}
                                    onChange={handleChange}
                                    type={field === 'dob' ? 'date' : (field === 'age' ? 'number' : 'text')}
                                    style={{
                                        width: 'calc(100% - 130px)',
                                        padding: '8px',
                                        background: 'rgba(255,255,255,0.1)',
                                        border: 'none',
                                        borderRadius: '5px',
                                        color: '#fff',
                                        fontSize: '12px'
                                    }}
                                />
                            ) : (
                                <span style={{ color: '#fff', fontSize: '12px' }}>{user[field]}</span>
                            )}
                        </div>
                    ))}

                    <div style={{ marginTop: '15px', textAlign: 'center' }}>
                        {editMode ? (
                            <>
                                <button onClick={handleSave} className="login-btn" style={{ width: '100%', marginBottom: '8px' }}>
                                    Save
                                </button>
                                <button onClick={handleCancel} className="login-btn" style={{ width: '100%', background: '#555' }}>
                                    Cancel
                                </button>
                            </>
                        ) : (
                            <button onClick={() => setEditMode(true)} className="login-btn" style={{ width: '100%' }}>
                                Edit Profile
                            </button>
                        )}

                        <button onClick={handleLogout} className="login-btn" style={{
                            marginTop: '12px',
                            width: '100%',
                            background: 'red'
                        }}>
                            Logout
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
