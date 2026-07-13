import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import { AdminRouter } from './Admin/AdminRouter'
import { Router } from './User/Router'

function App() {

  return (
    <>
     <Router/>
     <AdminRouter/>
    </>
  )
}

export default App
