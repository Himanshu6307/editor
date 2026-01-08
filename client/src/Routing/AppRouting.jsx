import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from '../pages/Login'
import SignUp from '../pages/SignUp'

function AppRouting() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                   <Route path='/' element={<div className='bg-amber-700'>Home</div>} />
                   <Route path='/login' element={<Login/>} />
                   <Route path='/signup' element={<SignUp/>} />
                </ Routes>
            </ BrowserRouter>
        </>
    )
}

export default AppRouting