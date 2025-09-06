
import { Link, useParams } from "react-router-dom";

const Footer = () => {

    const {categoria} = useParams();

  
   return(   
    <footer className={`w-full ${categoria === "FICÇÃO"? 
        "mt-[56px]" : categoria === "RELIGIÃO"? "mt-[48px]" :
        "mt-[70px]"} pl-[22px] bg-[#E5E5E5]`}>
        
        <div className="flex  gap-7 md:flex  md:max-w-[1000px] md:mx-auto md:gap-160  ">
                            {/*Logo */}
                <Link to={'/'}>
                    <img src="/assets/header/Logo.png" alt=""
                    className="max-h-[80px]"/>
                    
                    {/*Div feita para texto Logo*/}
                    <div className="flex flex-col pl-[3.5px] pb-1.5 leading-4.5">
                        <h2 className="md:mt-[-15px] font-[Montserrat] font-bold text-[16px]  text-[#164D72]">Luminus</h2>
                        <h2 className="font-[Montserrat] font-bold text-[16px] pl-3.5 text-[#E6AC00]">Book</h2>
                    </div>
                </Link>

                {/*Texto logo */}
                <h2 className="block  mt-[55px] md:mt-[48px] font-[Inter] font-medium">
                    <span className="font-[Montserrat] font-bold text-[#164D72]">Luminus</span> <span className="font-[Montserrat] font-bold text-[#E6AC00]">Book</span>, 
                    sempre com você!
                </h2>
        </div>
    </footer>
   )
}

export default Footer;