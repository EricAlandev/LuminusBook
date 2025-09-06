import axios from 'axios';
import { NavLink, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

const LivroEsqueleto = () => {
    const BASE_URL = import.meta.env.VITE_API_URL;

    const { id } = useParams();
    const [livro, setLivro] = useState(null);
  
    useEffect(() => {
      const fetchLivro = async () => {
        try {
          const response = await axios.get(`${BASE_URL}/apiL/livros/${id}`);
          setLivro(response.data);
        } catch (error) {
          console.error("Erro ao buscar livro:", error);
        }
      };
      fetchLivro();
    }, [id]);

    const [definiCampo, setDefiniCampo] = useState("sinopse");
  
    if (!livro) return <p className='text-center font-[Inter]font-bold'>Carregando...</p>;


    return(
        <main className='md:max-w-[1115px] md:mx-auto'>
            {/*Mobile */}
            <div className=' mt-5 pl-4 pr-4'>

                <h2 className='mb-3 font-[Inter] font-bold text-[#154C72] text-[16px]'>{livro.categoria}</h2>

                <h2 className='max-w-[300px] font-[Inter] font-[350] text-[24px]'>{livro.livroNome}</h2>

                {/*Div para definir mobi ou dekstop */}
                <div className='md:flex '>
                        <img src={livro.livroURL} 
                        alt=""
                        className=' md:min-w-[250px] md:mx-0 mx-auto mt-[20px] md:ml-[-33.5px]'
                        />
                        
                        {/* Div para fazer as estrelas e os dados serem um so. Especial para desktop */}
                        <div className='md:mt-[45px]'>
                                {/*Sistema de avaliação  */}
                            <div className='flex items-center gap-2 mt-[15px]'>
                                {/*Div feita para agrupar as estrelas */}
                                <div className='flex items-center'>
                                    {livro.avaliacao > 3 && livro.avaliacao <=3.9 && (
                                        <>
                                            <img src="/assets/livros/Star.png" alt=""
                                            className='max-h-[24px]'
                                            />
                                            <img src="/assets/livros/Star.png" alt=""
                                            className='max-h-[24px]'
                                            />
                                            <img src="/assets/livros/Star.png" alt=""
                                            className='max-h-[24px]'
                                            />
                                            <img src="/assets/livros/Star.png" alt=""
                                            className='max-h-[24px]'
                                            />

                                            <img src="/assets/livros/StarEmpty.png" alt=""
                                            className='max-h-[24px]'
                                            />
                                        </>
                                    )}

                                    {livro.avaliacao >= 4.0 && (
                                        <>
                                        <img src="/assets/livros/Star.png" alt=""
                                        className='max-h-[24px]'
                                        />
                                        <img src="/assets/livros/Star.png" alt=""
                                        className='max-h-[24px]'
                                        />
                                        <img src="/assets/livros/Star.png" alt=""
                                        className='max-h-[24px]'
                                        />
                                        <img src="/assets/livros/Star.png" alt=""
                                        className='max-h-[24px]'
                                        />
                                        <img src="/assets/livros/Star.png" alt=""
                                        className='max-h-[24px]'
                                        />
                                        </>
                                    )}
                                </div>

                                <h2 className='font-[Inter] font-medium'>{livro.avaliacao}</h2>
                            </div>

                            {/*Informações */}

                            <ul className='flex flex-col gap-3 mt-5 mb-8 pl-4 list-disc'>
                                    {/*Autor */}
                                    <li 
                                    className='font-[Inter] font-bold text-[16.5px]'
                                    >
                                        Autor: <span className='font-[405]'>{livro.autor}</span>
                                    </li>

                                    {/*Publicação */}
                                    <li 
                                    className='font-[Inter] font-bold text-[16.5px]'
                                    >
                                        Publicação: <span className='font-[405]'>{livro.publicacao}</span>
                                    </li>

                                    {/*Editra */}
                                    <li 
                                    className='font-[Inter] font-bold text-[16.5px]'
                                    >
                                        Editora: <span className='font-[405]'>{livro.editora}</span>
                                    </li>
                            </ul>
                        </div>
                </div>
            </div>

                 <div className='hidden md:block'>
                    <nav className='md:max-w-[800px] md:ml-[237px]'>
                        <ul className='flex gap-4 font-[Inter] font-[450] border-b-[6px] border-[#154C71]'>
                            <li>
                                <NavLink
                                    onClick={() => setDefiniCampo('sinopse')}
                                    className={({ isActive }) =>
                                    isActive
                                        ? `${definiCampo === "sinopse" ? "text-blue-500 font-bold" : "text-gray-700"}  duration-200` // estilo quando ativo
                                        : ""
                                    }
                                >
                                    Sinopse
                                </NavLink>
                            </li>

                            <li>
                                <NavLink
                                    onClick={() => setDefiniCampo('baixar')}
                                    className={({ isActive }) =>
                                        isActive
                                    ? `${definiCampo === "baixar" ? "text-blue-500 font-bold" : "text-gray-700"}  duration-200` // estilo quando ativo
                                    : ""
                                }
                                >
                                    Dowload
                                </NavLink>
                            </li>
                        </ul>
                    </nav>
                 </div>
                 
                {/*Resumo do livro */}
                 {definiCampo === 'sinopse' && (
                 <div className='md:max-w-[800px] md:min-h-[232px] mt-5 md:ml-[220px] pl-4 pr-4 '>
                    
                    {/*Titulo */}
                    <div className='w-full p-2 text-[#F1F1F1F1] md:text-[#000000]  bg-[#154C72] md:bg-transparent'>
                        <h2 className=' font-[Inter] font-[400] md:font-[350] text-[18px] text-center'>
                            Resumo do livro <br /> 

                            <span className='block max-w-[320px] md:max-w-[600px] mx-auto md:font-[500] text-[22px] '>{livro.livroNome}</span>
                        </h2>   
                    </div>

                 {/*Resumo */}
                 <p className=' mt-[15px] mb-[52.5px] md:pb-4.5 text-[17.5px] text-center md:border-b-[1.5px] '>{livro.resumo}</p>
             </div>
                 )}

                 {/*Dowload do livro */}
                 {definiCampo === 'baixar' && (
                 <div className='md:max-w-[800px] md:min-h-[232px] mt-5 md:ml-[220px] pl-4 pr-4'>
                 {/*Titulo */}
                 <div className='w-full p-2 text-[#F1F1F1F1] md:text-[#000000]  bg-[#154C72] md:bg-transparent'>
                     <h2 className=' font-[Inter] font-[400] md:font-[350] text-[18px] text-center'>
                         <span className='font-bold'>Baixe o livro</span> {livro.livroNome} <br /> 

                     </h2>   
                 </div>

                 {/*Resumo */}
                 <p className=' mt-[15px] md:pb-4.5 text-[17.5px] text-center '>
                    O livre por ser baixado clicando no botão
                </p>

                <button className='block mx-auto min-w-[200px] mt-[5px] p-2 font-[Inter] font-light bg-[#D1D1D1] rounded-[8px] '>
                     Baixar
                </button>

             </div>
                 )}
        </main>

    )
}

export default LivroEsqueleto;