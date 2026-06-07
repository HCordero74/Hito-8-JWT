import { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { UserContext } from "./context/UserContext"; 
import MiNavbar from "./components/NavBar"; 
import Home from "./views/Home";
import Pizza from "./views/Pizza";
import Cart from "./views/Cart";
import Profile from "./views/Profile";
import LoginPage from "./views/LoginPage";
import RegisterPage from "./views/RegisterPage";
import Footer from "./components/Footer";
import NotFound from "./views/NotFound";

function App() {
  const { token } = useContext(UserContext);

  return (
    <>
      <MiNavbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/pizza/:id" element={<Pizza />} />
        <Route path="/cart" element={<Cart />} />
        
        {/* Condición, Si el token es false, redirige a /login "RUTA PROTEGIDA"*/}
        <Route 
          path="/profile" 
          element={token ? <Profile /> : <Navigate to="/login" />} 
        />

        {/* Condición, Si el token es true, redirige al Home (/) "RUTA PROTEGIDA"*/}
        <Route 
          path="/login" 
          element={!token ? <LoginPage /> : <Navigate to="/" />} 
        />

        {/* Condición, Si el token es true, redirige al Home (/) "RUTA PROTEGIDA"*/}
        <Route 
          path="/register" 
          element={!token ? <RegisterPage /> : <Navigate to="/" />} 
        />

        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;