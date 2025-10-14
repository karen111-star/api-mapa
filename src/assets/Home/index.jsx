import './style.css' 
import { useEffect, useState } from 'react'
import Informativa from '../Informativa'
import Detalle from '../Detalle'

function Home() {

  const [universidades, setUniversidades] = useState([])
  const [busqueda, setBusqueda] = useState('')
  const [favoritos, setFavoritos] = useState([])
  const [modo, setModo] = useState('home') 
  const [detalle, setDetalle] = useState(null)

  // fetchJson: obtiene datos de la API y los guarda en el estado
  useEffect(() => {
    const fetchJson = async (url, setter) => {
      try {
        const resp = await fetch(url)
        if (!resp.ok) throw new Error("Error al cargar JSON: " + resp.status)
        const json = await resp.json()
        setter(json)
      } catch (error) {
        console.error("Fetch error:", error)
      }
    }
    fetchJson('../json/colombia.json', setUniversidades)
    fetchJson('../json/argentina.json', setUniversidades)
  }, [])

  // Filtra universidades por nombre 
  const universidadesFiltradas = universidades.filter(u =>
    u.name.toLowerCase().includes(busqueda.toLowerCase())
  )

  // aañade/quita universidad de favoritos
  const toggleFavorito = (uni) => {
    setFavoritos(favs =>
      favs.some(f => f.name === uni.name)
        ? favs.filter(f => f.name !== uni.name)
        : [...favs, uni]
    )
  }

  const mostrarDetalle = (uni) => {
    setDetalle(uni)  //Guarda la uni que fue clickeada en  detalle 
    setModo('detalle')// cambio de home a detalle 
  }

  // menu de navegación
  return (
    <div>
      <nav>
        <button onClick={() => setModo('home')}>Home</button>
        <button onClick={() => setModo('detalle')}>detalle</button>
        <button onClick={() => setModo('favoritos')}>favoritos</button>
        <button onClick={() => setModo('informativa')}>informativa</button>
        <button onClick={() => setModo('original')}>original</button>
      </nav>

      {modo === 'home' && (
        <>
          <input
            type="text"
            placeholder="Buscar universidad..."
            value={busqueda}
            onChange={e => setBusqueda(e.target.value)}
          />
          <ul>
            {universidadesFiltradas.map(uni => (
              <li key={uni.name}>
                <span onClick={() => mostrarDetalle(uni)}>{uni.name}</span>
                <button onClick={() => toggleFavorito(uni)}>
                  {favoritos.some(f => f.name === uni.name) ? '❤️' : '🤍'}
                </button>
              </li>
            ))}
          </ul>
        </>
      )}

      {modo === 'favoritos' && (
        <ul>
          {favoritos.map(uni => (
            <li key={uni.name}>
              <span onClick={() => mostrarDetalle(uni)}>{uni.name}</span> {/* captura el clic  del nombre a favorito */}
              <button onClick={() => toggleFavorito(uni)}>❤️</button>
            </li>
          ))}
        </ul>
      )}

      {modo === 'detalle' && detalle && (
        <Detalle universidad={detalle} volver={() => setModo('home')} />
      )}

      {modo === 'informativa' && <Informativa />}
    </div>
  )
}

export default Home