// controllers/livroController.js
import Livro from '../models/Livro.js'
import {Op} from "sequelize";

export const pesquisarLivro = async (req, res) => {
    try {
        // Pega o valor da pesquisa enviado pelo front
        const { pesquisa } = req.body;

        // Busca no banco de dados todos os livros cujo nome contém a pesquisa
        const resultados = await Livro.findAll({
            where: {
                livroNome: {
                    [Op.like]: `%${pesquisa}%`//Função Op é pra definir que ele vai puxar um valor semelhante. Não precisa ser 100% igual.
                }
            }
        });

        // Verifica se encontrou algum livro
        if (resultados.length === 0) {
            return res.status(404).json({ message: "Nenhum livro encontrado" });
        }

        const tamanho = resultados.length

        // Se encontrar, retorna os livros
        return res.status(200).json({resultados,tamanho});

    } catch (error) {
        console.error("Erro na pesquisa de livros:", error);
        return res.status(500).json({ message: "Erro ao buscar livros" });
    }
};

