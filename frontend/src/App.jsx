import { Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar';

import Login from './pages/Login';

import Register from './pages/Register';

import VerifyOtp from './pages/VerifyOtp';

import Dashboard from './pages/Dashboard';

import Profile from './pages/Profile';

import AdminDashboard from './pages/AdminDashboard';

import Home from './pages/Home';

import ForgotPassword from './pages/ForgotPassword'

import ResetPassword from './pages/ResetPassword'


function App() {

    return (

        <div>

            <Navbar />

            <Routes>

                <Route
                    path="/login"
                    element={<Login />}
                />

                <Route
                    path="/register"
                    element={<Register />}
                />

                <Route
                    path="/verify-otp"
                    element={<VerifyOtp />}
                />

                <Route
                    path="/dashboard"
                    element={<Dashboard />}
                />

                <Route
                    path="/profile"
                    element={<Profile />}
                />

                <Route
                    path="/admin"
                    element={<AdminDashboard />}
                />
                <Route 
                path="/" 
                element={<Home />} 
                />
                <Route 
                path="/forgot-password" 
                element={<ForgotPassword />} 
                />
                <Route 
                path="/reset-password" 
                element={<ResetPassword />} />

            </Routes>

        </div>
    );
}

export default App;