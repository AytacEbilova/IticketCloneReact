import Home from "../Home";
import AddTicket from "../pages/AddTicket";
import Categories from "../pages/Categories";
import Customers from "../pages/Customers";
import Dashboard from "../pages/Dashboard";
import MainRoot from "../pages/MainRoot";
import Reports from "../pages/Reports";
import Settings from "../pages/Settings";
import Tickets from "../pages/Tickets";

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
                path: "tickets",
                element: <Tickets />,
            },
            {
                path: "add-ticket",
                element: <AddTicket />,
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