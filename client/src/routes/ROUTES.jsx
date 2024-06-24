import Concert from "../pages/Concert";
import DreamFest from "../pages/DreamFest";
import Events from "../pages/Events";
import Home from "../pages/Home";
import Kids from "../pages/Kids";
import MainRoot from "../pages/MainRoot";
import Profile from "../pages/Profile";
import Theatre from "../pages/Theatre";

export const ROUTES = [
  {
    path: "/",
    element: <MainRoot />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "events",
        element: <Events />,
      },
      {
        path: "concerts",
        element: <Concert />,
      },
      {
        path: "kids",
        element: <Kids />,
      },
      {
        path: "theatre",
        element: <Theatre />,
      },
      {
        path: "dream-fest-2024",
        element: <DreamFest />,
      },
      {
        path:"profile",
        element:<Profile/>
      }
    ],
  },
];
