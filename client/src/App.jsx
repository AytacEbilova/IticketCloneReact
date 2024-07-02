import { useState } from 'react'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './App.css'
import { ROUTES } from './routes/ROUTES.jsx';
import FavProvider from './context/favoriteContext.jsx';
const router=createBrowserRouter(ROUTES)
function App() {

  return (
    <>
    <FavProvider>
      <RouterProvider router={router} />
    </FavProvider>
    </>
  )
}

export default App