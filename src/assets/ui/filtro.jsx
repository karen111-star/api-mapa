import { useEffect, useState } from 'react';

function Filtro({ tipoSeleccionado, setTipoSeleccionado, setData }) {
  useEffect(() => {
    const obtenerDatos = async () => {
      let url = 'https://universities.hipolabs.com/search?country=colombia';
      if (tipoSeleccionado && tipoSeleccionado !== 'Todos') {
        url += `&domain=${tipoSeleccionado}`;
      }
      const res = await fetch(url);
      const json = await res.json();
      setData(json);
    };

    obtenerDatos();
  }, [tipoSeleccionado, setData]);


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