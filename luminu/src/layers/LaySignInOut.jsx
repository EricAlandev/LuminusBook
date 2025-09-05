import { Outlet } from "react-router-dom"
import Header from "../componentes/header/Header"


const LaySignInOut = () => {

    return(
        <>
        <Header/>
        <Outlet/>
        </>
    )   
}

export default LaySignInOut