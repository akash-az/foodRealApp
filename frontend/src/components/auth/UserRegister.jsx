import React from 'react';
import '../../styles/theme.css';
import '../../styles/auth.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const UserRegister = () => {

    const navigate = useNavigate();

    const handleSubmit = async (e) => {

        e.preventDefault();

        const firstName = e.target.firstName.value;
        const lastName = e.target.lastName.value;
        const email = e.target.email.value;
        const password = e.target.password.value;

        const response = await axios.post("http://localhost:3000/api/auth/user/register", {

            fullName: firstName + " " + lastName,
            email: email,
            password: password
        },{
            withCredentials: true
        })

        console.log(response.data);

        navigate("/")


    }

    return (
        <div className="auth-container">
            <div className="auth-wrapper">
                <div className="auth-card">
                    {/* Header */}
                    <div className="auth-header">
                        <h1 className="auth-title">Create Account</h1>
                        <p className="auth-subtitle">Join us and start ordering delicious food</p>
                        <p className="auth-switch-text">
                            Already have an account?
                            <a href="/user/login" className="auth-switch-link"> Login here</a>
                        </p>
                    </div>

                    {/* Form */}
                    <form className="auth-form" onSubmit={(e) => handleSubmit(e)} noValidate>
                        {/* Name Section */}
                        <div className="form-row">
                            <div className="form-group">
                                <label className="form-label required" htmlFor="firstName">First Name</label>
                                <input
                                    id="firstName"
                                    type="text"
                                    className="form-input"
                                    placeholder="John"
                                />
                            </div>
                            <div className="form-group">
                                <label className="form-label required" htmlFor="lastName">Last Name</label>
                                <input
                                    id="lastName"
                                    type="text"
                                    className="form-input"
                                    placeholder="Doe"
                                />
                            </div>
                        </div>

                        {/* Email */}
                        <div className="form-group">
                            <label className="form-label required" htmlFor="email">Email Address</label>
                            <input
                                id="email"
                                type="email"
                                className="form-input"
                                placeholder="john.doe@example.com"
                            />
                        </div>

                        {/* Password */}
                        <div className="form-group">
                            <label className="form-label required" htmlFor="password">Password</label>
                            <input
                                id="password"
                                type="password"
                                className="form-input"
                                placeholder="••••••••"
                            />
                            <p className="form-helper">
                                Must be at least 8 characters with uppercase, lowercase, and numbers
                            </p>
                        </div>

                        {/* Submit Button */}
                        <button type="submit" className="btn btn-primary">
                            Create Account
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default UserRegister;
