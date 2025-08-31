import Usuario from '../models/Usuario';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

//cadastro
export const criarUsuario = async (req, res) => {
  const { nome, email, senha } = req.body;

    // Verifique se os dados estão chegando
    if (!nome || !email || !senha) {
      console.log('❌ Dados incompletos:', { nome, email, senha });
      return res.status(400).json({ mensagem: 'Dados incompletos!' });
    }

  try {
    // hash da senha antes de salvar
    const senhaHash = await bcrypt.hash(senha, 10);

    // cria usuário no banco (INSERT INTO ...)
    const novoUsuario = await Usuario.create({
      nome,
      email,
      senha: senhaHash
    });

    res.status(201).json({
      mensagem: 'Usuário criado com sucesso!',
      usuario: {
        id: novoUsuario.id,
        nome: novoUsuario.nome,
        email: novoUsuario.email
      }
    });
  } catch (error) {
    if (error.name === 'SequelizeUniqueConstraintError') {
      return res.status(400).json({ mensagem: 'Email já cadastrado!' });
    }
    console.error(error);
    res.status(500).json({ mensagem: 'Erro ao criar usuário' });
  }
};

//login
export const loginUsuario = async (req, res) => {
    const { email, senha } = req.body;
  
    try {
      //  Verifica se o email existe no banco
      const usuario = await Usuario.findOne({ where: { email } });
  
      if (!usuario) {
        return res.status(400).json({ mensagem: 'Email não cadastrado!' });
      }
  
      //  Compara a senha enviada com a senha hash do banco
      const senhaValida = await bcrypt.compare(senha, usuario.senha);
  
      if (!senhaValida) {
        return res.status(400).json({ mensagem: 'Senha incorreta!' });
      }
  
      // Dados do payload
      const payload = {
        id: usuario.id,
        nome: usuario.nome,
        email: usuario.email
      };
      
      //Gera token JWT
      const token = jwt.sign(payload, process.env.JWT_SECRET || 'segredo', {
        expiresIn: '1h'
      });
  
      // Retorna os dados e o token
      res.json({
        mensagem: 'Login realizado com sucesso!',
        usuario: payload,
        token
      });
  
    } catch (error) {
      console.error(error);
      res.status(500).json({ mensagem: 'Erro ao realizar login' });
    }
  };