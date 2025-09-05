import { useState } from "react";
import { useUser } from "../hooks/useUser";
import ValorInput from "../esqueletos/ValorInput";
import axios from 'axios';
import {AnimatePresence, motion} from 'framer-motion'

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';


const Settings = () => {

    const {user, login} = useUser();
    
    //Para abrir os popUps
    const [mudarNome, setMudarNome] = useState(null);
    const [mudarEmail, setMudarEmail] = useState(null);
    const [mudarSenha, setMudarSenha] = useState(null);

    //useState para valor que vai pra API
    const [valores, setValores] = useState('');
    //useState para definir o tipo do dado que vai pra API, 
    // como email: valores
    const [campo, setCampo] = useState('');

    //funcão para fechar tudo
    const fechar = () => {
        setMudarNome(null);
        setMudarEmail(null);
        setMudarSenha(null);
        setValores('');
        setCampo('');

    }

    
        // Função handleSubmit para atualizar um campo
        const handleSubmit = async () => {
            try {
            const body = {
                 id: user.id, [campo]: valores 
                 };

            const response = await axios.put(`${BASE_URL}/api/mudardados`, body);
            console.log("Atualizado com sucesso:", response.data);
            login(response.data.usuario)
            fechar(); // fecha o input após atualizar
            } catch (error) {
            console.error("Erro ao atualizar:", error);
            }
        };

    return(
        <>
        {user && (
            <main className="flex  flex-col max-w-[280px] gap-10">
            {/*Nome */}
            <div className="flex flex-col gap-4 p-2 font-[Inter] font-[400] text-[18px]">

                    {/*Div feita para o nome + botao de trocar*/}
                    <div className="flex items-center gap-5">
                        <h2 className="border-b-[2px] md:text-[20px]">Nome</h2>
                        <img src="/assets/header/Change.png" alt=""
                        className="max-h-[22.5px] cursor-pointer"
                        onClick={() => 
                           {
                            setMudarNome(true);
                            setCampo('nome')
                           }
                        }
                        />
                    </div>
                <h2 className="p-3 border-2">{user?.nome}</h2>
            </div>

            <AnimatePresence>
            {mudarNome && (
                <motion.div
                initial={{opacity: 0, x:50, duration: 0.2}}
                animate={{opacity: 1, x:0, duration: 0.2}}
                exit={{opacity: 0, x:50, duration:0.25}}
                >
                            <ValorInput 
                        htmlfor='mudarNome'
                        titulo='Mude seu nome'
                        funcaoFechar={fechar}
                        fecharTitulo={'Fechar'}
                        tipo='text'
                        nome='nome'
                        idName='mudarNome'
                        valor={valores}
                        onMudanca={(e) => setValores(e.target.value)}
                        placeholder={'Novo email...'}
                        />

                        <button
                        type="submit"
                        onClick={handleSubmit}
                        className="block min-w-[150px] mx-auto mt-[10px] p-2 bg-[green] font-[Inter] font-medium text-[#F1F1F1] rounded-[8px] cursor-pointer"
                        >
                            Trocar
                        </button>
                </motion.div>
            )}
            </AnimatePresence>

            {/*EMail */}
            <div className="flex flex-col max-w-[280px]   gap-4 p-2 font-[Inter] font-[400] text-[18px] ">

                    {/*Div feita para o Email + botao de trocar*/}
                    <div className="flex gap-5">
                        <h2 className="border-b-[2px]">Email</h2>
                        <img src="/assets/header/Change.png" alt=""
                        className="max-h-[25px] cursor-pointer"
                        onClick={() => 
                            {
                            setMudarEmail(true)
                            setCampo('email')
                            }
                        }
                        />
                    </div>
                <h2 className="p-3 border-2">{user?.email}</h2>
            </div>

            <AnimatePresence>
            {mudarEmail && (
                <motion.div
                initial={{opacity: 0, x:50, duration: 0.2}}
                animate={{opacity: 1, x:0, duration: 0.2}}
                exit={{opacity: 0, x:50, duration:0.25}}
                >
                            <ValorInput 
                        htmlfor='mudarEmail'
                        titulo='Mude seu email'
                        funcaoFechar={fechar}
                        fecharTitulo={'Fechar'}
                        tipo='email'
                        nome='email'
                        idName='mudarEmail'
                        valor={valores}
                        onMudanca={(e) => setValores(e.target.value)}
                        placeholder={'Novo email...'}
                        />

                        <button
                        type="submit"
                        onClick={handleSubmit}
                        className="block min-w-[150px] mx-auto mt-[10px] p-2 bg-[green] font-[Inter] font-medium text-[#F1F1F1] rounded-[8px] cursor-pointer"
                        >
                            Trocar
                        </button>
                </motion.div>
            )}
            </AnimatePresence>

            {/*Senha */}
            <div className="flex flex-col max-w-[280px]   gap-4 p-2 font-[Inter] font-[400] text-[18px] ">

                    {/*Div feita para a Senha + botao de trocar*/}
                    <div className="flex gap-5">
                        <h2 className="border-b-[2px]">Senha</h2>
                        <img src="/assets/header/Change.png" alt=""
                        className="max-h-[25px] cursor-pointer"
                        onClick={() => {
                            setMudarSenha(true)
                            setCampo('senha')
                            }}
                        />
                    </div>
            </div>

            <AnimatePresence>
            {mudarSenha && (
                <motion.div
                initial={{opacity: 0, x:50, duration: 0.2}}
                animate={{opacity: 1, x:0, duration: 0.2}}
                exit={{opacity: 0, x:50, duration:0.25}}
                >
                            <ValorInput 
                        htmlfor='mudarSenha'
                        titulo='Mude sua senha'
                        funcaoFechar={fechar}
                        fecharTitulo={'Fechar'}
                        tipo='password'
                        nome='senha'
                        idName='mudarSenha'
                        valor={valores}
                        onMudanca={(e) => setValores(e.target.value)}
                        placeholder={'Nova senha...'}
                        />

                        <button
                        type="submit"
                        onClick={handleSubmit}
                        className="block min-w-[150px] mx-auto mt-[10px] p-2 bg-[green] font-[Inter] font-medium text-[#F1F1F1] rounded-[8px] cursor-pointer"
                        >
                            Trocar
                        </button>
                </motion.div>
            )}
            </AnimatePresence>


        </main>
        )}
        </>
    )
}

export default Settings