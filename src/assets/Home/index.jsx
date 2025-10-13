import './style.css'
import { useEffect, useState } from 'react'


function Home() {

  const [universidades, setUniversidades] = useState([])
  const [busqueda, setBusqueda] = useState('')
  const [favoritos, setFavoritos] = useState([])
  const [modo, setModo] = useState('lista') 
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
    setDetalle(uni)
    setModo('detalle')
  }

  // menu de navegación
  return (
    <div>
      <nav>
        <button onClick={() => setModo('lista')}>Lista</button>
        <button onClick={() => setModo('favoritos')}>Favoritos</button>
        <button onClick={() => setModo('original')}>Original</button>
        <button onClick={() => setModo('informativa')}>Informativa</button>
      </nav>

      {modo === 'lista' && (
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
                  {favoritos.some(f => f.name === uni.name) ? 'Quitar de favoritos' : 'Agregar a favoritos'}
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
              <button onClick={() => toggleFavorito(uni)}>Quitar de favoritos</button>
            </li>
          ))}
        </ul>
      )}

      {modo === 'detalle' && detalle && (
        <Detalle universidad={detalle} volver={() => setModo('lista')} />
      )}

      {modo === 'informativa' && <Informativa />}
      {modo === 'original' && <Original universidades={universidades} />}
    </div>
  )
}

export default Home