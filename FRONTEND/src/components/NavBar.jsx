import { Navbar, Container, Button, Nav } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom"; // Se importa useNavigate para mejorar la experiencia
import { formatNumber } from "../utils/format";
import { useGlobal } from "../context/GlobalContext";
import { useContext } from "react"; 
import { UserContext } from "../context/UserContext"; 

const MiNavbar = () => {
  const { total } = useGlobal();
  const navigate = useNavigate(); // Instanciamos el manejador de rutas

  // Se consume el token y el método logout desde el UserContext
  const { token, logout } = useContext(UserContext);

  // Función manejadora para limpiar el estado y redirigir
  const handleLogoutClick = () => {
    logout(); // Llama a la función del UserContext (deja el token en null)
    alert("Has cerrado sesión con éxito.");
    navigate("/login"); // Redirige al Login inmediatamente para completar el flujo seguro
  };

  return (
    <Navbar bg="dark" variant="dark" className="px-3">
      <Container fluid>
        <Navbar.Brand as={Link} to="/">Pizzería Mamma Mia!</Navbar.Brand>
        
        <Nav className="me-auto">
          <Button as={Link} to="/" variant="outline-light" className="me-2">🏠 Home</Button>

          {/* El renderizado condicional se activa automáticamente según el estado global de token */}
          {token ? (
            <>
              <Button as={Link} to="/profile" variant="outline-light" className="me-2">🔓 Profile</Button>
              
              {/* Se ejecuta el manejador que limpia y redirige */}
              <Button variant="outline-light" onClick={handleLogoutClick}>🔒 Logout</Button>
            </>
          ) : (
            <>
              <Button as={Link} to="/login" variant="outline-light" className="me-2">🔐 Login</Button>
              <Button as={Link} to="/register" variant="outline-light">🔐 Register</Button>
            </>
          )}
        </Nav>

        {/* Botón Total siempre visible */}
        <Button as={Link} to="/cart" variant="outline-info">🛒 Total: ${formatNumber(total)}</Button>
      </Container>
    </Navbar>
  );
};

export default MiNavbar;