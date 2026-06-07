import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import './index.css';
import App from './App.jsx';
import { GlobalProvider } from "./context/GlobalContext.jsx";
import { UserProvider } from "./context/UserContext.jsx"; 

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <UserProvider>
        <GlobalProvider>
          <App />
        </GlobalProvider>
      </UserProvider>
    </BrowserRouter>
  </React.StrictMode>
);
