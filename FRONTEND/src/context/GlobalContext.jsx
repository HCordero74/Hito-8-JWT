import { createContext, useState, useEffect, useContext } from "react";

// Se Crea el contexto (Context)
const GlobalContext = createContext();

// Se Crea el Proveedor (Provider)
export const GlobalProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
// Se crea el estado global para almacenar las pizzas del backend  
  const [pizzas, setPizzas] = useState([]);
// Se Trae las pizzas desde la API local
  const getPizzas = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/pizzas");
      const data = await response.json();
      setPizzas(data);
    } catch (error) {
      console.error("Error al obtener las pizzas:", error);
    }
  };

  useEffect(() => {
    getPizzas();
  }, []);

   const getPizzaById = (id) => {
    return pizzas.find((pizza) => pizza.id === id);
  };

  // Se Agregan los productos al carrito
  const addToCart = (pizza) => {
    setCart((prevCart) => {
      const existingPizza = prevCart.find((item) => item.id === pizza.id);
      if (existingPizza) {
        return prevCart.map((item) =>
          item.id === pizza.id ? { ...item, count: item.count + 1 } : item
        );
      }
      return [...prevCart, { ...pizza, count: 1 }];
    });
  };

  // Incrementa la cantidad de productos al carrito
  const increaseCount = (id) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id ? { ...item, count: item.count + 1 } : item
      )
    );
  };

  // Disminuye o elimina si llega a 0, la cantidad de productos del carrito
  const decreaseCount = (id) => {
    setCart((prevCart) =>
      prevCart
        .map((item) =>
          item.id === id ? { ...item, count: item.count - 1 } : item
        )
        .filter((item) => item.count > 0)
    );
  };

  // Se realiza el cálculo del total
  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.count, 0);
  };

  return (
    <GlobalContext.Provider
      value={{
        pizzas,
        cart,
        addToCart,
        increaseCount,
        decreaseCount,
        total: calculateTotal(),
        getPizzaById,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};


export const useGlobal = () => useContext(GlobalContext);