import './App.css'
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import UserLogin from './pages/user/login';
import PatientDashboard from './pages/user/dashboard';
import UserProfile from './pages/user/profile';
import RegisterPage from './pages/user/register';




// Protected Route Components
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');

  if (!token) {
    return <Navigate to='/login' />;
  }


  return children;
};

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* User Routes */}
        <Route path="/login" element={<UserLogin />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <PatientDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              < UserProfile />
            </ProtectedRoute>
          }
        />

        {/* Redirect root to appropriate page based on role */}
        <Route
          path="/"
          element={
            <RouteRedirect />
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

// Component to handle root route redirection
const RouteRedirect = () => {
  const token = localStorage.getItem('token');

  if (!token) {
    return <Navigate to="/login" />;
  }

  return <Navigate to="/dashboard" />;
};

export default App;