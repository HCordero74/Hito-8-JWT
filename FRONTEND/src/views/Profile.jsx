import React, { useContext } from 'react';
import { UserContext } from '../context/UserContext'; // Se importa el contexto de usuario

const Profile = () => {
  // Se consume el email y el método logout desde el contexto global
  const { email, logout } = useContext(UserContext);

  return (
    <div className="container my-5 p-5 border rounded shadow-sm bg-light" style={{ maxWidth: "500px" }}>
      <h2 className="mb-4 text-center">👤 Perfil del Usuario</h2>
      
      <div className="mb-3 text-center">
        <strong>Email: </strong> 
        {/* Se muestra de forma dinámica el email del usuario conectado */}
        <span className="text-muted">{email || "No autenticado"}</span>
      </div>

      {/* Al hacer clic, se ejecuta el logout global */}
      <button onClick={logout} className="btn btn-danger w-100 mt-3">
        Cerrar Sesión
      </button>
    </div>
  );
};

export default Profile;