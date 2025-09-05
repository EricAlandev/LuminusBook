
import { NavLink } from "react-router-dom";
import { useUser } from "../hooks/useUser";

const SlideBar = () => {

  const {user} = useUser();




    return(
        <>
          {user && (
            <nav className="mt-[9px]">
                <ul className="flex flex-col gap-5">
                    <li className=" font-[Inter] font-medium text-[18px] ">
                        <NavLink 
                        to={'/userPage/estatos'}
                        className={({isActive}) =>
                          isActive ? 'block md:min-w-[100px] p-2 md:text-[20px]  md:text-center bg-black text-[white] rounded-[8px] duration-120 ' : 'bg-white' }
                        >
                            <h2>Estatos</h2>
                        </NavLink>
                    </li>

                    <li className=" font-[Inter] font-medium text-[18px] ">
                        <NavLink 
                        to={'/userPage/dados'}
                        className={({isActive}) =>
                          isActive ? 'block md:min-w-[100px] p-2 md:text-[20px]  md:text-center bg-black text-[white] rounded-[8px] duration-120 ' : 'bg-white' }
                        
                        >
                            <h2>Dados</h2>
                        </NavLink>
                    </li>
                </ul>
          </nav>
          )}
        </>
    )
}

export default SlideBar