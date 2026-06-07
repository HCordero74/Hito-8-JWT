import React, { useState, useContext } from "react";
import { UserContext } from "../context/UserContext"; // Se importa el contexto
import { useNavigate } from "react-router-dom"; // Se importa useNavigate para la redirección

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  // Se consume el método login desde el UserContext
  const { login } = useContext(UserContext);
  const navigate = useNavigate();

  // Se agrega 'async' porque la petición al backend requiere esperar la respuesta
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!email.trim() || !password.trim()) {
      alert("Todos los campos son obligatorios.");
      return;
    }
    if (password.length < 6) {
      alert("La contraseña debe tener al menos 6 caracteres");
      return;
    }

    console.log("Enviando datos de inicio de sesión al backend...");
    
    // Se llama a la función login del contexto global pasándole los datos del formulario
    await login(email, password);
    
    // Se limpian los estados locales
    setEmail("");
    setPassword("");
    
    // Se redirecciona automáticamente al home
    navigate("/"); 
  };

  return (
    <div className="contenedor-registro">
        <form className="loginForm" onSubmit={handleSubmit}>
          <h2 className="text-center">Iniciar Sesión</h2>

          <label htmlFor="email" className="form-label-dark">Ingrese su correo electrónico:</label>
          <input
              type="email" 
              placeholder="ejemplo@email.com" 
              className="form-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
          />

          <label htmlFor="password" className="form-label-dark">Ingrese su contraseña:</label>
          <input
              type="password" 
              placeholder="******" 
              className="form-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
          />

          <br />
          <button type="submit" className="btn btn-primary w-100">Iniciar sesión</button>
        </form>
    </div>
  );
}