import { Link, useNavigate } from "react-router-dom"
import ValorInput from "../esqueletos/ValorInput"
import { useState } from "react"

import axios from 'axios'

import { useUser } from "../hooks/useUser"




const HeaderDesk = () => {

  const {user, token} = useUser();

    //Header do desktop
// Adicione isso NO TOPO do seu arquivo
console.log('🔍 Variáveis de ambiente:', import.meta.env);
console.log('🔍 VITE_API_URL:', import.meta.env.VITE_API_URL);

const BASE_URL = import.meta.env.VITE_API_URL;
console.log('🔍 BASE_URL:', BASE_URL);

const navigate = useNavigate();

const [valorPesquisa, setValorPesquisa] = useState({ pesquisa: "" });

const handleChanger = (e) => {
    const {name, value} = e.target;
    setValorPesquisa((prev) => ({
        ...prev,
        [name]: value, // atualiza o campo pesquisado
      }));
    };

const handleSubmit = async (e) => {
    e.preventDefault(); 
        try {
          const response = await axios.post(`${BASE_URL}/apiL/pesquisar`, valorPesquisa);

            // navega para outra página e envia os dados
          navigate("/resultadoPesquisa", { state: { resultados: response.data.resultados,
            tamanho:response.data.tamanho
  } });
            
          console.log("Resposta da API:", response.data);
        } catch (error) {
          console.error("Erro na requisição:", error);
        }
      };

    return(

        <div
         className="hidden md:block md:bg-[#E5E5E5]"
        >       
            <div className=" md:flex md:flex-row md:justify-around md:items-center  md:max-w-[1250px] md:mx-auto">

                    {/*Logo*/}
                  <Link
                  to={'/'}
                  className="md:flex md:flex-row md:items-center"
                  >

                    <img src="/assets/header/Logo.png" alt=""
                    className=" max-h-[80px]"
                    />

                    <div className="font-[Montserrat] font-bold">
                      <h2 className="text-[#164D72]">Luminus</h2>
                      <h2 className="text-[#E6AC00]">Book</h2>
                    </div>
                  </Link>

                  {/*Form de pesquisa */}
                  <form onSubmit={handleSubmit} 
                  className="relative min-w-[450px] max-w-[550px] 
                  mt-[12px]"
                  >
                    <ValorInput
                      htmlfor={'pesquisa'}
                      tipo={'text'}
                      nome={'pesquisa'}
                      idName={'pesquisa'}
                      valor={valorPesquisa.pesquisa}
                      onMudanca={handleChanger}
                      placeholder={'Esperando pesquisa..'}
                    />

                    <button
                    type="submit"
                    className="cursor-pointer"
                    >
                        <img src="/assets/header/Search.png" alt=""
                        className="max-w-[23.5px] absolute bottom-7.5 left-103.5"
                        />
                    </button>
                  </form> 

                  {/*User logado */}
                  {user && (    
                  <Link 
                  to={'/userPage/estatos'}
                  className="flex items-center cursor-pointer">
                      <img src="/assets/header/User.png" alt="" />
                      <h2 className="font-[Inter] font-medium">{user.email}</h2>
                  </Link>
                  )}

                  {!token && (
                     <Link 
                     to={'/userPage/estatos'}
                     className="flex items-center cursor-pointer">
                         <img src="/assets/header/User.png" alt="" />
                         <h2 className="font-[Inter] font-medium">Não logado</h2>
                     </Link>
                  )}
            </div>
        </div>
    )
}

export default HeaderDesk