
import express from "express";
import { buscarLivroPorId, listarDireito, listarFiccao, listarLivros, listarPorCategoria, listarTodosLivros } from "../controllers/livroController.js";
import { pesquisarLivro } from "../controllers/PesquisarController.js";

const router = express.Router();

// Método GET
router.get("/todosLivros", listarTodosLivros);
router.get("/livros", listarLivros);
//buscar Livro Ficção
router.get("/livros/direito", listarDireito);
router.get("/livros/ficcao", listarFiccao);
router.get("/livros/:id", buscarLivroPorId);
router.get("/categoria/:categoria", listarPorCategoria);
router.post("/pesquisar", pesquisarLivro);





export default router;
