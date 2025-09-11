import { createContext, useContext, useState, useEffect } from "react";

// 1. Crear contexto
const ThemeContext = createContext();

// 2. Proveedor de tema
export function ThemeProvider({ children }) {
  const [dark, setDark] = useState(() => {
    // Revisar si el usuario ya eligió un tema antes (localStorage)
    const savedTheme = localStorage.getItem("darkMode");
    return savedTheme ? JSON.parse(savedTheme) : false;
  });

  // Guardar en localStorage cuando cambie
  useEffect(() => {
    localStorage.setItem("darkMode", JSON.stringify(dark));
  }, [dark]);

  return (
    <ThemeContext.Provider value={{ dark, setDark }}>
      <div className={dark ? "dark-theme" : "light-theme"}>{children}</div>
    </ThemeContext.Provider>
  );
}

// 3. Hook para usarlo fácilmente
export function useTheme() {
  return useContext(ThemeContext);
}
