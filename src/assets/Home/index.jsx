import './style.css' //map js en react se le agrega un elemento unico para ese ciclo usando el id 
import { useEffect, useState } from 'react';

function Home(){

  const [departamentos, setDepartamentos] = useState(null);
  const [capitales, setCapitales] = useState(null);
  const [modo, setModo] = useState("capitales");

    useEffect(() => {
    const urlDpt =
      "https://gist.githubusercontent.com/diaztibata/fe3d238ee6b59ef71c8001654441a9f6/raw/4974a1b1cab3ac606dd96aa2d34d6e7c8e007daf/departamentosglobal.json";
    const urlCpt =
      "https://gist.githubusercontent.com/diaztibata/fe3d238ee6b59ef71c8001654441a9f6/raw/4974a1b1cab3ac606dd96aa2d34d6e7c8e007daf/capitalesglobal.json";
// use se debe importar 
// if ternarios 
//otra (i== 0)? alert : otra 

// para filtros usa parametros ?=
//target referencia a ese elemento 
     const fetchJson = async (url, setter) => {
      try {
        const resp = await fetch(url);
        if (!resp.ok) throw new Error("Error al cargar JSON: " + resp.status);
        const json = await resp.json();
        setter(json);
      } catch (error) {
        console.error("Fetch error:", error);
      }
    };

    
    fetchJson(urlDpt, setDepartamentos);
    fetchJson(urlCpt, setCapitales);
  }, []);


    return (
        <>
        <div>
        <button onClick={() => setModo("departamentos")}></button>
        <button onClick={() => setModo("capitales")}></button>
        </div>    
        
    <div>

      <div>
        <button onClick={() => setModo("departamentos")}>
          Mostrar Departamentos
        </button>
        <button onClick={() => setModo("capitales")}>Mostrar Capitales</button>
      </div>

      <div>
        <input
          type="text"
          placeholder="Buscar por nombre..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
        />
      </div>
      </div> //elementos de la lista 

      <div className='Lugar '>
        {
        // Verificar que capitales y capitales.data existen antes de mapear
        !capitales ? (
         <p>Cargando...</p>
        ) : (
        capitales.data.cpt.map((item) => (
         <p key={item.id}>
        {item.nm}
    </p>
  ))
)
}

        <p> Nombre  <span> numero de votos </span></p> 
        <div>
            <p>Candidatos </p>
            <ul>
                <li>Candidatos1</li>
                <li>Candidatos2</li> // se utiliza class name //fetch llama la url a la app 
            </ul>
        </div>
      </div>

       
    </>    

    )
    
}

export default Home 