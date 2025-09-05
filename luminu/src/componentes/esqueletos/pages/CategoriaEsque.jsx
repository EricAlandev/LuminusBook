import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import ProductEsque from "../ProductEsque";

const CategoriaPage = () => {
  const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";
  const { categoria } = useParams(); // pega a categoria da URL
  const [dados, setDados] = useState([]); // estado inicial null

  useEffect(() => {
    const fetchDados = async () => {
      try {
        // faz a requisição para a API usando a categoria
        const response = await axios.get(`${BASE_URL}/apiL/categoria/${categoria}`);
        setDados(response.data); // seta o response no state
      } catch (error) {
        console.error("Erro ao buscar dados da categoria:", error);
      }
    };

    fetchDados(); // ativa a função
  }, [categoria]); // roda toda vez que a categoria mudar

  if (!dados) return <p>Carregando...</p>;

  return (
    <main className="ml-2">
      {/*Page mobile */}
      <h2 className="mt-6 mb-4 font-[Inter] font-medium text-center text-[22px]">Categoria: {categoria}</h2>

      <div className="grid grid-cols-2 grid-rows-2">
        {/* Aqui você renderiza os dados recebidos do backend */}
        {dados.map((item) => (

                <ProductEsque
            url1="livro"
            idLivro={item.id}
            fotolivro={item.livroURL}
            titulo={item.livroNome}
            />
        ))}
      </div>
    </main>
  );
};

export default CategoriaPage;
