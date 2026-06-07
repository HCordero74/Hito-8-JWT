import { createContext, useState } from "react";

// 1. Se crea el contexto
export const UserContext = createContext();

// 2. Se crea el componente proveedor
export const UserProvider = ({ children }) => {
  // Se crea el token, debe empezar en null (sin sesión) para recibir el string del JWT
  const [token, setToken] = useState(null);
  const [email, setEmail] = useState(null);

  // Método para iniciar sesión consumiendo la API del backend
  const login = async (email, password) => {
    try {
      const response = await fetch("https://hito-8-jwt.onrender.com/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      
      if (response.ok && data.token) {
        setToken(data.token);
        setEmail(data.email);
        alert("¡Inicio de sesión exitoso!");
      } else {
        alert(data.error || "Error al iniciar sesión");
      }
    } catch (error) {
      console.error("Error en la conexión:", error);
      alert("No se pudo conectar con el servidor backend.");
    }
  };

  // Forma para registrar un nuevo usuario consumiendo la API
  const register = async (email, password) => {
    try {
      const response = await fetch("https://hito-8-jwt.onrender.com/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();

      if (response.ok && data.token) {
        setToken(data.token);
        setEmail(data.email);
        alert("¡Registro exitoso e inicio de sesión automático!");
      } else {
        alert(data.error || "Error en el registro");
      }
    } catch (error) {
      console.error("Error en la conexión:", error);
      alert("No se pudo conectar con el servidor backend.");
    }
  };

  // Método logout que limpia el token y el email del estado global
  const logout = () => {
    setToken(null);
    setEmail(null);
  };

  // Método para obtener el perfil del usuario autenticado si es requerido
  const getProfile = async () => {
    if (!token) return null;
    try {
      const response = await fetch("https://hito-8-jwt.onrender.com/api/auth/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return await response.json();
    } catch (error) {
      console.error("Error al obtener perfil:", error);
    }
  };

  // Se comparten todos los estados y métodos en el value del Provider
  return (
    <UserContext.Provider value={{ token, email, login, register, logout, getProfile }}>
      {children}
    </UserContext.Provider>
  );
};