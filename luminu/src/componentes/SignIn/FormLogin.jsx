


import { useState } from "react";
import {Link, useNavigate } from 'react-router-dom'
import { useUser } from "../hooks/useUser";
import axios from 'axios';



import ValorInput from "../../componentes/esqueletos//ValorInput"
// Adicione isso NO TOPO do seu arquivo
console.log('🔍 Variáveis de ambiente:', import.meta.env);
console.log('🔍 VITE_API_URL:', import.meta.env.VITE_API_URL);

const BASE_URL = import.meta.env.VITE_API_URL;
console.log('🔍 BASE_URL:', BASE_URL);



//Form de cadastro
const FormLogin = () => {

    const navigate = useNavigate();
    const { login} = useUser();

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
            `${BASE_URL}/api/login`, 
            {
              nome: nomeState.nome,
              email: nomeState.email,
              senha: nomeState.senha
            }         // envia o objeto com     
                                    //nome, email e senha
          );
          console.log("Resposta da API:", response.data.mensagem);

          navigate('/login/codigo', { state: { email: response.data.email } })
          // aqui você pode redirecionar ou limpar o form
        } catch (error) {
          console.error("Erro ao cadastrar:", error);
        }
    }

    return(
        <form onSubmit={handleSubmit}>  
          {/*Quadrante principal do form */}
          <div className="flex flex-col min-w-[260px] max-w-[300px] mx-auto gap-8 fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">

          <h2>Login</h2>

            <ValorInput 
            htmlfor={'email'}
            titulo={'Seu email'}
            tipo={'email'}
            nome={'email'}
            idName={'email'}
            value={nomeState.email}
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
            to={'/cadastro'}
            className=" font-[Inter] font-medium text-[16.5px] underline"
            >
                Não possui conta?
            </Link>

            <button
            type="submit"
            className="min-w-[230px] max-w-[250px] mx-auto mt-[10px] p-2 bg-[#F1F1F1F1] font-[Inter] font-medium text-[16.5px]"
            >
             Entrar
            </button>



          </div>
        </form>
    )
}

export default FormLogin