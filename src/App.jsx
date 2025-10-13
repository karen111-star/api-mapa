import { BrowserRouter as Router, Route, Routes, Link, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import './App.css';
import Detalle from './assets/Detalle';
import Favoritos from './assets/Favoritos';
import Home from './assets/Home';
import Informativa from './assets/Informativa';
import Mapa from './assets/Mapa';
import { AppProvider } from './contexto'; // Ajusta la ruta si tu contexto está en otro lugar

function App() {
  return (
    <AppProvider>
      <Router>
        <nav className="c-menu">
          <Link to="/">Home</Link>
          <Link to="/informativa">Informativa</Link>
          <Link to="/mapa">Mapa</Link>
          <Link to="/favoritos">Favoritos</Link>
        </nav>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/informativa" element={<Informativa />} />
          <Route path="/mapa" element={<Mapa />} />
          <Route path="/favoritos" element={<Favoritos />} />
          <Route path="/detalle/:depto/:municipio" element={<Detalle />} />
        </Routes>
      </Router>
    </AppProvider>
  );
}

export default App;