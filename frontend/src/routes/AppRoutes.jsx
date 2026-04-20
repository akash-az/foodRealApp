import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'


import React from 'react'

const Approutes = () => {
    return (
        <Router>

            <Routes>
                <Route path="/user/register" element={<UserRegister />} />
                <Route path="/user/login" element={<UserLogin />} />
                <Route path="/food-partner/register" element={<FoodPartnerRegister />} />
                <Route path="/food-partner/login" element={<FoodPartnerLogin />} />

            </Routes>
        </Router >
    )
}

export default Approutes
