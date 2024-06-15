import { useState } from 'react'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './App.css'
import { ROUTES } from './routes/ROUTES.jsx';
const router=createBrowserRouter(ROUTES)
function App() {


  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App