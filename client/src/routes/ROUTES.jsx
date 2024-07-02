import Concert from "../pages/Concert";
import Detail from "../pages/Detail";
import Events from "../pages/Events";
import Favorites from "../pages/Favorites";
import GiftCard from "../pages/GiftCard";
import Home from "../pages/Home";
import Kids from "../pages/Kids";
import MainRoot from "../pages/MainRoot";
import Profile from "../pages/Profile";
import Sport from "../pages/Sport";
import Theatre from "../pages/Theatre";
import UptadePas from "../pages/UpdatePas";
import Wallet from "../pages/Wallet";

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
        path: "detail/:id",
        element: <Detail />,
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
        path: "sport",
        element: <Sport />,
      },
      {
        path:"profile/:id",
        element:<Profile/>
      },
      {
        path:"wallet",
        element:<Wallet/>
      },
      {
        path:"giftcard",
        element:<GiftCard/>
      },
      {
        path:"favorites",
        element:<Favorites/>
      },
      {
        path:"update-pass/:id/token",
        element:<UptadePas/>
      }
    ],
  },
];
