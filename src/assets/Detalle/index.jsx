import { useParams } from 'react-router-dom';
import { useEffect, useState, useContext } from 'react';
import { AppContext } from '../../contexto'; // Ajusta la ruta según donde esté tu contexto

/**
 * Componente que muestra el detalle de una universidad.
 * Permite agregar/quitar de favoritos usando el contexto global.
 */
function Detalle() {
  // Obtiene el nombre de la universidad desde la URL
  const { nombre } = useParams();
  const [uniData, setUniData] = useState(null);

  // Accede a favoritos y función para modificarlos desde el contexto
  const { favoritos, setFavoritos } = useContext(AppContext);

  // Verifica si la universidad está en favoritos
  const esFavorito = favoritos.some(u => u.name === nombre);

  // Carga los datos de la universidad seleccionada
  useEffect(() => {
    if (!nombre) return;

    const url = `http://universities.hipolabs.com/search?country=colombia&name=${encodeURIComponent(nombre)}`;

    const fetchData = async () => {
      try {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`HTTP error: ${response.status}`);

        const data = await response.json();
        setUniData(data[0]); // Toma la primera coincidencia
      } catch (error) {
        console.error("Error al cargar la universidad:", error);
      }
    };

    fetchData();
  }, [nombre]);

  // Añade o quita la universidad de favoritos
  const toggleFavorito = () => {
    if (!uniData) return;
    if (esFavorito) {
      setFavoritos(favoritos.filter(u => u.name !== nombre));
    } else {
      setFavoritos([...favoritos, uniData]);
    }
  };

  if (!uniData) return <p>Cargando universidad...</p>;

  return (
    <div>
      <h1>{uniData.name}</h1>
      <p>País: {uniData.country}</p>
      <p>Dominio: {uniData.domains[0]}</p>
      <p>Web: <a href={uniData.web_pages[0]} target="_blank" rel="noopener noreferrer">{uniData.web_pages[0]}</a></p>
      <button onClick={toggleFavorito}>
        {esFavorito ? '❤️' : '🤍'}
      </button>
    </div>
  );
}

export default Detalle;