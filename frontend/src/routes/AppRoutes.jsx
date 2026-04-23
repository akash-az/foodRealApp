import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import React from 'react'
import UserRegister from '../components/auth/UserRegister'
import UserLogin from '../components/auth/UserLogin'
import FoodPartnerRegister from '../components/auth/FoodPartnerRegister'
import FoodPartnerLogin from '../components/auth/FoodPartnerLogin'
import Home from '../components/general/Home'
import CreateFood from '../components/general/CreateFood'
import Profile from '../components/general/Profile'
import Saved from '../components/general/Saved'

const Approutes = () => {
    return (
        <Router>
            <Routes>
                <Route path="/user/register" element={<UserRegister />} />
                <Route path="/user/login" element={<UserLogin />} />
                <Route path="/food-partner/register" element={<FoodPartnerRegister />} />
                <Route path="/food-partner/login" element={<FoodPartnerLogin />} />
                <Route path="/" element={<Home />} />
                <Route path="/create-food" element={<CreateFood />} />
                <Route path="/food-partner/:id" element={<Profile />} />
                <Route path="/saved" element={<Saved />} />


            </Routes>
        </Router>
    )
}

export default Approutes
