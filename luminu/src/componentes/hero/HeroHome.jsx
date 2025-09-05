import { RequisicaoLivro } from "../../api/LuminusGet"
import ProductEsque from "../esqueletos/ProductEsque";
import { Swiper, SwiperSlide } from "swiper/react";
import { useEffect, useState } from "react";
import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000'; 

const HeroHome = () => {


    const dados = RequisicaoLivro();

    //Livros de ficção
    const [livrosFiccao, setLivrosFiccao] = useState([]);

    useEffect(() => {
      // Função async dentro do useEffect
      const buscarDados = async () => {
        try {
          const response = await axios.get(`${BASE_URL}/apiL/livros/ficcao`);
          setLivrosFiccao(response.data); // Atualiza o state com os dados da API
        } catch (error) {
          console.error("Erro ao buscar dados:", error);
        }
      };
  
      buscarDados(); // Chama a função de busca
    }, []); // [] garante que só execute uma vez ao montar o componente
    
    //Livros de Direito
    const [livrosDireito, setLivrosDireito] = useState([]);

    useEffect(() => {
      // Função async dentro do useEffect
      const buscarDados = async () => {
        try {
          const response = await axios.get(`${BASE_URL}/apiL/livros/direito`);
          setLivrosDireito(response.data); // Atualiza o state com os dados da API
        } catch (error) {
          console.error("Erro ao buscar dados:", error);
        }
      };
  
      buscarDados(); // Chama a função de busca
    }, []); // [] garante que só execute uma vez ao montar o component

    return(
      <div className="md:max-w-[1145px] md:mx-auto">
          <div className="">
                <h2 className="mt-5 ml-7.5 font-[Inter] font-medium text-[23px]">Livros do momento</h2>
              <Swiper
              slidesPerView={2}
              breakpoints={{
                640: {
                  slidesPerView: 2
                },
                1024: {
                  slidesPerView: 4.5
                }
              }}
              >
                {dados.map((item) => (
                  <SwiperSlide key={item.id}>
                    <ProductEsque 
                        url1={'livro'}
                        idLivro={item.id}
                        fotolivro={item.livroURL}
                        titulo={item.livroNome}
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
          </div>
          
          {/*lIVROS DE FICÇÃO */}
          <div>
            <h2 className="mt-5 ml-7.5 font-[Inter] font-medium text-[23px]">Ficção</h2>

            <Swiper
              slidesPerView={2}
              breakpoints={{
                640: {
                  slidesPerView: 2
                },
                1024: {
                  slidesPerView: 4
                }
              }}
              >
                {livrosFiccao.map((item) => (
                  <SwiperSlide key={item.id}>
                    <ProductEsque 
                        url1={'livro'}
                        idLivro={item.id}
                        fotolivro={item.livroURL}
                        titulo={item.livroNome}
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
          </div>

           {/*lIVROS DE DIREITO */}
           <div>
            <h2 className="mt-5 ml-7.5 font-[Inter] font-medium text-[23px]">Direito</h2>

            <Swiper
              slidesPerView={2}
              breakpoints={{
                640: {
                  slidesPerView: 2
                },
                1024: {
                  slidesPerView: 4
                }
              }}
              >
                {livrosDireito.map((item) => (
                  <SwiperSlide key={item.id}>
                    <ProductEsque 
                        url1={'livro'}
                        idLivro={item.id}
                        fotolivro={item.livroURL}
                        titulo={item.livroNome}
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
          </div>



      </div>
    )
}

export default HeroHome