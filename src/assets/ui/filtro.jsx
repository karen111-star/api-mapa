import { useEffect, useState } from 'react';

/**
 * Componente Filtro para universidades.
 * Permite filtrar por país o por dominio.
 */
function Filtro({ tipoSeleccionado, setTipoSeleccionado, setData }) {
  useEffect(() => {
    const obtenerDatos = async () => {
      let url = 'http://universities.hipolabs.com/search?country=colombia';
      if (tipoSeleccionado && tipoSeleccionado !== 'Todos') {
        url += `&domain=${tipoSeleccionado}`;
      }
      const res = await fetch(url);
      const json = await res.json();
      setData(json);
    };

    obtenerDatos();
  }, [tipoSeleccionado, setData]);

  // No usar HTML, solo menú permitido
  return (
    <>
      <div>
        <span onClick={() => setTipoSeleccionado('Todos')}>Todos</span>
        <span onClick={() => setTipoSeleccionado('edu.co')}>Dominio edu.co</span>
        <span onClick={() => setTipoSeleccionado('university')}>Dominio university</span>
      </div>
    </>
  );
}

export default Filtro;