
import Home from "../Home";
import AddEvent from "../pages/AddEvent";
import AddHall from "../pages/AddHall";
import Customers from "../pages/Customers";
import Dashboard from "../pages/Dashboard";
import Events from "../pages/Events";
import Login from "../pages/Login";
import MainRoot from "../pages/MainRoot";
import Orders from "../pages/Orders";
import Reports from "../pages/Reports";
import Settings from "../pages/Settings";
import ProtectedRoute from "../ProtectedRoute";

export const ROUTES = [
  {
    path: "/",
    element: <MainRoot />,
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: "login",
        element: <Login />
      },
      {
        path: "/",
        element: <ProtectedRoute />, 
        children: [
          {
            path: "dashboard",
            element: <Dashboard />
          },
          {
            path: "orders",
            element: <Orders />
          },
          {
            path: "events",
            element: <Events />
          },
          {
            path: "add-ticket",
            element: <AddEvent />
          },
          {
            path: "add-hall",
            element: <AddHall />
          },
          {
            path: "customers",
            element: <Customers />
          },
          {
            path: "settings",
            element: <Settings />
          },
          {
            path: "reports",
            element: <Reports />
          }
        ]
      }
    ]
  }
];
