import Livro from '../models/Livro.js'

export const listarTodosLivros = async (req, res) => {
  try {
    // Pega os dados enviados pelo front (se precisar usar)
    const dadosRecebidos = req.body;
    console.log("Dados recebidos:", dadosRecebidos);

    // Busca todos os livros no banco de dados
    const livros = await Livro.findAll();
    
    // Retorna os dados encontrados
    return res.status(200).json(livros);
  } catch (error) {
    console.error("Erro ao listar livros:", error);
    return res.status(500).json({ mensagem: "Erro interno do servidor" });
  }
};



//pega todos os livros
export const listarLivros = async (req, res) => {
    try {
      // Pega os dados enviados pelo front (se precisar usar)
      const dadosRecebidos = req.body;
      console.log("Dados recebidos:", dadosRecebidos);
  
      // Busca todos os livros no banco de dados
      const livros = await Livro.findAll({
        where: {
          ordemLivros: "livros do momento"
        }
      });
  
      // Retorna os dados encontrados
      return res.status(200).json(livros);
    } catch (error) {
      console.error("Erro ao listar livros:", error);
      return res.status(500).json({ mensagem: "Erro interno do servidor" });
    }
  };


//pega um livro por vez de acordo com o id setado pelo useParams
export const buscarLivroPorId = async (req, res) => {
  try {
    const { id } = req.params;
    const livro = await Livro.findByPk(id);

    if (!livro) {
      return res.status(404).json({ error: "Livro não encontrado" });
    }

    res.json(livro);
  } catch (error) {
    console.error("Erro ao buscar livro:", error);
    res.status(500).json({ error: "Erro no servidor" });
  }
};

//Listar Categoria
export const listarPorCategoria = async (req, res) => {
  const { categoria } = req.params;

  try {
    // busca todos os livros que tenham a categoria passada
    const livros = await Livro.findAll({
      where: {
        categoria: categoria
      }
    });

    if (!livros || livros.length === 0) {
      return res.status(404).json({ message: "Nenhum livro encontrado para essa categoria" });
    }

    // se encontrou, retorna os livros
    res.json(livros);
  } catch (error) {
    console.error("Erro ao buscar livros por categoria:", error);
    res.status(500).json({ message: "Erro no servidor" });
  }
};

//Pega apenas os livros de Ficção
export const listarFiccao = async (req, res) => {
  try {
    const todos = await Livro.findAll();
    console.log("Todos os livros:", todos.map(l => l.categoria));

    const resultados = todos.filter(l => l.categoria === "FICÇÃO");

    console.log("Resultados FICÇÃO:", resultados);

    if (resultados.length === 0) {
      return res.status(404).json({ message: "Nenhum livro de ficção encontrado" });
    }

    return res.status(200).json(resultados);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Erro ao buscar livros" });
  }
};

//Pega apenas livros de Direito
export const listarDireito = async (req, res) => {
  try {
    const resultados = await Livro.findAll({
      where: {
        categoria: "DIREITO"
      }
    });

    if (resultados.length === 0) {
      return res.status(404).json({ message: "Nenhum livro de Direito encontrado" });
    }

    return res.status(200).json(resultados);
  } catch (error) {
    console.error("Erro ao buscar livros de Direito:", error);
    return res.status(500).json({ message: "Erro interno do servidor" });
  }
};



