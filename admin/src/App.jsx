import './App.css';

import { ROUTES } from './routes/ROUTES.jsx';
import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';

// Create the router instance outside the component
const router = createBrowserRouter(ROUTES);

function App() {
  



  return (
    <RouterProvider router={router}/>
     
  
  );
}

export default App;
