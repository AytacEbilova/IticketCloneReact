// src/App.js
import React, { useState } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ROUTES } from './routes/ROUTES.jsx';
import './App.css';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const updatedRoutes = ROUTES.map(route => {
    if (route.element.type && route.element.type.name === 'MainRoot') {
      return {
        ...route,
        element: React.cloneElement(route.element, { isAuthenticated }),
        children: route.children.map(child => {
          if (child.path === 'login') {
            return {
              ...child,
              element: React.cloneElement(child.element, { onLogin: handleLogin })
            };
          }
          if (child.element.type && child.element.type.name === 'ProtectedRoute') {
            return {
              ...child,
              element: React.cloneElement(child.element, { isAuthenticated }),
              children: child.children,
            };
          }
          return child;
        })
      };
    }
    return route;
  });

  const router = createBrowserRouter(updatedRoutes);

  return <RouterProvider router={router} />;
};

export default App;
