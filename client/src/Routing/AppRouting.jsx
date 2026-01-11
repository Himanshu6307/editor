import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Login from '../pages/Login'
import SignUp from '../pages/SignUp'
import { useSelector } from 'react-redux'
import Home from '../pages/Home'
import ProjectPage from '../pages/ProjectPage'

function AppRouting() {
    const { userDetail,isLoading } = useSelector(state => state.user);

    const ProtectedRoute = ({ userDetail,isLoading,children }) => {

        if (isLoading) {
            return <><div className='bg-white h-screen flex justify-center items-center'><p className='text-black text-3xl'>Loading...</p></div></>;
        }

        if (!userDetail) {
            return <Navigate to="/login" replace />;
        }

        return children;
    };

    return (
        <BrowserRouter>
            <Routes>
                <Route
                    path="/"
                    element={
                        <ProtectedRoute userDetail={userDetail} isLoading={isLoading}>
                            <Home />
                        </ProtectedRoute>
                    }
                />
                <Route path="/login" element={!userDetail?<Login />:<Navigate to="/" replace />} />
                <Route path="/signup" element={!userDetail?<SignUp />:<Navigate to="/" replace />} />
                <Route path="/project/:projectId" element={userDetail?<ProjectPage />:<Navigate to="/login" replace />} />
            </Routes>
        </BrowserRouter>
    );
}

export default AppRouting