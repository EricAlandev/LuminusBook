
import { Outlet } from "react-router-dom"
import HeaderDesk from "../componentes/header/HeaderDesk"

const LayPadrao = () => {

    return(
    <>
     <HeaderDesk/>
     <Outlet/>
    </>
    )
}

export default LayPadrao