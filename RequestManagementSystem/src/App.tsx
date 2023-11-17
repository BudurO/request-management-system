import { useState } from 'react'
import './App.css'
import SignUp from './Pages/Sign-up'
import Login from './Pages/Login'
import ForgotPassword from './Pages/ForgotPassword'
import Home from './Pages/Home'
import Dashboard from './Pages/Dashboard'
import { Route, Routes } from 'react-router-dom'
import FormRequests from './Pages/FormRequests'
function App() {

  return (
    <>

    <Routes>
        <Route path="/" element={ <Home/> } />
        <Route path="SignUp" element={ <SignUp/> } />
        <Route path="Login" element={ <Login/> } />
        <Route path="ForgotPassword" element={ <ForgotPassword/> } />
        <Route path="FormRequests" element={ <FormRequests/> } />
        <Route path="Dashboard" element={ <Dashboard/> } />
      </Routes>
    </>
  )
}

export default App
