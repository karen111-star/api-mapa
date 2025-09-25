import { BrowserRouter as Router, Route, Routes, Link, Navigate } from 'react-router-dom';
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Detalle from './assets/Detalle'
import Favoritos from './assets/Favoritos'
import Home from './assets/Home'
import Informativa from './assets/Informativa'
import Mapa from './assets/Mapa'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Detalle/>
    <Favoritos/>
    <Home/>
    <Informativa/>
    <Mapa/>

    <Router>

        <nav className="c-menu">
          <Link to="/detalle">Detalle</Link>
          <Link to="/">Home</Link>
          <Link to="/informativa">Informativa</Link>
          <Link to="/mapa">Mapa</Link>
          <Link to="/favoritos">Favoritos</Link>
        </nav>

         <Routes>
          <Route path="/home" element={<Home /> } />
          <Route path="/informativa" element={<Informativa /> } />
          <Route path="/mapa" element={<Mapa /> } />
          <Route path="/favoritos" element={<Favoritos /> } />
          <Route path="/detalle/:depto/:municipio" element={<Detalle /> } />
          </Routes>

    </Router>

      

    </>
  )
}

export default App
