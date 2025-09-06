
import { useState } from "react";
import {AnimatePresence, motion} from 'framer-motion'
import { useUser } from "../hooks/useUser";
import {Link, useNavigate} from 'react-router-dom'
import { RequisicaoLivro } from "../../api/LuminusGet";
import ValorInput from "../esqueletos/ValorInput";
import axios from 'axios';

const HeaderMobile= () => {

    const navigate = useNavigate()

    //URL da rota padrão da API
  // Adicione isso NO TOPO do seu arquivo
console.log('🔍 Variáveis de ambiente:', import.meta.env);
console.log('🔍 VITE_API_URL:', import.meta.env.VITE_API_URL);

const BASE_URL = import.meta.env.VITE_API_URL;
console.log('🔍 BASE_URL:', BASE_URL);

    //feito para definir o usuário
    const {user} = useUser();

    //State feita para definir o estado do menu
    const [open, setOpen] = useState(null);

    //fecha o hamburguer 
    const close = () => {
        setOpen(null)
        setCategorias(null)
    }

    const [categorias, setCategorias] = useState(null)

    const switchCategorias = () => {
        setCategorias(!categorias)
    }

    const dados = RequisicaoLivro()

    const dadosUnicos = [...new Set(dados.map((item) => item.categoria))]//Constante feita com newSET, ou seja, dá o map e a cada map ele adiciona categoria de forma unitária. Sendo um valor ÚNICO. O 
    // ... é pra armazenar unicamente
    //new Set, pra armazenar os dados de map de forma unica

    //feito para definir popUp de pesquisa
    const [pesquisar, setPesquisar] = useState(null);

    const [valorPesquisa, setValorPesquisa] = useState({ pesquisa: "" });

  // handleChanger: arrow function para atualizar o state
  const handleChanger = (e) => {
    const { name, value } = e.target;
    setValorPesquisa({
      ...valorPesquisa,
      [name]: value,
    });
  };

  // handleSubmit: arrow function para enviar os dados
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const resposta = await axios.post(`${BASE_URL}/apiL/pesquisar`, valorPesquisa);
      navigate("/resultadoPesquisa", 
        { state: { resultados: resposta.data.resultados,
                   tamanho:resposta.data.tamanho
         } });
      close();
      switchCategorias()
      console.log("Resposta:", resposta.data);
    } catch (error) {
      console.error("Erro ao enviar dados:", error);
    }
  };


    return(
     <main className=" bg-[#E5E5E5] md:hidden">
        <div className="flex justify-between items-center gap-28.5">
                <img src="/assets/header/HamburguerMenu.png" alt=""
                className="max-h-[37px] mt-[13px] ml-[30px]"
                onClick={() => setOpen(true)}
                />

                <Link to={'/'}>
                    <img src="/assets/header/Logo.png" alt=""
                    className="max-h-[80px]"/>
                </Link>
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
            
            className=" inset-0 fixed max-w-[300px] bg-[#ECB32C] z-30">
                <nav className="mt-[40px] ml-[20px]">
                    <ul className="flex flex-col gap-2 font-[Inter] font-medium 
                    text-[19.5px] text-[#1F2937]">
                        {/*Stats de logado ou não */}
                        <Link 
                        to={'/userPage/estatos'}
                        className=""
                        onClick={() => close()}
                        >
                            <h2>
                                {user ? `Olá ${user.nome}` : 'Não logado...'}
                            </h2>
                        </Link>

                        <Link>
                            <img src="/assets/header/Search.png" 
                                alt=""
                                className="absolute left-60 top-[40px] max-h-[30px]"
                                onClick={() => {
                                    setPesquisar(true)
                                }}
                                />
                        </Link>
                        
                        {/*Livros HomePage */}
                        <Link 
                        to={'/'}
                        className="relative flex items-center cursor-pointer"
                        onClick={() => close()}
                        >
                            <h2>
                                Livros
                            </h2>

                        </Link>

                        <Link 
                        className="relative flex items-center cursor-pointer"
                        onClick={() => switchCategorias()}
                        >
                            <h2>
                                Categorias ⮟
                            </h2>

                        </Link>

                        <AnimatePresence>
                            {categorias && (
                                <motion.div
                                initial={{opacity:0, x:-50}}
                                animate={{opacity:1,x:0}}
                                exit={{opacity:0,  x:-50}}
                                transition={{duration: 0.1}}
                                className="flex flex-col gap-2"
                                >
                                    {dadosUnicos.map((categoria) => (
                                        <Link 
                                        key={categoria}
                                        to={`/categoria/${categoria}`}
                                        className="w-max lowercase border-b-[0.5px]"
                                        onClick={() => close()}
                                        >
                                            {categoria}
                                        </Link>
                                    ))}
                                </motion.div>
                            )}
                        </AnimatePresence>
                        
                    </ul>
                </nav>
            </motion.aside>
            
            {/*Pesquisa mobile*/}
            {pesquisar && (
                            <div className="relative">
                                <div className="fixed inset-0 bg-black opacity-70 z-40"></div>  

                                <div className="fixed min-w-[350px] min-h-[250px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-4
                                 bg-[#F1F1F1F1] rounded-[12px] z-50">
                                    
                                    <form onSubmit={handleSubmit}>
                                        <ValorInput 
                                        htmlfor="pesquisar"
                                        titulo={"Faça sua pesquisa:"}
                                        tipo='text'
                                        nome='pesquisa'
                                        idName='pesquisar'
                                        valor={valorPesquisa.pesquisa}
                                        onMudanca={handleChanger}
                                        placeholder={'Esperando você..'}
                                        />

                                        <button
                                        type="submit"
                                        className="absolute left-18 top-42 min-w-[220px] mx-auto mt-[25px] p-2 bg-[green] font-[Inter] font-medium text-[18px] text-[#F1F1F1] rounded-[8px]"
                                        >
                                         Pesquisar
                                        </button>
                                    </form>
                                </div>
                            </div>
                        )}
             </>
        )}
        </AnimatePresence>
     </main>
    )
}

export default HeaderMobile