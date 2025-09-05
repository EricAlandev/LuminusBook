
import { Outlet } from "react-router-dom"
import Footer from "../componentes/header/Footer"
import Header from "../componentes/header/Header"

const LayPadrao = () => {

    return(
    <>
     <Header/>
     <Outlet/>
     <Footer/>
    </>
    )
}

export default LayPadrao