import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';
import { formatNumber } from "../utils/format";
import { Link } from "react-router-dom";

const CardPizza = ({ id, name, price, ingredients, img, onAdd}) => {
  return (
    <div className="card h-100 shadow-sm">
      <img 
        src={img} 
        className="card-img-top w-100" 
        style={{ height: "200px", objectFit: "cover" }} 
        alt={name}
        onError={(e) => {
          const backupImages = {
            "napolitana": "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?q=80&w=500",
            "española": "https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?q=80&w=500",
            "salame": "https://images.unsplash.com/photo-1628840042765-356cda07504e?q=80&w=500",
            "cuatro estaciones": "https://images.unsplash.com/photo-1544982503-9f984c14501a?q=80&w=500",
            "bacon": "https://images.unsplash.com/photo-1590947132387-155cc02f3212?q=80&w=500", // <-- Agregada
            "pollo picante": "https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=500" // <-- Agregada
          };

          const pizzaKey = name.toLowerCase().trim();
          e.target.src = backupImages[pizzaKey] || "https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=500";
        }}
      />
      <div className="card-body">
        <h5 className="card-title text-capitalize">{name}</h5>
        <hr />
        <p className="mb-1">🍕 Ingredientes:</p>
        <ul className="small text-muted">
          {ingredients?.map((ing, i) => <li key={i}>{ing}</li>)}
        </ul>
      </div>
      <div className="card-footer bg-white border-top-0 text-center">
        <h4 className="fw-bold text-dark">Precio: ${price?.toLocaleString('es-CL')}</h4>
        <div className="d-flex justify-content-around mt-3">
           <Link to={`/pizza/${id}`} className="btn btn-outline-dark btn-sm">
              Ver Más 👀
           </Link>
            <button className="btn btn-dark btn-sm" onClick={onAdd}>Añadir 🛒</button>
        </div>
      </div>
    </div>
  );
};

export default CardPizza;