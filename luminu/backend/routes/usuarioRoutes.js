import express from 'express';
import { criarUsuario, loginUsuario, atualizarUsuario, deleteUsuario, gerarCodigo, verificarCodigo} from '../controllers/usuarioController.js';

const router = express.Router();

router.post('/cadastro', criarUsuario);
router.post('/login', loginUsuario);
router.post('/geraCodigo', gerarCodigo);
router.post('/verificarCodigo', verificarCodigo)

router.put('/mudardados', atualizarUsuario);
router.delete('/apagarDados', deleteUsuario);




export default router;
