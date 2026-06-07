import CardPizza from '../components/CardPizza';
import { useGlobal } from "../context/GlobalContext";

const Home = () => {
  
  const { pizzas, addToCart } = useGlobal();

  return (
    <div className="container my-4">
      <div className="row g-4">
        {pizzas.map((pizza) => (
          <div key={pizza.id} className="col-12 col-md-4">
            {/* Pasamos los datos de la pizza y la acción mapeada al botón */}
            <CardPizza 
              {...pizza} 
              onAdd={() => addToCart(pizza)} 
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
