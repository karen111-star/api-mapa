import './style.css'

function Informativa() {
  return (
    <div className="informativa">
      <h2>Universidades de Colombia</h2>
      <p>Esta aplicación muestra universidades de Colombia usando la API pública <a href="http://universities.hipolabs.com/search?country=colombia" target="_blank" rel="noopener noreferrer">Hipolabs Universities</a>.</p>
      <p>Puedes buscar, filtrar, ver detalles y guardar tus universidades favoritas.</p>
    </div>
  )
}

export default Informativa