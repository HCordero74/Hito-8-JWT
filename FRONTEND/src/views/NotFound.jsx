import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="text-center my-5 py-5">
      <h1 className="display-1 fw-bold text-danger">404</h1>
      <h2>🍕 ¡Lo sentimos! Entra a nuestra pizzería y haz tu pedido!!! 🍕</h2>
      <p className="text-muted">La página que estás buscando no existe.</p>
      <Link to="/" className="btn btn-dark mt-3">Volver al Home</Link>
    </div>
  );
};

export default NotFound;