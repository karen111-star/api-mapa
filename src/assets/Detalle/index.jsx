import { useParams } from 'react-router-dom';
import { useEffect, useState, useContext } from 'react';
import { AppContext } from '../../contexto'; 
import './style.css';
function Detalle() {

  const { nombre } = useParams();
  const [uniData, setUniData] = useState(null);

  //función para modificarlos desde el contexto
  const { favoritos, setFavoritos } = useContext(AppContext);

  // miraa si la universidad está en favoritos
  const esFavorito = favoritos.some(u => u.name === nombre);

  // datos de la universidad seleccionada
  useEffect(() => {
    if (!nombre) return;

   const url = `https://universities.hipolabs.com/search?country=colombia&name=${encodeURIComponent(nombre)}`;

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

  // añade y quita universidad de favoritos
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