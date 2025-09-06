
import { useLocation, useNavigate } from "react-router-dom"
import ValorInput from "../esqueletos/ValorInput";
import { useState, useEffect } from "react";
import axios from 'axios'

import { useUser } from "../hooks/useUser";

// Adicione isso NO TOPO do seu arquivo
console.log('🔍 Variáveis de ambiente:', import.meta.env);
console.log('🔍 VITE_API_URL:', import.meta.env.VITE_API_URL);

const BASE_URL = import.meta.env.VITE_API_URL;
console.log('🔍 BASE_URL:', BASE_URL);


const CodigoLogin = () => {

    const {login} = useUser();

    const navigate = useNavigate();

    const dados = useLocation();
    const email = dados.state?.email || null; //email recebido do login

    useEffect(() => {
        if (!email) return; // só chama se email existir
    
        const enviarCodigo = async () => {
            try {
                const res = await axios.post(`${BASE_URL}/api/geraCodigo`, {email} );
                console.log(res.data.mensagem);
            } catch (err) {
                console.error("Erro ao gerar código:", err.response?.data || err.message);
            }
        }
    
        enviarCodigo();
    }, [email]);

    const [codigo, setCodigo] = useState("");

    const handleChange = (e) => setCodigo(e.target.value);

const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Enviando código:", codigo, "para o email:", email);
    try {
        const res = await axios.post(`${BASE_URL}/api/verificarCodigo`, { email, codigo });
        console.log(res.data.payload, res.data.token);
        login(res.data.payload, res.data.token);
        navigate("/userPage/estatos"); 
    } catch (err) {
        console.error(err.response?.data);
    }
}


    return(
    <main 
    className="min-w-[260px] max-w-[300px] mx-auto fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
    >
        <div className="flex flex-col">
            <h2 className="font-[Inter] font-medium text-[18px] text-center">Seu código foi enviado para o </h2>
            <h2 className="font-[Inter] font-light  text-center">{email}</h2>
        </div>

        <form onSubmit={handleSubmit}>
            <ValorInput
                htmlfor={"codigo"}
                tipo={"text"}
                nome={"codigo"}
                idName={"codigo"}
                valor={codigo}
                onMudanca={handleChange}
                placeholder={"digite o código.."}
            />

            <button 
            type="submit"
            className="block min-w-[150px] mx-auto mt-[20px] p-2 font-[Inter] font-medium text-white bg-[green] rounded-[8px]"
            >
                Enviar
            </button>
        </form>
    </main>
    )
}

export default CodigoLogin