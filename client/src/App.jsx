import { useState, useEffect } from 'react';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './App.css';
import { ROUTES } from './routes/ROUTES.jsx';
import  { WishlistProvider } from './context/favoriteContext.jsx';

const router = createBrowserRouter(ROUTES);

function App() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const storedOrders = JSON.parse(localStorage.getItem('orders')) || [];
    setOrders(storedOrders);
  }, []);

  const addToOrders = (newOrders) => {
    const updatedOrders = [...orders, ...newOrders];
    setOrders(updatedOrders);
    localStorage.setItem('orders', JSON.stringify(updatedOrders));
  };

  return (
    <WishlistProvider>
      <RouterProvider router={router} />
    </WishlistProvider>
  );
}

export default App;
