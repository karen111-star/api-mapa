import './style.css'

function Favoritos({ favoritos, quitarFavorito, mostrarDetalle }) {
  return (
    <div className="favoritos">
      <h2>Favoritos</h2>
      <ul>
        {favoritos.map(uni => (
          <li key={uni.name}>
            <span onClick={() => mostrarDetalle(uni)}>{uni.name}</span>
            <button onClick={() => quitarFavorito(uni)}>Quitar</button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Favoritos