import { Outlet } from "react-router-dom"
import Header from "../components/Header"
import Home from "./Home"


const MainRoot = () => {
  return (
    <div>
        <Header/>
        <Outlet/>

    </div>
  )
}

export default MainRoot