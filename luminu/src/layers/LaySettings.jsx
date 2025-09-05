import { Outlet } from "react-router-dom";
import SlideBar from "../componentes/userPage/SlidedBar";
import Header from "../componentes/header/Header";


const LaySettings = () => {

    return(
     <div >
       <Header/>

       <div className="flex  md:max-w-[918px] md:mx-auto gap-10 md:gap-60 mt-[10px] md:mt-[40px] ml-[30px]">
          <SlideBar/>
          <Outlet/>
       </div>
     </div>
    )
}

export default LaySettings;