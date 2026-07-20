
import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { AdminLogin } from '../Admin/AdminLogin'
import { Home } from './Home'
import { Booking } from './Booking'
import { Mybookings } from './Mybookings'

export const Router = () => {
  return (
    <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/adminlogin' element={<AdminLogin/>}/>
        <Route path='/booking' element={<Booking/>}/>
        <Route path='/mybooking' element={<Mybookings/>}/>
    </Routes>
  )
}
