import Usuario from '../models/Usuario.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import nodemailer from "nodemailer";

//cadastro
export const criarUsuario = async (req, res) => {
  const { nome, email, senha } = req.body;
  console.log('📥 Dados recebidos:', req.body);

  if (!nome || !email || !senha) {
    console.log('❌ Dados incompletos:', { nome, email, senha });
    return res.status(400).json({ mensagem: 'Dados incompletos!' });
  }

  try {
    const senhaHash = await bcrypt.hash(senha, 10);
    console.log('📌 Senha hash criada:', senhaHash);

    const novoUsuario = await Usuario.create({
      nome,
      email,
      senha: senhaHash
    });

    console.log('✅ Usuário criado:', novoUsuario);

    res.status(201).json({
      mensagem: 'Usuário criado com sucesso!',
      usuario: {
        id: novoUsuario.id,
        nome: novoUsuario.nome,
        email: novoUsuario.email
      }
    });
  } catch (error) {
    console.error("💥 Erro detalhado:", error);
    res.status(500).json({ mensagem: 'Erro ao criar usuário', erro: error.message });
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

      // Retorna os dados e o token
      res.json({
        mensagem: 'Prossiga pro email!',
        email : usuario.email
      });
  
    } catch (error) {
      console.error(error);
      res.status(500).json({ mensagem: 'Erro ao realizar login' });
    }
  };

  //Segurança código email
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // SSL
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });
  
//gera senha e envia para o email específico
  export const gerarCodigo = async (req, res) => {
    const { email } = req.body;
    try {
      const usuario = await Usuario.findOne({ where: { email } });
      if (!usuario) return res.status(404).json({ mensagem: "Email não cadastrado" });
  
      const codigo = Math.floor(100000 + Math.random() * 900000).toString();
      usuario.codigoVerificacao = codigo;
      usuario.codigoExpiraEm = new Date(Date.now() + 10 * 60 * 1000).toISOString();
      await usuario.save();
  
      await transporter.sendMail({
        from: `"Luminus Book" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: "Olá usuário !",
        text: `Aqui seu código para entrar no nosso site : ${codigo}`
      });
  
      res.json({ mensagem: "Código enviado por email" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ mensagem: "Erro ao gerar código" });
    }
  };

 //Confere se o código está correto

 export const verificarCodigo = async (req, res) => {
  const { email, codigo } = req.body;
  
  try {
    console.log("📧 Verificando código para:", email, "Código:", codigo);

    const usuario = await Usuario.findOne({ where: { email } });
    if (!usuario) {
      console.log("❌ Email não encontrado:", email);
      return res.status(404).json({ mensagem: "Email não cadastrado" });
    }

    console.log("📋 Código no BD:", usuario.codigoVerificacao);
    console.log("⏰ Expira em:", usuario.codigoExpiraEm);

    // Verifica se há código para comparar
    if (!usuario.codigoVerificacao || !usuario.codigoExpiraEm) {
      console.log("❌ Código não foi gerado");
      return res.status(401).json({ mensagem: "Código não gerado ou expirado" });
    }

    // Corrige a comparação de datas
    const agora = new Date();
    const expiracao = new Date(usuario.codigoExpiraEm);
    
    console.log("🕒 Agora:", agora);
    console.log("⏰ Expiração:", expiracao);
    console.log("📉 Está expirado?", agora > expiracao);

    if (agora > expiracao) {
      console.log("❌ Código expirado");
      usuario.codigoVerificacao = null;
      usuario.codigoExpiraEm = null;
      await usuario.save();
      return res.status(401).json({ mensagem: "Código expirado" });
    }

    // ✅ Código válido!
    console.log("✅ Código verificado com sucesso");

    const payload = { 
      id: usuario.id, 
      nome: usuario.nome, 
      email: usuario.email 
    };
    
    const token = jwt.sign(payload, process.env.JWT_SECRET || "segredo", { 
      expiresIn: "1h" 
    });

    // Limpa o código após uso
    usuario.codigoVerificacao = null;
    usuario.codigoExpiraEm = null;
    await usuario.save();

    res.json({ 
      mensagem: "Código verificado com sucesso",
      payload, 
      token 
    });

  } catch (err) {
    console.error("💥 Erro na verificação:", err);
    res.status(500).json({ mensagem: "Erro ao verificar código" });
  }
};
//Alterar
export const atualizarUsuario = async (req, res) => {
  const {id, nome, email, senha } = req.body;

  if (!id) return res.status(400).json({ mensagem: 'ID do usuário é obrigatório' });

  try {
    // Verifica se o usuário existe
    const usuario = await Usuario.findByPk(id);
    if (!usuario) {
      return res.status(404).json({ mensagem: 'Usuário não encontrado!' });
    }

    // Criptografa senha, se tiver
    let senhaNova = null;
    if (senha) {
      senhaNova = await bcrypt.hash(senha, 10);
    }

    //  Monta objeto com apenas os campos que foram enviados
    const camposParaAtualizar = {};
    if (nome) camposParaAtualizar.nome = nome;
    if (email) camposParaAtualizar.email = email;
    if (senhaNova) camposParaAtualizar.senha = senhaNova;

    // 4️⃣ Se não houver campos para atualizar, quebra
    if (Object.keys(camposParaAtualizar).length === 0) {
      return res.status(400).json({ mensagem: 'Nenhum campo para atualizar!' });
    }

    // Atualiza o usuário no banco
    await usuario.update(camposParaAtualizar);

    // Pega os valores atualizados
    const usuarioAtualizado = await Usuario.findByPk(id, {
      attributes: ['id', 'nome', 'email'] // não retorna a senha
    });

    // Retorna para o front
    res.json({
      mensagem: 'Usuário atualizado com sucesso!',
      usuario: usuarioAtualizado
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ mensagem: 'Erro ao atualizar usuário' });
  }
};

//deletar usuário
export const deleteUsuario = async (req, res) => {
  const { id } = req.body;

  try {
    const usuario = await Usuario.findByPk(id);
    if (!usuario) {
      return res.status(404).json({ mensagem: 'Usuário não encontrado!' });
    }

    await usuario.destroy(); // deleta do banco

    res.json({ mensagem: 'Usuário deletado com sucesso!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensagem: 'Erro ao deletar usuário' });
  }
};