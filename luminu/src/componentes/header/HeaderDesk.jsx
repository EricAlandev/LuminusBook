
import { useState } from "react";
import {AnimatePresence, motion} from 'framer-motion'

const HeaderDesk = () => {

    const [open, setOpen] = useState(null);


    return(
     <main className=" bg-[#E5E5E5]">
        <div className="flex justify-between items-center gap-28.5">
                <img src="/assets/header/HamburguerMenu.png" alt=""
                className="max-h-[37px] mt-[13px] ml-[30px]"
                onClick={() => setOpen(true)}
                />

                <img src="/assets/header/Logo.png" alt=""
                className="max-h-[80px]"/>
        </div>

        <AnimatePresence>
        {open && (
             <>
             <div className="fixed inset-0 bg-[black] opacity-80 z-30"
             onClick={() => setOpen(false)}
             ></div>
            <motion.aside 
            initial={{opacity: 0, x: -50}}
            animate={{opacity: 1, x: 0}}
            exit={{opacity: 0, x: -50}}
            transition={{duration:0.2}}
            
            className=" inset-0 fixed max-w-[300px] bg-[#8C5E3C] z-50">
                <h2 className=""
                onClick={() => setOpen(null)}
                >Entrar</h2>
            </motion.aside>
             </>
        )}
        </AnimatePresence>
     </main>
    )
}

export default HeaderDesk