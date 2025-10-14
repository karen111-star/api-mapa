// Importamos React y los hooks necesarios
import { useState, useEffect } from "react";
import "./style.css"; // Importamos los estilos específicos para Detalle

function Detalle({ universidad, volver }) {
  // Estado local para detectar si esta universidad está en favoritos
  const [esFavorito, setEsFavorito] = useState(false);

  // si estamarcada como favorita en localStorage
  useEffect(() => {
    const favs = JSON.parse(localStorage.getItem("favoritos")) || [];
    const existe = favs.some((f) => f.name === universidad.name);
    setEsFavorito(existe);
  }, [universidad]);

  //guarda y elimina en localStorage los fav
  const toggleFavorito = () => {
    let favs = JSON.parse(localStorage.getItem("favoritos")) || [];

    if (esFavorito) {
      // Si ya está, la eliminamos
      favs = favs.filter((f) => f.name !== universidad.name);
    } else {
      // Si no está, la agregamos
      favs.push(universidad);
    }

    localStorage.setItem("favoritos", JSON.stringify(favs));
    setEsFavorito(!esFavorito);
  };

  return (
    <div className="detalle-container">
      <div className="detalle-card">
        {/* Nombre de la uni */}
        <h1 className="detalle-nombre">{universidad.name}</h1>

        {/* link web */}
        <a
          href={universidad.web_pages[0]}
          target="_blank"
          rel="noopener noreferrer"
          className="detalle-link"
        >
          {universidad.web_pages[0]}
        </a>

        {/*favorito */}
        <button className="detalle-fav-btn" onClick={toggleFavorito}>
          {esFavorito ? "❤️ Quitar de favoritos" : "🤍 Agregar a favoritos"}
        </button>
      </div>
    </div>
  );
}

export default Detalle;
