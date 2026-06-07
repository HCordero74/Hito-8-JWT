import React, { useContext, useState } from 'react'; // Se importa useState para el mensaje de éxito
import { useGlobal } from '../context/GlobalContext';
import { formatNumber } from '../utils/format';
import { UserContext } from '../context/UserContext'; // Se consume el UserContext

const Cart = () => {
  // Se traen todos los estados y funciones desde el contexto centralizado
  const { cart, increaseCount, decreaseCount, total } = useGlobal();
  
  // Se consume el estado del token desde el UserContext
  const { token } = useContext(UserContext);

  // Estado local para manejar el mensaje de éxito de la compra
  const [compraExitosa, setCompraExitosa] = useState(false);

  // Función para enviar el carrito al backend
  const handleCheckout = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/checkouts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // Se envía el token JWT en las cabeceras de autorización
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          cart: cart,
        }),
      });

      if (response.ok) {
        setCompraExitosa(true);
        alert("¡Compra realizada con éxito!");
      } else {
        const errorData = await response.json();
        alert(errorData.error || "Hubo un problema al procesar tu compra.");
      }
    } catch (error) {
      console.error("Error al realizar el checkout:", error);
      alert("No se pudo conectar con el servidor para procesar el pago.");
    }
  };

  console.log("Contenido actual del carrito:", cart);
  
  return (
    <div className="container mt-5" style={{ maxWidth: '600px' }}>
      <h3 className="mb-4">Detalles del pedido:</h3>
      
      <div className="p-3 border rounded shadow-sm bg-white">
        {cart.length === 0 ? (
          <p className="text-center text-muted">Tu carrito está vacío</p>
        ) : (
          cart.map((pizza) => (
            <div key={pizza.id} className="d-flex align-items-center justify-content-between mb-3 pb-3 border-bottom">
              {/* Sección de Imagen Dinámica y Nombre */}
              <div className="d-flex align-items-center" style={{ gap: '15px' }}>
                <img 
                  src={pizza.img} 
                  alt={pizza.name} 
                  style={{ width: '60px', height: '60px', objectFit: 'cover', borderRadius: '5px' }} 
                  onError={(e) => { 
                    const copias = {
                      "española": "https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?w=120",
                      "napolitana": "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=120",
                      "salame": "https://images.unsplash.com/photo-1628840042765-356cda07504e?w=120",
                      "pollo picante": "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=120",
                      "bacon": "https://images.unsplash.com/photo-1590947132387-155cc02f3212?w=120",
                      "cuatro estaciones": "https://images.unsplash.com/photo-1544982503-9f984c14501a?w=120"
                    };
                    e.target.src = copias[pizza.name.toLowerCase()] || "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=120";
                  }} 
                />
                <span className="text-capitalize fw-bold">{pizza.name}</span>
              </div>

              {/* Precio, Botones y Cantidad */}
              <div className="d-flex align-items-center" style={{ gap: '15px' }}>
                <span className="fw-bold fs-5">
                  ${formatNumber(pizza.price * pizza.count)}
                </span>
                
                <button 
                  className="btn btn-outline-danger btn-sm" 
                  onClick={() => decreaseCount(pizza.id)}
                  style={{ width: '30px', height: '30px', padding: '0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                >
                  -
                </button>
                
                <span className="fw-bold fs-5">{pizza.count}</span>
                
                <button 
                  className="btn btn-outline-primary btn-sm" 
                  onClick={() => increaseCount(pizza.id)}
                  style={{ width: '30px', height: '30px', padding: '0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                >
                  +
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Sección del Total dinámico y Botón de Pagar */}
      <div className="mt-4">
        <h2 className="fw-bold">Total: ${formatNumber(total)}</h2>
        
        {/* Mensaje de éxito visible cuando compraExitosa sea true */}
        {compraExitosa && (
          <div className="alert alert-success text-center mt-3" role="alert">
            🎉 ¡Tu compra ha sido realizada con éxito!
          </div>
        )}

        {/* Se vincula el onClick al método handleCheckout */}
        <button 
          className="btn btn-dark mt-3 px-4 py-2 fs-5"
          onClick={handleCheckout}
          disabled={!token || cart.length === 0} // También se deshabilita si el carrito está vacío
        >
          Pagar
        </button>
        
        {/* Si el token no existe, se avisa al usuario */}
        {!token && (
          <p className="text-danger mt-2 text-center" style={{ fontSize: "0.9rem" }}>
            🔒 Debes iniciar sesión o registrarte para proceder con el pago.
          </p>
        )}
      </div>
    </div>
  );
}; 

export default Cart;