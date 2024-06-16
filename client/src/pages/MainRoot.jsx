import { Outlet } from "react-router-dom"
import Header from "../components/Header"
import Home from "./Home"
import Footer from "../components/Footer"


const MainRoot = () => {
  return (
    <div>
        <Header/>
        <Outlet/>
        <Footer/>

    </div>
  )
}

export default MainRoot