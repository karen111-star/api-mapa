import { createContext, useState, useEffect } from 'react';

export const AppContext = createContext();

/**
 * Proveedor de contexto global para la app.
 * Maneja favoritos y puede expandirse para otros estados globales.
 * Guarda favoritos en localStorage para persistencia.
 */
export function AppProvider({ children }) {
    // Estado para favoritos, inicializado desde localStorage
    const favoritosGuardados = JSON.parse(localStorage.getItem("favoritos")) || [];
    const [favoritos, setFavoritos] = useState(favoritosGuardados);

    // Guarda favoritos en localStorage cada vez que cambian
    useEffect(() => {
        localStorage.setItem("favoritos", JSON.stringify(favoritos));
    }, [favoritos]);

    // Puedes agregar aquí otros estados globales si lo necesitas

    return (
        <AppContext.Provider value={{ favoritos, setFavoritos }}>
            {children}
        </AppContext.Provider>
    );
}
