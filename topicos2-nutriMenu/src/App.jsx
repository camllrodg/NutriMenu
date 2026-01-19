import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { saludoService } from './services/saludoService'
import {Routes, Route, Link} from 'react-router-dom'
import  Home  from './pages/Home'
import ClientPanel from './pages/ClientPanel'

function App() {
  saludoService.saludo();
  return (
    <>
      <div className='p-5'>
        <Routes>
          <Route path='/' element={<Home />}></Route>
          <Route path='/client-panel' element={<ClientPanel />}></Route>
        </Routes>
      </div>
    </>
  )
}

export default App
