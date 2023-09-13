import React from 'react';
import './App.css';
import Home from './screens/Home';
import Login from './screens/Login';
import Register from './screens/Register';
import Route_Equipamentos from './screens/secondary_route_screens/Route_Equipamentos';
import Route_Calcados from './screens/secondary_route_screens/Route_Calcados';
import Route_Acessorios from './screens/secondary_route_screens/Route_Acessórios';
import Route_Novidades from './screens/secondary_route_screens/Route_Novidades'
import Route_Roupas from './screens/secondary_route_screens/Route_Roupas';
import Route_Busca from './screens/secondary_route_screens/Route_Busca';
import Route_Product from './screens/secondary_route_screens/Route_Product';
import Route_Compra from './screens/secondary_route_screens/Route_Compra';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { CartProvider } from './contexts/CartContext';
import { LoadingProvider } from './contexts/LoadingContext';

export const URL = process.env.REACT_APP_SERVER_URL;

function App() {

  return (
    <LoadingProvider>
      <CartProvider>
        <Router>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/novidades' element={<Route_Novidades />} />
            <Route path='/calcados' element={<Route_Calcados />} />
            <Route path='/roupas' element={<Route_Roupas />} />
            <Route path='/acessorios' element={<Route_Acessorios />} />
            <Route path='/equipamentos' element={<Route_Equipamentos />} />
            <Route path='/busca' element={<Route_Busca />} />
            <Route path='/:id' element={<Route_Product />} />
            <Route path='/compra' element={<Navigate to="/compra/carrinho" />} />
            <Route path="/compra/carrinho" element={<Route_Compra />} />
            <Route path="/compra/identificação" element={<Route_Compra />} />
            <Route path="/compra/pagamento" element={<Route_Compra />} />
          </Routes>
        </Router>
      </CartProvider>
    </LoadingProvider>
  )
}

export default App;
