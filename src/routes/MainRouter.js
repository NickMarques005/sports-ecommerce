import { BrowserRouter, Navigate, Route, Router, Routes } from "react-router-dom";
import { AuthProvider } from "../contexts/AuthContext";
import { CartProvider } from "../contexts/CartContext";
import { DeviceProvider } from "../contexts/DeviceContext";
import { LoadingProvider } from "../contexts/LoadingContext";
import Home from "../screens/Home";
import Login from "../screens/Login";
import Register from "../screens/Register";
import Route_Novidades from "../screens/secondary_route_screens/Route_Novidades";
import Route_Calcados from "../screens/secondary_route_screens/Route_Calcados";
import Route_Roupas from "../screens/secondary_route_screens/Route_Roupas";
import Route_Acessórios from "../screens/secondary_route_screens/Route_Acessórios";
import Route_Equipamentos from "../screens/secondary_route_screens/Route_Equipamentos";
import Route_Busca from "../screens/secondary_route_screens/Route_Busca";
import Route_Product from "../screens/secondary_route_screens/Route_Product";
import Route_Compra from "../screens/secondary_route_screens/Route_Compra";
import { IdentificationProvider } from "../contexts/IdentificationContext";
import Cancel from "../components/checkout/after-purchase/cancel/Cancel";
import Success from "../components/checkout/after-purchase/success/Success";
import Route_Orders from "../screens/secondary_route_screens/Route_Orders";

const MainRouter = () => {
    return (
        <AuthProvider>
            <DeviceProvider>
                <LoadingProvider>
                    <CartProvider>
                        <IdentificationProvider>
                            <BrowserRouter>
                                <Routes>
                                    <Route path='/' element={<Home />} />
                                    <Route path='/login' element={<Login />} />
                                    <Route path='/register' element={<Register />} />
                                    <Route path='/novidades' element={<Route_Novidades />} />
                                    <Route path='/calcados' element={<Route_Calcados />} />
                                    <Route path='/roupas' element={<Route_Roupas />} />
                                    <Route path='/acessorios' element={<Route_Acessórios />} />
                                    <Route path='/equipamentos' element={<Route_Equipamentos />} />
                                    <Route path='/busca' element={<Route_Busca />} />
                                    <Route path='/product/:id' element={<Route_Product />} />
                                    <Route path='/compra' element={<Navigate to="/compra/carrinho" />} />
                                    <Route path="/compra/carrinho" element={<Route_Compra />} />
                                    <Route path="/compra/identificação" element={<Route_Compra />} />
                                    <Route path="/compra/pagamento" element={<Route_Compra />} />
                                    <Route path="/cancel-purchase" element={<Cancel />} />
                                    <Route path="/success-purchase" element={<Success />} />
                                    <Route path="/user/meus-pedidos" element={<Route_Orders />} />
                                </Routes>
                            </BrowserRouter>
                        </IdentificationProvider>
                    </CartProvider>
                </LoadingProvider>
            </DeviceProvider>
        </AuthProvider>
    )
};

export default MainRouter;