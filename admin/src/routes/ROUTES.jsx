import Home from "../Home";
import AddEvent from "../pages/AddEvent";
import Categories from "../pages/Categories";
import Customers from "../pages/Customers";
import Dashboard from "../pages/Dashboard";
import Events from "../pages/Events";
import MainRoot from "../pages/MainRoot";
import Reports from "../pages/Reports";
import Settings from "../pages/Settings";


export const ROUTES=[
    {
        path: "/",
        element: <MainRoot />,
        children:[
            {
                index:true,
                element:<Home/>
            },
            {
                path: "dashboard",
                element: <Dashboard />,
            },
            {
                path: "categories",
                element: <Categories />,
            },
            {
                path: "events",
                element: <Events />,
            },
            {
                path: "add-ticket",
                element: <AddEvent />,
            },
            {
                path: "customers",
                element: <Customers />,
            },
            {
                path: "settings",
                element: <Settings />,
            },
            {
                path: "reports",
                element: <Reports />,
            },

        ]
    }
]