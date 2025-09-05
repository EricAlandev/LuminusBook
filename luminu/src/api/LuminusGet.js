import { useState, useEffect } from "react";
import axios from "axios";

// URL da sua API
const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000'; 

export const RequisicaoLivro = () => {
  const [dados, setDados] = useState([]);

  useEffect(() => {
    axios.get(`${BASE_URL}/apiL/todosLivros`)
      .then(res => {
        // Pega os dados da resposta
        const dados = res.data.map(item => ({
          // Aqui você escolhe os campos que quer do banco
          id: item.id,
          livroNome: item.livroNome,//nome do livro
          livroURL: item.livroURL,//foto livro
          avaliacao: item.avaliacao,//avaliação
          fotoAvali: item.avaliacaoURL,//foto da avaliação - estr
          autor : item.autor,
          publicacao: item.publicacao,//data de publicação
          editora: item.editora,//editora
          resumo: item.resumo,//resumo
          categoria: item.categoria//categoria


        }));

        // Atualiza o estado
        setDados(dados);
      })
      .catch(err => {
        console.error("Erro ao buscar dados:", err);
      });
  }, []); // ativado apenas uma vez ao montar o componente

  // Retorna o estado com os dados para uso externo
  return dados;
};
