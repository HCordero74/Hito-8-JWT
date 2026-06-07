import React, { useState, useContext } from "react";
import { UserContext } from "../context/UserContext"; // Se imprta el contexto de usuario
import { useNavigate } from "react-router-dom"; // Se importa useNavigate para redirigir

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordC, setPasswordC] = useState(""); // Campo para confirmar contraseña

  // Se consume el método register desde el UserContext
  const { register } = useContext(UserContext);
  const navigate = useNavigate();

  // Se agrega 'async' para poder manejar la respuesta del servidor
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validaciones necesarias
    if (!email.trim() || !password.trim() || !passwordC.trim()) {
      alert("Todos los campos son obligatorios.");
      return;
    }
    if (password.length < 6) {
      alert("La contraseña debe tener al menos 6 caracteres");
      return;
    }
    if (password !== passwordC) {
      alert("Las contraseñas no coinciden");
      return;
    }

    console.log("Enviando datos de registro al backend...");
    
    // Se llama a la función register del contexto global
    await register(email, password);

    // Se limpian los campos del formulario
    setEmail("");
    setPassword("");
    setPasswordC("");

    // Se redirecciona al usuario a la página de inicio
    navigate("/"); 
  };

  return (
    <div className="contenedor-registro">
      <form className="loginForm" onSubmit={handleSubmit}>
        <h2 className="text-center">Crear Registro</h2>

        <label className="form-label-dark">Email:</label>
        <input
          type="email"
          placeholder="ejemplo@email.com"
          className="form-input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label className="form-label-dark">Password:</label>
        <input
          type="password"
          placeholder="******"
          className="form-input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <label className="form-label-dark">Confirmar password:</label>
        <input
          type="password"
          placeholder="******"
          className="form-input"
          value={passwordC}
          onChange={(e) => setPasswordC(e.target.value)}
        />

        <br />
        <button type="submit" className="btn btn-primary w-100 mt-3">
          Registrarme
        </button>
      </form>
    </div>
  );
}