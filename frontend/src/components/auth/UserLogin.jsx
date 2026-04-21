import React from 'react';
import '../../styles/theme.css';
import '../../styles/auth.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const UserLogin = () => {

    const navigate = useNavigate();

    const handleSubmit = async (e) => {

        e.preventDefault();

        const email = e.target.email.value;
        const password = e.target.password.value;

        const response = await axios.post("http://localhost:3000/api/auth/user/login", {

            email: email,
            password: password

        },
            {
                withCredentials: true
            })

        console.log(response.data);

        navigate("/");

    }

    return (
        <div className="auth-container">
            <div className="auth-wrapper">
                <div className="auth-card">
                    {/* Header */}
                    <div className="auth-header">
                        <h1 className="auth-title">Welcome Back</h1>
                        <p className="auth-subtitle">Login to your account to order food</p>
                        <p className="auth-switch-text">
                            Don't have an account?
                            <a href="/user/register" className="auth-switch-link"> Register here</a>
                        </p>
                    </div>

                    {/* Form */}
                    <form className="auth-form" onSubmit={(e) => handleSubmit(e)} noValidate >
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
                        </div>

                        {/* Remember Me & Forgot Password */}
                        <div style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            gap: 'var(--spacing-md)'
                        }}>
                            <div className="form-checkbox-group" style={{ margin: 0 }}>
                                <input
                                    id="rememberMe"
                                    type="checkbox"
                                    className="form-checkbox"
                                />
                                <label htmlFor="rememberMe" className="checkbox-label">
                                    Remember me
                                </label>
                            </div>
                            <a href="#" className="auth-footer-link">Forgot Password?</a>
                        </div>

                        {/* Submit Button */}
                        <button type="submit" className="btn btn-primary">
                            Login
                        </button>
                    </form>

                    {/* Divider */}
                    <div className="auth-divider">
                        <div className="divider-line"></div>
                        <span className="divider-text">or continue with</span>
                        <div className="divider-line"></div>
                    </div>

                    {/* Social Auth */}
                    <div className="social-auth-group">
                        <button type="button" className="btn-social">
                            <span className="social-icon">🍎</span>
                            Apple
                        </button>
                        <button type="button" className="btn-social">
                            <span className="social-icon">🔵</span>
                            Facebook
                        </button>
                    </div>

                    {/* Footer */}
                    <div className="auth-footer">
                        <p className="auth-footer-text">
                            By logging in, you agree to our
                            <a href="#" className="auth-footer-link"> Terms of Service</a> and
                            <a href="#" className="auth-footer-link"> Privacy Policy</a>
                        </p>
                        <p className="auth-footer-text" style={{ marginTop: 'var(--spacing-md)', borderTop: '1px solid var(--border-color-light)', paddingTop: 'var(--spacing-md)' }}>
                            Are you a food partner?
                            <a href="/food-partner/login" className="auth-footer-link"> Login here</a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserLogin;
