import React from 'react';
import '../../styles/theme.css';
import '../../styles/auth.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const FoodPartnerRegister = () => {

    const navigate = useNavigate();

    const handleSubmit = async (e) => {

        e.preventDefault();

        const bussinessName = e.target.bussinessName.value;
        const firstName = e.target.firstName.value;
        const lastName = e.target.lastName.value;
        const email = e.target.email.value;
        const password = e.target.password.value;
        const phone = e.target.phone.value;
        const address = e.target.address.value;

        const response = await axios.post("http://localhost:3000/api/auth/food-partner/register", {

            bussinessName: bussinessName,
            contactName: firstName + " " + lastName,
            email: email,
            password: password,
            phone: phone,
            address: address

        },
            {
                withCredentials: true
            })

        console.log(response.data);
        navigate("/create-food");

    }




    return (
        <div className="auth-container">
            <div className="auth-wrapper">
                <div className="auth-card">
                    {/* Header */}
                    <div className="auth-header">
                        <h1 className="auth-title">Partner With Us</h1>
                        <p className="auth-subtitle">Grow your restaurant business with our platform</p>
                        <p className="auth-switch-text">
                            Already a partner?
                            <a href="/food-partner/login" className="auth-switch-link"> Login here</a>
                        </p>
                    </div>

                    {/* Form */}
                    <form className="auth-form" onSubmit={() => hndleSubmit()} noValidate>
                        {/* Business Name */}
                        <div className="form-group">
                            <label className="form-label required" htmlFor="businessName">Business Name</label>
                            <input
                                id="businessName"
                                type="text"
                                className="form-input"
                                placeholder="Your Restaurant Name"
                            />
                        </div>

                        {/* Contact Name */}
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

                        {/* Phone */}
                        <div className="form-group">
                            <label className="form-label required" htmlFor="phone">Phone Number</label>
                            <input
                                id="phone"
                                type="tel"
                                className="form-input"
                                placeholder="+1 (555) 123-4567"
                            />
                        </div>

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
                            <p className="form-helper">
                                Must be at least 8 characters with uppercase, lowercase, and numbers
                            </p>
                        </div>

                        {/* Address */}
                        <div className="form-group">
                            <label className="form-label required" htmlFor="address">Address</label>
                            <input
                                id="address"
                                type="text"
                                className="form-input"
                                placeholder="123 Main Street"
                            />
                        </div>

                        {/* Submit Button */}
                        <button type="submit" className="btn btn-primary">
                            Apply to Become a Partner
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default FoodPartnerRegister;
