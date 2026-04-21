import React from 'react';
import '../../styles/theme.css';
import '../../styles/auth.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const FoodPartnerLogin = () => {

    const navigate = useNavigate();

    const handleSubmit = async (e) => {

        e.preventDefault();

        const email = e.target.email.value;
        const password = e.target.password.value;

        const response = await axios.post("http://localhost:3000/api/auth/food-partner/login", {

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
                        <h1 className="auth-title">Partner Dashboard</h1>
                        <p className="auth-subtitle">Login to manage your restaurant</p>
                        <p className="auth-switch-text">
                            Not a partner yet?
                            <a href="/food-partner/register" className="auth-switch-link"> Apply now</a>
                        </p>
                    </div>

                    {/* Form */}
                    <form className="auth-form" onSubmit={(e) => handleSubmit(e)} noValidate>
                        {/* Email */}
                        <div className="form-group">
                            <label className="form-label required" htmlFor="email">Email Address</label>
                            <input
                                id="email"
                                type="email"
                                className="form-input"
                                placeholder="contact@restaurant.com"
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
                            Login to Dashboard
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

                    {/* Help Section */}
                    <div style={{
                        marginTop: 'var(--spacing-xl)',
                        padding: 'var(--spacing-lg)',
                        backgroundColor: 'var(--surface-secondary)',
                        borderRadius: 'var(--radius-md)',
                        textAlign: 'center'
                    }}>
                        <p style={{
                            fontSize: 'var(--font-size-sm)',
                            color: 'var(--text-secondary)',
                            marginBottom: 'var(--spacing-sm)'
                        }}>
                            Need help logging in?
                        </p>
                        <div style={{ display: 'flex', gap: 'var(--spacing-md)', justifyContent: 'center', flexWrap: 'wrap' }}>
                            <a href="#" className="auth-footer-link" style={{ fontSize: 'var(--font-size-xs)' }}>
                                Contact Support
                            </a>
                            <span style={{ color: 'var(--text-tertiary)' }}>•</span>
                            <a href="#" className="auth-footer-link" style={{ fontSize: 'var(--font-size-xs)' }}>
                                View FAQs
                            </a>
                            <span style={{ color: 'var(--text-tertiary)' }}>•</span>
                            <a href="#" className="auth-footer-link" style={{ fontSize: 'var(--font-size-xs)' }}>
                                Report Issue
                            </a>
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="auth-footer">
                        <p className="auth-footer-text">
                            By logging in, you agree to our
                            <a href="#" className="auth-footer-link"> Terms of Service</a> and
                            <a href="#" className="auth-footer-link"> Privacy Policy</a>
                        </p>
                        <p className="auth-footer-text" style={{ marginTop: 'var(--spacing-md)', borderTop: '1px solid var(--border-color-light)', paddingTop: 'var(--spacing-md)' }}>
                            Are you a regular user?
                            <a href="/user/login" className="auth-footer-link"> Login here</a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FoodPartnerLogin;
