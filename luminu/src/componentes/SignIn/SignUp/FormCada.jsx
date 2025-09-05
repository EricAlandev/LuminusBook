
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';


import ValorInput from "../../esqueletos/ValorInput"
const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';



//Form de cadastro

const FormCada = () => {
    const navigate = useNavigate()

    const [nomeState, setNomeState] = useState({
        nome: "",
        email: "",
        senha: ""
      });
    
      //  Função handleChange para atualizar qualquer campo
      const handleChange = (e) => {
        const { name, value } = e.target; // pega name e value do input
        setNomeState({
          ...nomeState,   // mantém os outros campos
          [name]: value   // atualiza o campo correspondente
        });
      };
    
      //  Função handleSubmit para enviar os dados
      const handleSubmit = async (e) => {
        e.preventDefault(); // previne reload da página
        try {
          const response = await axios.post(
            `${BASE_URL}/api/cadastro`, //Não por {} ao exp, pois vira objeto e quebra.
            nomeState               // envia o objeto com nome, email e senha
          );
          console.log("Resposta da API:", response.data);
          navigate('/login')
          // aqui você pode redirecionar ou limpar o form
        } catch (error) {
          console.error("Erro ao cadastrar:", error);
        }
    }

    return(
        <form onSubmit={handleSubmit}>  
          {/*Quadrante principal do form */}
          <div className="flex flex-col min-w-[260px] max-w-[300px] mx-auto gap-8 fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            
            <h2 className="w-max mx-auto font-[Inter] font-medium text-[18px] border-[gray] border-b-[2px]">Cadastro</h2>
            {/*Esqueleto de cada input - mais verticial */}
            <ValorInput 
            htmlfor={'nome'}
            titulo={'Nome de usuário'}
            tipo={'text'}
            nome={'nome'}
            idName={'nome'}
            valor={nomeState.nome}
            onMudanca={handleChange}
            placeholder={'Digite seu nome..'}
            />

            <ValorInput 
            htmlfor={'email'}
            titulo={'Seu email'}
            tipo={'email'}
            nome={'email'}
            idName={'email'}
            valor={nomeState.email}
            onMudanca={handleChange}
            placeholder={'Digite seu email..'}
            />
            

            <ValorInput 
            htmlfor={'password'}
            titulo={'Sua senha'}
            tipo={'password'}
            nome={'senha'}
            idName={'password'}
            valor={nomeState.senha}
            onMudanca={handleChange}
            placeholder={'Digite seu senha..'}
            />

            <Link 
            to={'/login'}
            className=" font-[Inter] font-medium text-[16.5px] underline"
            >
                Já possui conta?
            </Link>


            <button
            type="submit"
            className="min-w-[230px] max-w-[250px] mx-auto mt-[10px] p-2 bg-[#F1F1F1F1] font-[Inter] font-medium text-[16.5px]"
            >
             Cadastrar
            </button>

          </div>
        </form>
    )
}

export default FormCada