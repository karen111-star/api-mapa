import './style.css'
import { useEffect, useState } from 'react'
import Informativa from '../Informativa'
import Detalle from '../Detalle'

function Home() {
  const [universidades, setUniversidades] = useState([])
  const [busqueda, setBusqueda] = useState('')
  const [pais, setPais] = useState('')
  const [dominio, setDominio] = useState('')
  const [provincia, setProvincia] = useState('')
  const [orden, setOrden] = useState('')
  const [favoritos, setFavoritos] = useState([])
  const [modo, setModo] = useState('home')
  const [detalle, setDetalle] = useState(null)

  // Carga y combina los JSON
  useEffect(() => {
    const fetchJson = async () => {
      try {
        const urls = [
          '../json/colombia.json',
          '../json/argentina.json',
        ]

        const resultados = await Promise.all(
          urls.map(async (url) => {
            const resp = await fetch(url)
            if (!resp.ok) throw new Error('Error al cargar JSON: ' + resp.status)
            return await resp.json()
          })
        )

        setUniversidades(resultados.flat())
      } catch (error) {
        console.error('Fetch error:', error)
      }
    }

    fetchJson()
  }, [])

  // 🔹 Extraer listas dinámicas para los selects
  const paises = [...new Set(universidades.map(u => u.country).filter(Boolean))]
  const provincias = [...new Set(universidades.map(u => u['state-province']).filter(Boolean))]
  const dominios = ['.edu', '.net', '.com']

  // 🔹 Filtrar universidades
  const universidadesFiltradas = universidades
    .filter(u =>
      u.name.toLowerCase().includes(busqueda.toLowerCase()) &&
      (pais === '' || u.country === pais) &&
      (provincia === '' || u['state-province'] === provincia) &&
      (dominio === '' || (u.domains && u.domains.some(d => d.includes(dominio))))
    )
    .sort((a, b) => {
      if (orden === 'nombre') return a.name.localeCompare(b.name)
      if (orden === 'pais') return a.country.localeCompare(b.country)
      return 0
    })

  // Favoritos
  const toggleFavorito = (uni) => {
    setFavoritos(favs =>
      favs.some(f => f.name === uni.name)
        ? favs.filter(f => f.name !== uni.name)
        : [...favs, uni]
    )
  }

  const mostrarDetalle = (uni) => {
    setDetalle(uni)
    setModo('detalle')
  }

  return (
    <div>
      <nav>
        <button onClick={() => setModo('home')}>Home</button>
        <button onClick={() => setModo('detalle')}>Detalle</button>
        <button onClick={() => setModo('favoritos')}>Favoritos</button>
        <button onClick={() => setModo('informativa')}>Informativa</button>
      </nav>

      {modo === 'home' && (
        <>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', margin: '1rem 0' }}>
            {/* 🔍 Búsqueda por nombre */}
            <input
              type="text"
              placeholder="Buscar universidad..."
              value={busqueda}
              onChange={e => setBusqueda(e.target.value)}
            />

            {/* 🌎 Filtro por país */}
            <select value={pais} onChange={e => setPais(e.target.value)}>
              <option value="">Todos los países</option>
              {paises.map(p => <option key={p} value={p}>{p}</option>)}
            </select>

            {/* 🏛️ Filtro por provincia (si existe) */}
            <select value={provincia} onChange={e => setProvincia(e.target.value)}>
              <option value="">Todas las provincias</option>
              {provincias.map(p => <option key={p} value={p}>{p}</option>)}
            </select>

            {/* 🌐 Filtro por dominio */}
            <select value={dominio} onChange={e => setDominio(e.target.value)}>
              <option value="">Todos los dominios</option>
              {dominios.map(d => <option key={d} value={d}>{d}</option>)}
            </select>

            {/* 🔤 Orden */}
            <select value={orden} onChange={e => setOrden(e.target.value)}>
              <option value="">Sin ordenar</option>
              <option value="nombre">Ordenar por nombre</option>
              <option value="pais">Ordenar por país</option>
            </select>
          </div>

          {/* 📋 Lista filtrada */}
          <ul>
            {universidadesFiltradas.map(uni => (
              <li key={uni.name}>
                <span onClick={() => mostrarDetalle(uni)}>
                  {uni.name} — <em>{uni.country}</em>  
                  {uni['state-province'] && ` — ${uni['state-province']}`}
                </span>
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
              <span onClick={() => mostrarDetalle(uni)}>{uni.name}</span>
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
