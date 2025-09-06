import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useUser } from "../hooks/useUser";
import {AnimatePresence, motion} from 'framer-motion'

import axios from 'axios'
const BASE_URL = import.meta.env.VITE_API_URL;

const Profile = () => {

  const {user, token, logout} = useUser()
  
  const handleDelete = async () => {
    try {
        const response = await axios.delete(`${BASE_URL}/api/apagarDados`,  {
          data: { id: user.id } // envia o id no corpo
        });
        console.log(response.data.mensagem); // Usuário deletado com sucesso
        // aqui você pode limpar o user do estado ou redirecionar
        logout()
    } catch (error) {
        console.error('Erro ao deletar usuário:', error);
    }
};

//constante feita apenas com o intuito de ao clicar no Apagar, ele gerar o popUp
const [apagarC, setApagarC] = useState(null)

  if (!token) {
    return (
      <main className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <h2 className="font-[Inter] font-[400] text-[25px] text-center">
            Não logado
        </h2>

        <div className="flex items-center gap-5 mt-[20px] font-[Inter] font-medium text-[16px]">
            <Link 
            to={'/login'}
            className="p-3 bg-[#D1D1D1] rounded-[8px]">
                Entrar
            </Link>

            <h2>ou</h2>

            <Link 
            to={'/cadastro'}
            className="p-3 bg-[#D1D1D1] rounded-[8px]">
                Cadastrar
            </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="">
      <div className="flex gap-2.5 md:mt-[9px] font-[Inter] font-[400] text-[19px] md:text-[20px]">
          <h2>Status</h2>
          <h2>:</h2>
          <h2 className="text-[green]">Logado</h2>
      </div>

      <p className="font-[Inter] font-[400] text-[19px] md:text-[20px]">Bem-vindo, <span className="underline"> {user?.nome}</span>!</p>
      

      <div className="flex gap-5">
        <button
          onClick={logout}
          className="min-w-[125px] mt-4 p-2 bg-[gray] text-white rounded cursor-pointer"
        >
          Sair
        </button>

        <button
          onClick={() => setApagarC(true)}
          className="min-w-[125px] mt-4 p-2 bg-red-500 text-white rounded cursor-pointer"
        >
          APAGAR CONTA
        </button>

      </div>

      {/*Pop Up que ativa apenas quando apagar for true. */}

      <AnimatePresence>
      {apagarC && (
        <>
        <div className="fixed inset-0 bg-black opacity-80"></div>

        <motion.div 
        initial={{opacity: 0, y:-50, x:-150}}
        animate={{opacity: 1, y:0, x:0}}
        exit={{opacity: 0, y:-50, x:-50}}
        transition={{duration: 0.2}}
        className="fixed min-w-[350px] min-h-[400px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 font-[Inter] font-medium bg-[#FAFAFA] rounded-[12px]"
        >
          <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 min-w-[320px]">
            <h2 className="text-center text-[18px]">Olá 
              <span className="ml-4 underline">{user.nome}</span>
            </h2>

            {/*Div com o valor de delete */}
            <div>
                <h2 
                className="mt-[25px] text-center text-[18px]"
                >
                  Você realmente quer 
                </h2>

                <span className="block text-center text-[red] text-[18px] font-bold">
                  deletar sua conta?
                </span>
            </div>

            {/*Div para ter o botão de deletar ou criar conta */}
            <div className="flex justify-center gap-10 mt-[40px]">
              <button
              className="min-w-[70px] p-2.5 bg-[#B22222] text-[#F1F1F1] text-[16px] rounded-[8px] cursor-pointer"
              onClick={handleDelete}

              >
                Sim
              </button>

              <button
              className="min-w-[70px] p-2.5 bg-[gray] text-[#F1F1F1] text-[16px] rounded-[8px] cursor-pointer"
              onClick={() => setApagarC(null)}

              >
                Não
              </button>
            </div>
          </div>
        </motion.div>
        </>
      )}
      </AnimatePresence>


    </main>
  );
};

export default Profile;
