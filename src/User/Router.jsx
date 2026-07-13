
import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { AdminLogin } from '../Admin/AdminLogin'
import { Home } from './Home'

export const Router = () => {
  return (
    <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/adminlogin' element={<AdminLogin/>}/>
    </Routes>
  )
}
